# Frontend Startup Script
Write-Host "Starting Event Management Frontend..." -ForegroundColor Green

# Navigate to frontend directory (root of event-management)
Set-Location -Path $PSScriptRoot

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting development server..." -ForegroundColor Yellow
npm run dev

<<<<<<< HEAD
=======

>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
