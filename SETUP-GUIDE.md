# Event Management - Setup and Run Guide

## Current Issue
The backend JAR file was compiled before a security configuration fix. It needs to be rebuilt with the updated code.

## Solution Options

### Option 1: Install Maven and Rebuild (Recommended)

1. **Download Maven:**
   - Go to: https://maven.apache.org/download.cgi
   - Download the `apache-maven-3.9.x-bin.zip` file
   - Extract it to a folder (e.g., `C:\Program Files\Apache\maven`)

2. **Add Maven to PATH:**
   - Open System Properties → Environment Variables
   - Under "System variables", find "Path" and click "Edit"
   - Click "New" and add: `C:\Program Files\Apache\maven\bin`
   - Click OK on all dialogs

3. **Verify Installation:**
   ```powershell
   mvn --version
   ```

4. **Rebuild and Run Backend:**
   ```powershell
   cd event-management\backend
   mvn clean package
   mvn spring-boot:run
   ```

### Option 2: Use IntelliJ IDEA (Easiest)

1. **Install IntelliJ IDEA Community Edition** (free)
   - Download from: https://www.jetbrains.com/idea/download/

2. **Open Project:**
   - File → Open → Select `event-management` folder
   - IntelliJ will detect it's a Maven project and download dependencies

3. **Run Backend:**
   - Find `EventManagementApplication.java` in `backend/src/main/java/com/example/backend/`
   - Right-click → Run 'EventManagementApplication'
   - IntelliJ will compile and run automatically

### Option 3: Use Eclipse

1. **Install Eclipse IDE for Enterprise Java and Web Developers**
   - Download from: https://www.eclipse.org/downloads/

2. **Import Project:**
   - File → Import → Maven → Existing Maven Projects
   - Select the `backend` folder
   - Click Finish

3. **Run Backend:**
   - Right-click on `EventManagementApplication.java`
   - Run As → Java Application

### Option 4: Use VS Code with Java Extension Pack

1. **Install VS Code** and **Java Extension Pack**
   - Install from: https://code.visualstudio.com/
   - Install "Extension Pack for Java" from VS Code marketplace

2. **Open Project:**
   - File → Open Folder → Select `event-management` folder
   - VS Code will detect Java projects

3. **Run Backend:**
   - Open `EventManagementApplication.java`
   - Click "Run" button above the main method

## Quick Start (After Rebuilding)

Once the backend is rebuilt, you can use the startup scripts:

### Start Both Services:
- Double-click `start-all.ps1` (PowerShell)
- Or double-click `start-all.bat` (Command Prompt)

### Start Separately:
- **Backend**: `start-backend.ps1` or `start-backend.bat`
- **Frontend**: `start-frontend.ps1` or `start-frontend.bat`

## Verify Everything is Running

- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:5173

## Troubleshooting

### Backend won't start:
- Make sure MySQL is running
- Check database credentials in `backend/src/main/resources/application.properties`
- Ensure port 8080 is not in use

### Frontend won't start:
- Run `npm install` in the `event-management` folder
- Make sure Node.js is installed

### Port already in use:
- Stop any existing Java/Node processes
- Or change ports in configuration files

<<<<<<< HEAD
=======

>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
