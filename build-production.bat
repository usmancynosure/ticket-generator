@echo off
echo ========================================
echo   Building for Production...
echo ========================================
echo.

echo [1/3] Installing backend dependencies...
call npm install

echo.
echo [2/3] Installing frontend dependencies...
cd frontend
call npm install

echo.
echo [3/3] Building frontend...
call npm run build
cd ..

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Frontend build is in: frontend/dist/
echo.
echo To test production build locally:
echo   npm start
echo.
echo To deploy:
echo   See DEPLOYMENT.md for instructions
echo.
pause


