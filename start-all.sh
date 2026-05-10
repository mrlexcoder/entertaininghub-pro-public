#!/bin/bash

# EntertainingHub Pro - Start All Services
# This script starts Backend, Frontend, and Admin Panel

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if port is in use
port_in_use() {
    lsof -i:$1 >/dev/null 2>&1 || netstat -an | grep ":$1 " >/dev/null 2>&1
}

# Function to kill process on port
kill_port() {
    port=$1
    print_color "$YELLOW" "Killing process on port $port..."
    
    # Try lsof first (Mac/Linux)
    if command_exists lsof; then
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    # Try netstat (Windows Git Bash)
    elif command_exists netstat; then
        pid=$(netstat -ano | grep ":$port " | awk '{print $5}' | head -1)
        if [ ! -z "$pid" ]; then
            taskkill //PID $pid //F 2>/dev/null || true
        fi
    fi
}

print_color "$CYAN" "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        🎬 ENTERTAININGHUB PRO - STARTUP SCRIPT 🎬        ║
║                                                           ║
║  Starting: Backend + Frontend + Admin Panel              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
"

# Check prerequisites
print_color "$BLUE" "📋 Checking prerequisites..."

if ! command_exists go; then
    print_color "$RED" "❌ Go is not installed. Please install Go 1.21+"
    exit 1
fi

if ! command_exists node; then
    print_color "$RED" "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

if ! command_exists npm; then
    print_color "$RED" "❌ npm is not installed. Please install npm"
    exit 1
fi

print_color "$GREEN" "✅ All prerequisites installed"

# Check if ports are available
print_color "$BLUE" "🔍 Checking ports..."

if port_in_use 8080; then
    print_color "$YELLOW" "⚠️  Port 8080 is in use"
    read -p "Kill process on port 8080? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port 8080
    else
        print_color "$RED" "❌ Cannot start backend on port 8080"
        exit 1
    fi
fi

if port_in_use 3000; then
    print_color "$YELLOW" "⚠️  Port 3000 is in use"
    read -p "Kill process on port 3000? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port 3000
    else
        print_color "$RED" "❌ Cannot start frontend on port 3000"
        exit 1
    fi
fi

if port_in_use 3001; then
    print_color "$YELLOW" "⚠️  Port 3001 is in use"
    read -p "Kill process on port 3001? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port 3001
    else
        print_color "$RED" "❌ Cannot start admin panel on port 3001"
        exit 1
    fi
fi

print_color "$GREEN" "✅ All ports available"

# Create logs directory
mkdir -p logs

# Backend Setup
print_color "$PURPLE" "
═══════════════════════════════════════════════════════════
🔧 BACKEND SETUP (Go + PostgreSQL + Redis)
═══════════════════════════════════════════════════════════"

cd backend

if [ ! -f ".env" ]; then
    print_color "$YELLOW" "⚠️  .env file not found, copying from .env.example"
    cp .env.example .env
    print_color "$GREEN" "✅ Created .env file"
fi

print_color "$BLUE" "📦 Installing Go dependencies..."
go mod download
print_color "$GREEN" "✅ Go dependencies installed"

print_color "$BLUE" "🚀 Starting Backend on port 8080..."
go run cmd/api/main.go > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../logs/backend.pid
print_color "$GREEN" "✅ Backend started (PID: $BACKEND_PID)"

cd ..

# Wait for backend to be ready
print_color "$BLUE" "⏳ Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
        print_color "$GREEN" "✅ Backend is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        print_color "$RED" "❌ Backend failed to start. Check logs/backend.log"
        exit 1
    fi
    sleep 1
done

# Frontend Setup
print_color "$PURPLE" "
═══════════════════════════════════════════════════════════
🎨 FRONTEND SETUP (Lit + TypeScript)
═══════════════════════════════════════════════════════════"

cd frontend

if [ ! -f ".env" ]; then
    print_color "$YELLOW" "⚠️  .env file not found, copying from .env.example"
    cp .env.example .env
    print_color "$GREEN" "✅ Created .env file"
fi

if [ ! -d "node_modules" ]; then
    print_color "$BLUE" "📦 Installing Frontend dependencies..."
    npm install
    print_color "$GREEN" "✅ Frontend dependencies installed"
else
    print_color "$GREEN" "✅ Frontend dependencies already installed"
fi

print_color "$BLUE" "🚀 Starting Frontend on port 3000..."
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../logs/frontend.pid
print_color "$GREEN" "✅ Frontend started (PID: $FRONTEND_PID)"

cd ..

# Admin Panel Setup
print_color "$PURPLE" "
═══════════════════════════════════════════════════════════
🎛️  ADMIN PANEL SETUP (React + TypeScript + Tailwind)
═══════════════════════════════════════════════════════════"

cd admin-panel

if [ ! -d "node_modules" ]; then
    print_color "$BLUE" "📦 Installing Admin Panel dependencies..."
    npm install
    print_color "$GREEN" "✅ Admin Panel dependencies installed"
else
    print_color "$GREEN" "✅ Admin Panel dependencies already installed"
fi

print_color "$BLUE" "🚀 Starting Admin Panel on port 3001..."
npm run dev > ../logs/admin.log 2>&1 &
ADMIN_PID=$!
echo $ADMIN_PID > ../logs/admin.pid
print_color "$GREEN" "✅ Admin Panel started (PID: $ADMIN_PID)"

cd ..

# Success message
print_color "$GREEN" "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              🎉 ALL SERVICES STARTED! 🎉                 ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
"

print_color "$CYAN" "
📡 Access URLs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔧 Backend API:     http://localhost:8080
  🏥 Health Check:    http://localhost:8080/api/health
  🎨 Frontend:        http://localhost:3000
  🎛️  Admin Panel:     http://localhost:3001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Process IDs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Backend:  $BACKEND_PID
  Frontend: $FRONTEND_PID
  Admin:    $ADMIN_PID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Logs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Backend:  logs/backend.log
  Frontend: logs/frontend.log
  Admin:    logs/admin.log
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛑 To stop all services, run:
   ./stop-all.sh
   
   Or press Ctrl+C and run:
   kill $BACKEND_PID $FRONTEND_PID $ADMIN_PID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"

print_color "$YELLOW" "
💡 Tips:
  - View logs: tail -f logs/backend.log
  - Check status: curl http://localhost:8080/api/health
  - Frontend will auto-reload on file changes
  - Admin panel will auto-reload on file changes
"

# Keep script running
print_color "$BLUE" "Press Ctrl+C to stop all services..."
wait
