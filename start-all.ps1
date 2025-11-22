# Start Both Frontend and Backend
Write-Host "Starting Event Management Application..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Start backend in a new window
Write-Host "`nStarting Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-backend.ps1"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in a new window
Write-Host "Starting Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-frontend.ps1"

Write-Host "`nBoth services are starting in separate windows." -ForegroundColor Yellow
Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "`nPress any key to exit this window (services will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

<<<<<<< HEAD
=======

>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
