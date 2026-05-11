# EntertainingHub Pro — Architecture

## Overview

EntertainingHub Pro is a full-stack entertainment streaming platform built with a modern, scalable architecture.

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────────┐    ┌──────────────────────────┐   │
│  │  Frontend         │    │  Admin Panel              │   │
│  │  Lit 3 + TS       │    │  React 18 + Tailwind      │   │
│  │  :3000            │    │  :3001                    │   │
│  └────────┬─────────┘    └────────────┬─────────────┘   │
└───────────┼──────────────────────────┼─────────────────┘
            │ HTTP/REST                │ HTTP/REST
┌───────────▼──────────────────────────▼─────────────────┐
│                    API Layer                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Go 1.21+ (Gin Framework)  :8080                  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │   │
│  │  │ Handlers │ │ Services │ │  Repositories    │  │   │
│  │  │ (HTTP)   │→│ (Logic)  │→│  (Data Access)   │  │   │
│  │  └──────────┘ └──────────┘ └──────────────────┘  │   │
│  │  Middleware: JWT · CORS · Rate Limit · Logging    │   │
│  └──────────────────────────────────────────────────┘   │
└───────────┬──────────────────────────┬─────────────────┘
            │                          │
┌───────────▼──────┐      ┌────────────▼────────────────┐
│  PostgreSQL 18    │      │  Redis 7                     │
│  Primary Store    │      │  Cache + Sessions            │
│  :5432            │      │  :6379                       │
└──────────────────┘      └─────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Backend | Go + Gin | 1.21+ | Performance, concurrency |
| Database | PostgreSQL | 18 | JSONB, full-text search |
| Cache | Redis | 7 | Fast session + rec caching |
| Frontend | Lit + TypeScript | 3.0 | Lightweight Web Components |
| Admin | React + Tailwind | 18 | Rich UI, rapid development |
| Build | Vite | 5 | Fast HMR, optimized builds |
| Auth | JWT + bcrypt | — | Stateless, secure |
| Deploy | Docker + Nginx | — | Scalable, containerized |

## Design Patterns

### Backend
- **Clean Architecture**: Handler → Service → Repository
- **Dependency Injection**: All dependencies injected via constructors
- **Repository Pattern**: Abstracted data access layer
- **Middleware Pipeline**: Composable request processing

### Frontend
- **Web Components**: Lit custom elements, encapsulated styles
- **Context API**: Lit Context for global state (auth)
- **Service Layer**: Typed API clients per domain
- **CSS Variables**: Design tokens for consistent theming

### Admin Panel
- **Redux Toolkit**: Predictable state management
- **Protected Routes**: Auth-gated navigation
- **Component Composition**: Reusable layout + page components

## Security

- JWT tokens (24h expiry, 7d refresh)
- bcrypt password hashing (cost 10)
- CORS whitelist
- Rate limiting (100 req/min)
- SQL injection prevention via GORM parameterized queries
- Input validation on all endpoints
- Soft deletes (data preservation)

## Scalability

- Stateless API (horizontal scaling ready)
- Redis caching for recommendations + sessions
- Database connection pooling (max 100 connections)
- Indexed queries for performance
- Docker containerization
- Kubernetes manifests included
