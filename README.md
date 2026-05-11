<div align="center">

# 🎬 EntertainingHub Pro

### Premium Entertainment Streaming Platform

**Movies · Series · Anime · Gaming · Documentaries · 18+ Content**

[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat&logo=go&logoColor=white)](https://golang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Lit](https://img.shields.io/badge/Lit-3.0-324FFF?style=flat&logo=lit&logoColor=white)](https://lit.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

[🌐 Live Demo](https://entertainingzen.com) · [📚 Docs](docs/) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## 🚀 Overview

**EntertainingHub Pro** is a next-generation entertainment platform that unifies multiple content types with AI-powered recommendations, creator monetization, and a premium user experience — built for `entertainingzen.com`.

> No platform combines ALL entertainment types with AI recommendations. EntertainingHub fills that gap.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎯 **Unified Hub** | Movies, Series, Anime, Gaming, Documentaries, 18+ — all in one place |
| 🤖 **AI Recommendations** | Collaborative + content-based filtering |
| 👥 **Creator Platform** | 60/40 revenue split for indie creators |
| 💎 **Freemium Model** | Ad-supported free tier + Premium subscriptions |
| 📊 **Analytics Dashboard** | Real-time creator & admin analytics |
| 🔒 **Privacy-First** | No tracking — smart algorithms only |
| ⚡ **Blazing Fast** | Go backend + Lit frontend = lightweight & performant |
| 🌐 **PWA Ready** | Install on any device |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────────┐    ┌──────────────────────────┐   │
│  │  Frontend         │    │  Admin Panel              │   │
│  │  Lit 3 + TS       │    │  React 18 + Tailwind      │   │
│  │  :3000            │    │  :3001                    │   │
│  └────────┬─────────┘    └────────────┬─────────────┘   │
└───────────┼──────────────────────────┼─────────────────┘
            │ REST API                 │ REST API
┌───────────▼──────────────────────────▼─────────────────┐
│              Go 1.21+ (Gin)  :8080                      │
│         Handler → Service → Repository                  │
│         JWT · CORS · Rate Limit · Logging               │
└───────────┬──────────────────────────┬─────────────────┘
            │                          │
    ┌───────▼──────┐          ┌────────▼────────┐
    │ PostgreSQL 18 │          │    Redis 7       │
    │ Primary Store │          │  Cache + Session │
    └──────────────┘          └─────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend** | Go + Gin | 1.21+ |
| **Database** | PostgreSQL | 18 |
| **Cache** | Redis | 7 |
| **Frontend** | Lit + TypeScript | 3.0 |
| **Admin Panel** | React + Tailwind CSS | 18 |
| **Build Tool** | Vite | 5 |
| **Auth** | JWT + bcrypt | — |
| **Deployment** | Docker + Nginx | — |
| **CI/CD** | GitHub Actions | — |

---

## 📁 Project Structure

```
entertainingzen/
├── backend/              # Go API server (Gin + GORM)
│   ├── cmd/api/          # Entry point
│   ├── internal/
│   │   ├── handlers/     # HTTP controllers
│   │   ├── services/     # Business logic
│   │   ├── repositories/ # Data access layer
│   │   ├── models/       # Database models
│   │   ├── middleware/   # JWT, CORS, rate limit
│   │   └── utils/        # Helpers
│   └── api/routes.go     # Route definitions
│
├── frontend/             # Lit + TypeScript web app
│   └── src/
│       ├── components/   # Web components
│       ├── pages/        # Page components
│       ├── services/     # API clients
│       ├── stores/       # State management
│       └── styles/       # Design tokens + global CSS
│
├── admin-panel/          # React + Tailwind admin dashboard
│   └── src/
│       ├── components/   # Layout, forms, tables
│       ├── pages/        # Dashboard, Content, Users
│       ├── store/        # Redux Toolkit
│       └── hooks/        # Custom React hooks
│
├── docs/                 # Documentation
├── .github/              # CI/CD workflows + issue templates
├── docker-compose.yml    # Local development
├── start-all.bat         # Windows one-command start
└── start-all.sh          # Linux/Mac one-command start
```

---

## ⚡ Quick Start

### Option 1 — One Command (Windows)
```cmd
cd entertainingzen
start-all.bat
```

### Option 2 — One Command (Linux/Mac)
```bash
cd entertainingzen
./start-all.sh
```

### Option 3 — Docker Compose
```bash
cd entertainingzen
docker-compose up -d
```

### Option 4 — Manual

```bash
# Backend
cd backend && go run cmd/api/main.go

# Frontend
cd frontend && npm install && npm run dev

# Admin Panel
cd admin-panel && npm install && npm run dev
```

---

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| 🔧 Backend API | http://localhost:8080 |
| 🏥 Health Check | http://localhost:8080/api/health |
| 🎨 Frontend | http://localhost:3000 |
| 🎛️ Admin Panel | http://localhost:3001 |

---

## 📡 API Endpoints

```
GET    /api/health                  Health check
POST   /api/auth/register           Register user
POST   /api/auth/login              Login
GET    /api/content                 List content
GET    /api/content/trending        Trending content
GET    /api/content/search?q=query  Search
GET    /api/user/profile            User profile (auth)
POST   /api/admin/content           Create content (admin)
```

Full API docs → [docs/API.md](docs/API.md)

---

## 💰 Monetization Model

```
Freemium Tier  →  Ad-supported, basic content
Premium Tier   →  $9.99/month — Ad-free, exclusive content
Creator Tier   →  $19.99/month — Creator tools + analytics
Revenue Share  →  60/40 split with indie creators
```

---

## 🗺️ Roadmap

- [x] Go backend with full REST API
- [x] Lit + TypeScript frontend
- [x] React admin dashboard
- [x] JWT authentication
- [x] PostgreSQL + Redis setup
- [x] Docker containerization
- [x] GitHub Actions CI/CD
- [ ] AI recommendation engine
- [ ] Payment integration (Stripe + Razorpay)
- [ ] Email notifications
- [ ] WebSocket real-time updates
- [ ] IMDb / TMDB content scraping
- [ ] Mobile PWA
- [ ] Kubernetes deployment

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines.

1. Fork the repo
2. Create a branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m "feat: add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**mrlexcoder**
- 🌐 Website: [entertainingzen.com](https://entertainingzen.com)
- 🐦 Twitter: [@MrLexCoder](https://twitter.com/MrLexCoder)
- 📧 Email: mrlexcoder@gmail.com
- 💼 GitHub: [@mrlexcoder](https://github.com/mrlexcoder)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Built with ❤️ by [mrlexcoder](https://github.com/mrlexcoder)

</div>
