# Backend Startup Script
Write-Host "Starting Event Management Backend..." -ForegroundColor Green

# Navigate to backend directory
Set-Location -Path "$PSScriptRoot\backend"

# Check if Maven is available
$mvnCmd = Get-Command mvn -ErrorAction SilentlyContinue

if ($mvnCmd) {
    Write-Host "Using Maven to start the backend..." -ForegroundColor Yellow
    mvn spring-boot:run
} else {
    Write-Host "Maven not found in PATH. Trying to run JAR file..." -ForegroundColor Yellow
    
    # Check if JAR exists
    $jarPath = "target\event-management-backend-0.0.1-SNAPSHOT.jar"
    if (Test-Path $jarPath) {
        Write-Host "Starting backend from JAR file..." -ForegroundColor Yellow
        java -jar $jarPath
    } else {
        Write-Host "ERROR: JAR file not found. Please build the project first using Maven." -ForegroundColor Red
        Write-Host "Install Maven and run: mvn clean package" -ForegroundColor Yellow
        Write-Host "Or use an IDE like IntelliJ IDEA or Eclipse to run the Spring Boot application." -ForegroundColor Yellow
        pause
    }
}


