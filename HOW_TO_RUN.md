# 🚀 How to Run EntertainingHub Pro - SUPER SIMPLE!

## 🎯 ONE COMMAND TO START EVERYTHING!

I've created automated scripts that start **ALL services** with just **ONE command**!

---

## 🪟 For Windows Users

### 1. Open Terminal (Command Prompt or PowerShell)
```cmd
cd D:\Startup_media\EntertainZen\entertainingzen
```

### 2. Run the Start Script
```cmd
start-all.bat
```

### 3. That's It! 🎉

The script will:
- ✅ Check if Go, Node.js, and npm are installed
- ✅ Install all dependencies automatically
- ✅ Start Backend on port 8080
- ✅ Start Frontend on port 3000
- ✅ Start Admin Panel on port 3001
- ✅ Open your browser automatically

### To Stop Everything:
```cmd
stop-all.bat
```

---

## 🐧 For Linux/Mac Users (or Git Bash on Windows)

### 1. Open Terminal
```bash
cd /path/to/entertainingzen
```

### 2. Make Scripts Executable (First Time Only)
```bash
chmod +x start-all.sh stop-all.sh
```

### 3. Run the Start Script
```bash
./start-all.sh
```

### To Stop Everything:
```bash
./stop-all.sh
```

---

## 🌐 What You'll See

After running the script, you'll see something like this:

```
===============================================================

        🎬 ENTERTAININGHUB PRO - STARTUP SCRIPT 🎬

   Starting: Backend + Frontend + Admin Panel

===============================================================

📋 Checking prerequisites...
✅ All prerequisites installed

🔧 BACKEND SETUP (Go + PostgreSQL + Redis)
📦 Installing Go dependencies...
✅ Go dependencies installed
🚀 Starting Backend on port 8080...
✅ Backend started

🎨 FRONTEND SETUP (Lit + TypeScript)
📦 Installing Frontend dependencies...
✅ Frontend dependencies installed
🚀 Starting Frontend on port 3000...
✅ Frontend started

🎛️  ADMIN PANEL SETUP (React + TypeScript + Tailwind)
📦 Installing Admin Panel dependencies...
✅ Admin Panel dependencies installed
🚀 Starting Admin Panel on port 3001...
✅ Admin Panel started

===============================================================

               🎉 ALL SERVICES STARTED! 🎉

===============================================================

📡 Access URLs:
  🔧 Backend API:     http://localhost:8080
  🏥 Health Check:    http://localhost:8080/api/health
  🎨 Frontend:        http://localhost:3000
  🎛️  Admin Panel:     http://localhost:3001
```

---

## 🎯 Access Your Application

Once started, open your browser and visit:

| Service | URL | What It Is |
|---------|-----|------------|
| **Frontend** | http://localhost:3000 | Main user website |
| **Admin Panel** | http://localhost:3001 | Admin dashboard |
| **Backend API** | http://localhost:8080 | REST API |
| **Health Check** | http://localhost:8080/api/health | Check if backend is running |

---

## 📝 View Logs

All logs are saved in the `logs/` folder:

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

### "Port already in use" Error

**Windows:**
```cmd
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill it (replace XXXX with the PID)
taskkill /F /PID XXXX
```

**Linux/Mac:**
```bash
# Find what's using port 8080
lsof -i :8080

# Kill it (replace XXXX with the PID)
kill -9 XXXX
```

### "Go not found" or "Node not found"

You need to install:
- **Go 1.21+**: https://go.dev/dl/
- **Node.js 18+**: https://nodejs.org/

### Script Won't Run (Linux/Mac)

Make sure it's executable:
```bash
chmod +x start-all.sh stop-all.sh
```

---

## 💡 Pro Tips

### First Time Running
- The first run will take **2-5 minutes** (installing dependencies)
- Subsequent runs will be **much faster** (10-20 seconds)

### Development Workflow
1. Run `start-all.bat` (or `./start-all.sh`)
2. Edit your code
3. Changes auto-reload in browser
4. When done, run `stop-all.bat` (or `./stop-all.sh`)

### Check if Everything is Running
```bash
curl http://localhost:8080/api/health
```

Should return:
```json
{
  "status": "healthy",
  "services": {
    "postgres": "healthy",
    "redis": "healthy"
  }
}
```

---

## 🎬 Complete Example

### Windows Example:
```cmd
C:\> cd D:\Startup_media\EntertainZen\entertainingzen
D:\Startup_media\EntertainZen\entertainingzen> start-all.bat

[Wait 10-20 seconds...]

✅ All services started!
🌐 Browser opens automatically to http://localhost:3000

[Do your work...]

D:\Startup_media\EntertainZen\entertainingzen> stop-all.bat
✅ All services stopped!
```

### Linux/Mac Example:
```bash
$ cd ~/projects/entertainingzen
$ ./start-all.sh

[Wait 10-20 seconds...]

✅ All services started!
Open browser to http://localhost:3000

[Do your work...]

$ ./stop-all.sh
✅ All services stopped!
```

---

## 🐳 Alternative: Using Docker

If you prefer Docker:

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f
```

---

## 📊 What's Running?

After starting, you'll have:

```
┌─────────────────────────────────────────┐
│  Backend (Go)                           │
│  Port: 8080                             │
│  Status: ✅ Running                     │
│  Log: logs/backend.log                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Frontend (Lit + TypeScript)            │
│  Port: 3000                             │
│  Status: ✅ Running                     │
│  Log: logs/frontend.log                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Admin Panel (React + TypeScript)       │
│  Port: 3001                             │
│  Status: ✅ Running                     │
│  Log: logs/admin.log                    │
└─────────────────────────────────────────┘
```

---

## 🎉 You're Ready!

Just run **ONE command** and everything starts:

**Windows:** `start-all.bat`
**Linux/Mac:** `./start-all.sh`

That's it! No need to open multiple terminals or remember complex commands! 🚀

---

## 📞 Need Help?

- **Email**: mrlexcoder@gmail.com
- **Check Logs**: `logs/` directory
- **Documentation**: See other .md files

---

**Happy Coding! 💻✨**
