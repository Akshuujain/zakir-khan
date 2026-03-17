# Zakir Khan OTT Platform - Local Setup Guide

This project is a scalable SaaS platform for OTT creators, starting with Zakir Khan's exclusive content.

## Project Structure
- `backend/`: Spring Boot Microservices
  - `core-service`: Tenant and Content management (Port 8081)
  - `auth-service`: JWT Authentication (Port 8082)
- `frontend/`: React Web Applications
  - `creator-dashboard`: Dashboard for content creators (Port 3000)
  - `viewer-web`: Netflix-style viewer platform (Port 3001)
- `mobile/`: React Native (Expo) application for iOS/Android

## Prerequisites
1. **Java 17+**: (Detected: Java 23)
2. **Node.js & npm**: [Download here](https://nodejs.org/)
3. **Maven**: [Download here](https://maven.apache.org/download.cgi) (or use your IDE)

## Running Locally

### 1. Backend (Spring Boot)
Open each service folder and run:
```bash
mvn spring-boot:run
```
Once running, explore the APIs via Swagger UI:
- Core Service: [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)
- Auth Service: [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)
*Note: The services are configured to use an in-memory H2 database for zero-config local runs.*

### 2. Frontend (React)
Open each frontend folder and run:
```bash
npm install
npm run dev
```

### 3. Mobile (React Native/Expo)
Open the mobile folder and run:
```bash
npm install
npm start
```
Use the [Expo Go](https://expo.dev/go) app on your phone to scan the QR code and see the app.

## Scaling to AWS (Future Phase)
Once local testing is complete, you can switch the `application.yml` profiles to:
- **PostgreSQL on AWS RDS**
- **AWS S3** for media storage
- **AWS IVS** for live streaming
