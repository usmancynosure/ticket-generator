#!/bin/bash

echo "========================================"
echo "  Ticket Generator - Starting..."
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "[ERROR] .env file not found!"
    echo "Please create .env from .env.example"
    echo ""
    echo "Run: cp .env.example .env"
    echo "Then edit .env with your configuration"
    echo ""
    exit 1
fi

echo "[1/3] Checking backend dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

echo ""
echo "[2/3] Checking frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
cd ..

echo ""
echo "[3/3] Starting servers..."
echo ""
echo "Backend will start on http://localhost:5000"
echo "Frontend will start on http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""
echo "========================================"

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Start backend
npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for background processes
wait


