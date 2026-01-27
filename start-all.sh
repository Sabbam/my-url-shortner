#!/bin/bash
# Script to start both Backend (Spring Boot) and Frontend (Next.js)

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM EXIT

echo "Starting Backend (Java Spring Boot)..."
./setup-and-run-backend.sh &
BACKEND_PID=$!

echo "Waiting for Backend to initialize..."
sleep 10

echo "Starting Frontend (Next.js)..."
cd app
npm run dev &
FRONTEND_PID=$!

echo "Both servers are running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8080"
echo "Press Ctrl+C to stop both servers."

wait $BACKEND_PID $FRONTEND_PID
