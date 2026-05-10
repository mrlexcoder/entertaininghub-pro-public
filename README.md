# EntertainingHub Pro 🎬🎮

> A Premium Entertainment Streaming Platform combining Gaming, Movies, Series, Documentaries, Anime & More

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://golang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Lit](https://img.shields.io/badge/Lit-3.0-324FFF?logo=lit)](https://lit.dev/)

## 🚀 Overview

EntertainingHub is a next-generation entertainment platform that unifies multiple content types with AI-powered recommendations, creator monetization, and a premium user experience.

### Key Features

- 🎯 **Unified Entertainment Hub**: Movies, Series, Gaming, Documentaries, Anime, 18+ Content
- 🤖 **AI-Powered Recommendations**: Collaborative + Content-based filtering
- 👥 **Creator-First Platform**: 60/40 revenue split for indie creators
- 💎 **Freemium Model**: Ad-supported free tier + Premium subscriptions
- 📊 **Advanced Analytics**: Real-time creator dashboard
- 🔒 **Privacy-First**: No tracking, smart algorithms only
- ⚡ **Blazing Fast**: Lit + Go = Lightweight & performant

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Go 1.21+ (Gin) | High-performance API server |
| **Database** | PostgreSQL 15 | Primary data store with JSONB support |
| **Cache** | Redis 7 | Session storage & recommendation caching |
| **Frontend** | Lit 3.0 + TypeScript | Lightweight Web Components |
| **Admin Panel** | React 18 + Tailwind | Complex forms & analytics |
| **Build Tool** | Vite 5 | Fast HMR & optimized builds |
| **Auth** | JWT + bcrypt | Stateless authentication |
| **Deployment** | Docker + Nginx | Containerized & scalable |

### Project Structure

```
entertainingzen/
├── backend/          # Go API server
├── frontend/         # Lit + TypeScript web app
├── admin-panel/      # React admin dashboard
├── infrastructure/   # Docker, K8s, Terraform
├── docs/            # Documentation
└── scripts/         # Automation scripts
```

## 🛠️ Quick Start

### Prerequisites

- Go 1.21+
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/entertainzen/entertaininghub-pro.git
   cd entertaininghub-pro
   ```

2. **Setup Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   go mod download
   make migrate
   make dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Setup Admin Panel**
   ```bash
   cd admin-panel
   npm install
   npm run dev
   ```

### Using Docker Compose

```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Admin Panel: http://localhost:3001

## 📚 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Development Setup](docs/DEVELOPMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

## 🎯 Roadmap

### Phase 1: MVP (Current)
- [x] Project architecture
- [ ] Backend API (Go)
- [ ] Frontend UI (Lit)
- [ ] Admin Dashboard (React)
- [ ] Authentication & Authorization
- [ ] Content Management
- [ ] Basic Recommendations

### Phase 2: Enhanced Features
- [ ] Advanced AI Recommendations
- [ ] Creator Dashboard
- [ ] Payment Integration (Stripe, Razorpay)
- [ ] Email Notifications
- [ ] Real-time WebSocket Updates
- [ ] Content Scraping (IMDb, TMDB)

### Phase 3: Scale & Optimize
- [ ] Mobile Apps (React Native)
- [ ] CDN Integration (CloudFlare)
- [ ] Advanced Analytics
- [ ] A/B Testing Framework
- [ ] Performance Optimization
- [ ] Kubernetes Deployment

## 💰 Monetization Model

- **Freemium Tier**: Ad-supported, basic content
- **Premium Tier**: $9.99/month - Ad-free, exclusive content
- **Creator Tier**: $19.99/month - Creator tools + analytics
- **Revenue Share**: 60/40 split with indie creators

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: Entertainzen
- **Contact**: mrlexcoder@gmail.com

## 🌟 Support

If you find this project useful, please give it a ⭐️!

---

**Built with ❤️ by the Entertainzen Team**
