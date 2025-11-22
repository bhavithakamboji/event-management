# How to Run Event Management Application

## Quick Start

### Option 1: Run Both Services (Recommended)
Double-click `start-all.ps1` (PowerShell) or `start-all.bat` (Command Prompt)

This will start both backend and frontend in separate windows.

### Option 2: Run Services Separately

#### Backend:
- **PowerShell**: Right-click `start-backend.ps1` → "Run with PowerShell"
- **Command Prompt**: Double-click `start-backend.bat`

#### Frontend:
- **PowerShell**: Right-click `start-frontend.ps1` → "Run with PowerShell"
- **Command Prompt**: Double-click `start-frontend.bat`

## Manual Start

### Backend (Spring Boot)
```powershell
cd backend
mvn spring-boot:run
```

Or if Maven is not available:
```powershell
cd backend
java -jar target\event-management-backend-0.0.1-SNAPSHOT.jar
```

**Backend runs on:** http://localhost:8080

### Frontend (React + Vite)
```powershell
npm install  # First time only
npm run dev
```

**Frontend runs on:** http://localhost:5173

## Prerequisites

- **Java JDK 17+** (for backend)
- **Node.js and npm** (for frontend)
- **MySQL** (database server)
- **Maven** (optional, for building backend)

## Database Configuration

The backend is configured to connect to MySQL:
- **Host**: localhost:3306
- **Database**: eventdb
- **Username**: root
- **Password**: root

Make sure MySQL is running before starting the backend.

To change database settings, edit: `backend/src/main/resources/application.properties`

