# EntertainingHub Pro - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Go 1.21+
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

## 📦 Installation

### Option 1: Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Manual Setup

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
go mod download

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
nano .env

# Run migrations
make migrate

# Start development server
make dev
```

Backend will be available at: http://localhost:8080

#### 2. Frontend Setup (Coming Next)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:3000

#### 3. Admin Panel Setup (Coming Next)

```bash
cd admin-panel

# Install dependencies
npm install

# Start development server
npm run dev
```

Admin panel will be available at: http://localhost:3001

## 🗄️ Database Setup

### PostgreSQL

```sql
CREATE DATABASE entertainzen;
CREATE USER entertainzen WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE entertainzen TO entertainzen;
```

### Redis

Redis should be running on default port 6379.

## 🔑 Environment Variables

### Backend (.env)

```env
# Application
ENV=development
PORT=8080

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=entertainzen
DB_PASSWORD=your_secure_password
DB_NAME=entertainzen
DB_SSLMODE=disable

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=24h
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### Content (Public)
```
GET /api/content
GET /api/content/:id
GET /api/content/slug/:slug
GET /api/content/search?q=query
GET /api/content/trending
```

### User (Protected)
```
GET /api/user/profile
PUT /api/user/profile
GET /api/user/watchlist
POST /api/user/watchlist/:id
DELETE /api/user/watchlist/:id
```

### Admin (Protected + Admin)
```
POST /api/admin/content
PUT /api/admin/content/:id
DELETE /api/admin/content/:id
POST /api/admin/content/:id/publish
```

## 🧪 Testing

```bash
# Backend tests
cd backend
make test

# Frontend tests (coming soon)
cd frontend
npm run test

# Admin panel tests (coming soon)
cd admin-panel
npm run test
```

## 📝 Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Test your changes**
   ```bash
   make test
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in .env
- Verify database exists

### Redis Connection Issues
- Ensure Redis is running
- Check Redis host and port in .env

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

## 📚 Next Steps

1. ✅ Backend API (Complete)
2. ⏳ Frontend (Lit + TypeScript) - Coming Next
3. ⏳ Admin Panel (React + TypeScript) - Coming Next
4. ⏳ Recommendation Engine
5. ⏳ Payment Integration
6. ⏳ Email Notifications
7. ⏳ WebSocket Real-time Updates

## 🤝 Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Entertainzen Team**
