@echo off
echo Starting Event Management Backend...
cd backend

REM Check if Maven is available
where mvn >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Using Maven to start the backend...
    mvn spring-boot:run
) else (
    echo Maven not found. Trying to run JAR file...
    if exist "target\event-management-backend-0.0.1-SNAPSHOT.jar" (
        echo Starting backend from JAR file...
        java -jar target\event-management-backend-0.0.1-SNAPSHOT.jar
    ) else (
        echo ERROR: JAR file not found. Please build the project first using Maven.
        echo Install Maven and run: mvn clean package
        pause
    )
)

