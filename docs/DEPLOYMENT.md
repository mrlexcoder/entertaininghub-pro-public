# EntertainingHub Pro — Deployment Guide

## Local Development

```bash
# Windows
start-all.bat

# Linux/Mac
./start-all.sh
```

## Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Production Deployment

### Environment Variables

Set these in your production environment:

```env
ENV=production
PORT=8080
DB_HOST=your-db-host
DB_PASSWORD=strong-password
JWT_SECRET=very-long-random-secret
REDIS_HOST=your-redis-host
```

### Docker Build

```bash
# Backend
docker build -t entertaininghub-backend ./backend

# Frontend
docker build -t entertaininghub-frontend ./frontend

# Admin
docker build -t entertaininghub-admin ./admin-panel
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name entertainingzen.com;

    location /api {
        proxy_pass http://backend:8080;
    }

    location / {
        proxy_pass http://frontend:3000;
    }
}
```

## URLs

| Service | Local | Production |
|---------|-------|------------|
| Backend | http://localhost:8080 | https://api.entertainingzen.com |
| Frontend | http://localhost:3000 | https://entertainingzen.com |
| Admin | http://localhost:3001 | https://admin.entertainingzen.com |
