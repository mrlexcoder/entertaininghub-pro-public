# 🚀 EntertainingHub Pro - Startup Scripts Guide

## Quick Start - One Command to Rule Them All!

I've created automated startup scripts that will start **all services** (Backend, Frontend, Admin Panel) with a single command!

---

## 📁 Available Scripts

| Script | Platform | Purpose |
|--------|----------|---------|
| **start-all.bat** | Windows | Start all services |
| **start-all.sh** | Linux/Mac/Git Bash | Start all services |
| **stop-all.bat** | Windows | Stop all services |
| **stop-all.sh** | Linux/Mac/Git Bash | Stop all services |

---

## 🪟 Windows Users

### Start Everything
```cmd
# Double-click the file, or run in terminal:
start-all.bat
```

### Stop Everything
```cmd
# Double-click the file, or run in terminal:
stop-all.bat
```

---

## 🐧 Linux/Mac Users (or Git Bash on Windows)

### Start Everything
```bash
# Make executable (first time only)
chmod +x start-all.sh stop-all.sh

# Run the script
./start-all.sh
```

### Stop Everything
```bash
./stop-all.sh
```

---

## ✨ What the Scripts Do

### Start Script (`start-all.bat` / `start-all.sh`)

1. **Checks Prerequisites**
   - ✅ Go 1.21+ installed
   - ✅ Node.js 18+ installed
   - ✅ npm installed

2. **Checks Ports**
   - ✅ Port 8080 (Backend) available
   - ✅ Port 3000 (Frontend) available
   - ✅ Port 3001 (Admin) available
   - 🔧 Offers to kill processes if ports are in use

3. **Backend Setup**
   - 📦 Installs Go dependencies
   - 🔧 Creates .env if missing
   - 🚀 Starts backend on port 8080
   - ⏳ Waits for backend to be ready

4. **Frontend Setup**
   - 📦 Installs npm dependencies (if needed)
   - 🔧 Creates .env if missing
   - 🚀 Starts frontend on port 3000

5. **Admin Panel Setup**
   - 📦 Installs npm dependencies (if needed)
   - 🚀 Starts admin panel on port 3001

6. **Success!**
   - 🎉 All services running
   - 📝 Logs saved to `logs/` directory
   - 🌐 Opens browser automatically (Windows)

### Stop Script (`stop-all.bat` / `stop-all.sh`)

1. **Stops All Services**
   - 🛑 Kills backend process
   - 🛑 Kills frontend process
   - 🛑 Kills admin panel process

2. **Preserves Logs**
   - 📝 Keeps all logs in `logs/` directory

---

## 📡 Access URLs (After Starting)

| Service | URL | Description |
|---------|-----|-------------|
| **Backend API** | http://localhost:8080 | REST API server |
| **Health Check** | http://localhost:8080/api/health | Backend health status |
| **Frontend** | http://localhost:3000 | User-facing web app |
| **Admin Panel** | http://localhost:3001 | Admin dashboard |

---

## 📝 Logs

All logs are saved in the `logs/` directory:

```
logs/
├── backend.log      # Backend server logs
├── frontend.log     # Frontend dev server logs
└── admin.log        # Admin panel dev server logs
```

### View Logs

**Windows:**
```cmd
type logs\backend.log
type logs\frontend.log
type logs\admin.log
```

**Linux/Mac:**
```bash
tail -f logs/backend.log
tail -f logs/frontend.log
tail -f logs/admin.log
```

---

## 🔧 Troubleshooting

### Port Already in Use

**Windows:**
```cmd
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process by PID
taskkill /F /PID <PID>
```

**Linux/Mac:**
```bash
# Find process using port 8080
lsof -i :8080

# Kill process by PID
kill -9 <PID>
```

### Script Won't Run (Linux/Mac)

```bash
# Make sure script is executable
chmod +x start-all.sh stop-all.sh

# Run with bash explicitly
bash start-all.sh
```

### Dependencies Not Installing

