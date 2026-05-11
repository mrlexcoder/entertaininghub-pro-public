# EntertainingHub Pro — Development Guide

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Go | 1.21+ | https://go.dev/dl/ |
| Node.js | 18+ | https://nodejs.org/ |
| PostgreSQL | 15+ | https://www.postgresql.org/ |
| Redis | 7+ | https://redis.io/ |
| Git | Latest | https://git-scm.com/ |
| Docker | Latest | https://www.docker.com/ |

## Local Setup

### 1. Clone

```bash
git clone https://github.com/mrlexcoder/entertaininghub-pro.git
cd entertaininghub-pro/entertainingzen
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your DB credentials
go mod download
go run cmd/api/main.go
```

Backend runs at: http://localhost:8080

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

### 4. Admin Panel

```bash
cd admin-panel
npm install
npm run dev
```

Admin runs at: http://localhost:3001

### 5. One-command start (Windows)

```cmd
start-all.bat
```

### 6. One-command start (Linux/Mac)

```bash
./start-all.sh
```

## Environment Variables

### Backend `.env`

```env
ENV=development
PORT=8080
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=entertainzen
DB_PASSWORD=your_password
DB_NAME=entertainzen
DB_SSLMODE=disable
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h
```

## Database Setup

```sql
CREATE USER entertainzen WITH PASSWORD 'your_password';
CREATE DATABASE entertainzen OWNER entertainzen;
GRANT ALL PRIVILEGES ON DATABASE entertainzen TO entertainzen;
```

## Project Structure

```
entertainingzen/
├── backend/          # Go API (Gin + GORM)
├── frontend/         # Lit + TypeScript
├── admin-panel/      # React + Tailwind
├── docs/             # Documentation
├── .github/          # CI/CD workflows
├── docker-compose.yml
├── Makefile
└── start-all.bat / start-all.sh
```

## Useful Commands

```bash
# Backend
cd backend
go build ./...          # Build
go test ./...           # Test
go run cmd/api/main.go  # Run

# Frontend
cd frontend
npm run dev             # Dev server
npm run build           # Production build
npm run lint            # Lint

# Admin
cd admin-panel
npm run dev             # Dev server
npm run build           # Production build
```
