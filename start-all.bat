@echo off
REM EntertainingHub Pro - Start All Services (Windows)
REM This script starts Backend, Frontend, and Admin Panel

setlocal enabledelayedexpansion

echo.
echo ===============================================================
echo.
echo        🎬 ENTERTAININGHUB PRO - STARTUP SCRIPT 🎬
echo.
echo   Starting: Backend + Frontend + Admin Panel
echo.
echo ===============================================================
echo.

REM Check prerequisites
echo 📋 Checking prerequisites...

where go >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Go is not installed. Please install Go 1.21+
    pause
    exit /b 1
)

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm
    pause
    exit /b 1
)

echo ✅ All prerequisites installed
echo.

REM Create logs directory
if not exist logs mkdir logs

REM Backend Setup
echo ===============================================================
echo 🔧 BACKEND SETUP (Go + PostgreSQL + Redis)
echo ===============================================================
echo.

cd backend

if not exist .env (
    echo ⚠️  .env file not found, copying from .env.example
    copy .env.example .env
    echo ✅ Created .env file
)

echo 📦 Installing Go dependencies...
go mod download
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install Go dependencies
    cd ..
    pause
    exit /b 1
)
echo ✅ Go dependencies installed
echo.

echo 🚀 Starting Backend on port 8080...
start "EntertainingHub Backend" cmd /c "go run cmd/api/main.go > ..\logs\backend.log 2>&1"
echo ✅ Backend started
echo.

cd ..

REM Wait for backend to be ready
echo ⏳ Waiting for backend to be ready...
timeout /t 5 /nobreak >nul

REM Frontend Setup
echo ===============================================================
echo 🎨 FRONTEND SETUP (Lit + TypeScript)
echo ===============================================================
echo.

cd frontend

if not exist .env (
    echo ⚠️  .env file not found, copying from .env.example
    copy .env.example .env
    echo ✅ Created .env file
)

if not exist node_modules (
    echo 📦 Installing Frontend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install Frontend dependencies
        cd ..
        pause
        exit /b 1
    )
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)
echo.

echo 🚀 Starting Frontend on port 3000...
start "EntertainingHub Frontend" cmd /c "npm run dev > ..\logs\frontend.log 2>&1"
echo ✅ Frontend started
echo.

cd ..

REM Admin Panel Setup
echo ===============================================================
echo 🎛️  ADMIN PANEL SETUP (React + TypeScript + Tailwind)
echo ===============================================================
echo.

cd admin-panel

if not exist node_modules (
    echo 📦 Installing Admin Panel dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install Admin Panel dependencies
        cd ..
        pause
        exit /b 1
    )
    echo ✅ Admin Panel dependencies installed
) else (
    echo ✅ Admin Panel dependencies already installed
)
echo.

echo 🚀 Starting Admin Panel on port 3001...
start "EntertainingHub Admin" cmd /c "npm run dev > ..\logs\admin.log 2>&1"
echo ✅ Admin Panel started
echo.

cd ..

REM Success message
echo.
echo ===============================================================
echo.
echo               🎉 ALL SERVICES STARTED! 🎉
echo.
echo ===============================================================
echo.
echo 📡 Access URLs:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   🔧 Backend API:     http://localhost:8080
echo   🏥 Health Check:    http://localhost:8080/api/health
echo   🎨 Frontend:        http://localhost:3000
echo   🎛️  Admin Panel:     http://localhost:3001
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📝 Logs:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   Backend:  logs\backend.log
echo   Frontend: logs\frontend.log
echo   Admin:    logs\admin.log
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🛑 To stop all services, run:
echo    stop-all.bat
echo.
echo    Or close the terminal windows manually
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 💡 Tips:
echo   - View logs: type logs\backend.log
echo   - Check status: curl http://localhost:8080/api/health
echo   - Frontend will auto-reload on file changes
echo   - Admin panel will auto-reload on file changes
echo.
echo ===============================================================
echo.
echo ✨ All services are running in separate windows
echo    You can minimize this window
echo.

REM Open browser automatically
timeout /t 3 /nobreak >nul
echo 🌐 Opening browser...
start http://localhost:3000

echo.
echo Press any key to exit this window (services will keep running)...
pause >nul
