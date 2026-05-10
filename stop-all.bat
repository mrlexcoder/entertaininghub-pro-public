@echo off
REM EntertainingHub Pro - Stop All Services (Windows)

echo.
echo ===============================================================
echo.
echo        🛑 ENTERTAININGHUB PRO - STOP SCRIPT 🛑
echo.
echo ===============================================================
echo.

echo Stopping all services...
echo.

REM Kill processes by port
echo Stopping Backend (port 8080)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo ✅ Backend stopped
echo.

echo Stopping Frontend (port 3000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo ✅ Frontend stopped
echo.

echo Stopping Admin Panel (port 3001)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo ✅ Admin Panel stopped
echo.

REM Also kill by window title
taskkill /FI "WINDOWTITLE eq EntertainingHub Backend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq EntertainingHub Frontend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq EntertainingHub Admin*" /F >nul 2>&1

echo.
echo ===============================================================
echo.
echo               ✅ ALL SERVICES STOPPED! ✅
echo.
echo ===============================================================
echo.
echo 📝 Logs are preserved in logs\ directory
echo    You can view them anytime:
echo    - logs\backend.log
echo    - logs\frontend.log
echo    - logs\admin.log
echo.
echo ===============================================================
echo.

pause
