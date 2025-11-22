# Event Management Backend (Spring Boot)

Minimal Spring Boot backend scaffold for the Event Management app.

Quick start (requires JDK 17+, MySQL installed locally):

1. Configure environment variables or edit `src/main/resources/application.properties`:

   - DATABASE_URL (JDBC URL) - default: jdbc:mysql://localhost:3306/event_db
   - DATABASE_USER
   - DATABASE_PASSWORD
   - JWT_SECRET

2. Build and run:

```powershell
cd backend
mvn spring-boot:run
```

The app runs on http://localhost:8080 by default.

Notes:
- This is a minimal skeleton (entities, repos, auth controller, simple JWT util).
- For production, secure JWT secret, enable HTTPS, and tune JPA settings.
