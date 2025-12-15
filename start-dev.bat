@echo off
echo ========================================
echo   Ticket Generator - Starting...
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo [ERROR] .env file not found!
    echo Please create .env from .env.example
    echo.
    echo Run: copy .env.example .env
    echo Then edit .env with your configuration
    echo.
    pause
    exit /b 1
)

echo [1/3] Checking backend dependencies...
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)

echo.
echo [2/3] Checking frontend dependencies...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)
cd ..

echo.
echo [3/3] Starting servers...
echo.
echo Backend will start on http://localhost:5000
echo Frontend will start on http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.
echo ========================================

REM Start backend in a new window
start "Ticket Generator - Backend" cmd /k "npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in a new window
start "Ticket Generator - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Servers are starting...
echo   Check the new windows that opened
echo ========================================
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak > nul

REM Open browser
start http://localhost:5173

echo.
echo Done! Both servers are running.
echo Close this window or press any key to exit this script.
echo (The servers will keep running in their own windows)
echo.
pause

