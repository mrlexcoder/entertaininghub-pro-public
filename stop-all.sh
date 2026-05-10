#!/bin/bash

# EntertainingHub Pro - Stop All Services

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

print_color "$CYAN" "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        🛑 ENTERTAININGHUB PRO - STOP SCRIPT 🛑           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
"

# Function to kill process by PID file
kill_by_pid_file() {
    service=$1
    pid_file="logs/${service}.pid"
    
    if [ -f "$pid_file" ]; then
        pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            print_color "$YELLOW" "Stopping $service (PID: $pid)..."
            kill $pid 2>/dev/null || kill -9 $pid 2>/dev/null || true
            rm "$pid_file"
            print_color "$GREEN" "✅ $service stopped"
        else
            print_color "$YELLOW" "⚠️  $service process not found"
            rm "$pid_file"
        fi
    else
        print_color "$YELLOW" "⚠️  No PID file for $service"
    fi
}

# Function to kill process by port
kill_by_port() {
    service=$1
    port=$2
    
    print_color "$YELLOW" "Checking port $port for $service..."
    
    # Try lsof first (Mac/Linux)
    if command -v lsof >/dev/null 2>&1; then
        pid=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$pid" ]; then
            print_color "$YELLOW" "Killing $service on port $port (PID: $pid)..."
            kill $pid 2>/dev/null || kill -9 $pid 2>/dev/null || true
            print_color "$GREEN" "✅ $service stopped"
        fi
    # Try netstat (Windows Git Bash)
    elif command -v netstat >/dev/null 2>&1; then
        pid=$(netstat -ano | grep ":$port " | awk '{print $5}' | head -1)
        if [ ! -z "$pid" ]; then
            print_color "$YELLOW" "Killing $service on port $port (PID: $pid)..."
            taskkill //PID $pid //F 2>/dev/null || true
            print_color "$GREEN" "✅ $service stopped"
        fi
    fi
}

# Stop services
print_color "$YELLOW" "Stopping all services..."
echo

# Try to stop by PID files first
kill_by_pid_file "backend"
kill_by_pid_file "frontend"
kill_by_pid_file "admin"

echo

# Fallback: kill by port
print_color "$YELLOW" "Checking ports as fallback..."
kill_by_port "Backend" 8080
kill_by_port "Frontend" 3000
kill_by_port "Admin" 3001

echo

print_color "$GREEN" "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              ✅ ALL SERVICES STOPPED! ✅                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
"

print_color "$CYAN" "
📝 Logs are preserved in logs/ directory
   You can view them anytime:
   - logs/backend.log
   - logs/frontend.log
   - logs/admin.log
"
