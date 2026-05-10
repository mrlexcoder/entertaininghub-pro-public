# EntertainingHub Pro - Quick Reference Card

## 🚀 Quick Commands

### Start Everything (Docker)
```bash
docker-compose up -d
```

### Start Backend Only
```bash
cd backend
make dev
```

### Stop Everything
```bash
docker-compose down
```

## 📡 API Endpoints Cheat Sheet

### Base URL
```
http://localhost:8080/api
```

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/refresh` | Refresh token | No |

### Content (Public)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/content` | List all content | No |
| GET | `/content/:id` | Get by ID | No |
| GET | `/content/slug/:slug` | Get by slug | No |
| GET | `/content/search?q=query` | Search content | No |
| GET | `/content/trending` | Trending content | No |

### User (Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get profile | Yes |
| PUT | `/user/profile` | Update profile | Yes |
| GET | `/user/watchlist` | Get watchlist | Yes |
| POST | `/user/watchlist/:id` | Add to watchlist | Yes |
| DELETE | `/user/watchlist/:id` | Remove from watchlist | Yes |

### Admin (Protected + Admin)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/content` | Create content | Yes (Admin) |
| PUT | `/admin/content/:id` | Update content | Yes (Admin) |
| DELETE | `/admin/content/:id` | Delete content | Yes (Admin) |
| POST | `/admin/content/:id/publish` | Publish content | Yes (Admin) |

## 🔑 Environment Variables

### Required
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=entertainzen
DB_PASSWORD=your_password
DB_NAME=entertainzen
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
```

### Optional
```env
PORT=8080
ENV=development
TMDB_API_KEY=your_key
STRIPE_SECRET_KEY=your_key
```

## 📦 Database Models

### User
- ID, Username, Email, Password
- Subscription Tier (free, premium, creator)
- Preferences, Avatar, Bio

### Content
- ID, Title, Slug, Description
- Type (movie, series, anime, gaming, documentary, 18plus)
- Genre, Language, Release Year
- IMDb Rating, Views Count

### Episode
- ID, Content ID, Season, Episode Number
- Title, Description, Duration
- Video URL, Thumbnail

### Review
- ID, Content ID, User ID
- Rating (1-10), Title, Content
- Helpful/Unhelpful Count

### Watchlist
- ID, User ID, Content ID
- Position, Added At, Watched At

### Recommendation
- ID, User ID, Content ID
- Type (personalized, trending, similar, category)
- Score, Reason

### Watch History
- ID, User ID, Content ID, Episode ID
- Watch Duration, Progress %
- Completed Status

## 🛠️ Development Commands

### Backend
```bash
make dev          # Start dev server
make build        # Build binary
make test         # Run tests
make migrate      # Run migrations
make clean        # Clean build artifacts
```

### Docker
```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f            # View logs
docker-compose logs -f backend    # View backend logs
docker-compose restart backend    # Restart backend
```

### Git
```bash
git status                        # Check status
git add .                         # Stage all changes
git commit -m "message"           # Commit changes
git log --oneline                 # View commit history
```

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@test.com","password":"Pass1234"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Pass1234"}'
```

### Get Content (with token)
```bash
curl http://localhost:8080/api/content \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Content (Admin)
```bash
curl -X POST http://localhost:8080/api/admin/content \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inception",
    "content_type": "movie",
    "description": "A mind-bending thriller",
    "genre": ["Sci-Fi", "Thriller"],
    "release_year": 2010
  }'
```

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

### Database Connection Failed
1. Check PostgreSQL is running
2. Verify credentials in `.env`
3. Ensure database exists

### Redis Connection Failed
1. Check Redis is running
2. Verify Redis host/port in `.env`

### Docker Issues
```bash
docker-compose down -v    # Remove volumes
docker system prune -a    # Clean everything
docker-compose up --build # Rebuild images
```

## 📊 Project Structure

```
backend/
├── cmd/api/              # Entry point
├── internal/
│   ├── config/          # Configuration
│   ├── database/        # DB connections
│   ├── models/          # Data models
│   ├── handlers/        # API controllers
│   ├── middleware/      # Middleware
│   ├── services/        # Business logic
│   ├── repositories/    # Data access
│   └── utils/           # Helpers
└── api/                 # Routes
```

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `cmd/api/main.go` | Application entry point |
| `api/routes.go` | API route definitions |
| `internal/models/*.go` | Database models |
| `internal/handlers/*.go` | Request handlers |
| `.env` | Environment configuration |
| `docker-compose.yml` | Service orchestration |

## 📞 Support

- **Email**: mrlexcoder@gmail.com
- **Project**: EntertainingHub Pro
- **Tech Stack**: Go + PostgreSQL + Redis

## 🎓 Resources

- [Go Documentation](https://golang.org/doc/)
- [Gin Framework](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Redis](https://redis.io/documentation)

---

**Keep this card handy for quick reference! 📌**