**Backend:**
```bash
cd backend
go mod download
go mod tidy
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Admin Panel:**
```bash
cd admin-panel
rm -rf node_modules package-lock.json
npm install
```

### Backend Won't Start

1. Check if PostgreSQL is running
2. Check if Redis is running
3. Verify `.env` file exists in `backend/`
4. Check `logs/backend.log` for errors

### Frontend/Admin Won't Start

1. Check if Node.js is installed: `node --version`
2. Check if npm is installed: `npm --version`
3. Delete `node_modules` and reinstall
4. Check logs for errors

---

## 🎯 Manual Start (Alternative)

If you prefer to start services manually:

### Terminal 1 - Backend
```bash
cd backend
make dev
# or
go run cmd/api/main.go
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

### Terminal 3 - Admin Panel
```bash
cd admin-panel
npm install
npm run dev
```

---

## 🐳 Docker Alternative

If you prefer Docker:

```bash
docker-compose up -d
```

Stop with:
```bash
docker-compose down
```

---

## 💡 Pro Tips

1. **First Time Setup**
   - Run `start-all.bat` (Windows) or `./start-all.sh` (Linux/Mac)
   - Wait for all dependencies to install
   - This may take 2-5 minutes

2. **Subsequent Runs**
   - Much faster (dependencies already installed)
   - Usually starts in 10-20 seconds

3. **Development Workflow**
   - Keep services running
   - Edit code - changes auto-reload
   - Check logs if something breaks

4. **Clean Restart**
   - Run `stop-all` script
   - Wait 5 seconds
   - Run `start-all` script

5. **Check Status**
   ```bash
   curl http://localhost:8080/api/health
   ```

---

## 🎬 Demo Workflow

### Day 1 - First Time
```bash
# Windows
start-all.bat

# Linux/Mac
./start-all.sh

# Wait for installation (2-5 minutes)
# Browser opens automatically
# Start coding!
```

### Day 2+ - Regular Use
```bash
# Start (10-20 seconds)
start-all.bat  # or ./start-all.sh

# Code all day...
# Services auto-reload on changes

# Stop when done
stop-all.bat  # or ./stop-all.sh
```

---

## 📊 What Happens Behind the Scenes

```
start-all script
    │
    ├─> Check prerequisites (Go, Node, npm)
    │
    ├─> Check ports (8080, 3000, 3001)
    │
    ├─> Backend
    │   ├─> Install Go dependencies
    │   ├─> Create .env if missing
    │   ├─> Start server
    │   └─> Wait for health check
    │
    ├─> Frontend
    │   ├─> Install npm dependencies
    │   ├─> Create .env if missing
    │   └─> Start dev server
    │
    └─> Admin Panel
        ├─> Install npm dependencies
        └─> Start dev server
```

---

## 🎉 Success Indicators

When everything is running correctly, you'll see:

✅ Backend: `✅ Backend started (PID: XXXX)`
✅ Frontend: `✅ Frontend started (PID: XXXX)`
✅ Admin: `✅ Admin Panel started (PID: XXXX)`

And you can access:
- http://localhost:8080/api/health (should return `{"status":"healthy"}`)
- http://localhost:3000 (Frontend homepage)
- http://localhost:3001 (Admin login)

---

## 🆘 Need Help?

1. **Check Logs**: `logs/backend.log`, `logs/frontend.log`, `logs/admin.log`
2. **Check Ports**: Make sure 8080, 3000, 3001 are free
3. **Check Prerequisites**: Go, Node.js, npm installed
4. **Check Database**: PostgreSQL and Redis running (for backend)
5. **Read Error Messages**: Scripts show helpful error messages

---

## 📞 Support

- **Email**: mrlexcoder@gmail.com
- **Project**: EntertainingHub Pro
- **Documentation**: See other .md files in root directory

---

## 🎊 You're All Set!

Just run **one command** and everything starts! 🚀

**Windows:** `start-all.bat`
**Linux/Mac:** `./start-all.sh`

Happy coding! 💻✨
