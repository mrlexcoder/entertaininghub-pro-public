# EntertainingHub Pro

A full-stack entertainment streaming platform built from scratch.

---

## What it is

A unified platform for movies, series, anime, gaming, and documentaries — with AI-powered recommendations, creator monetization, and a premium user experience.

Domain: entertainingzen.com

---

## Tech Stack

**Backend**
- Go 1.21 — REST API, business logic, authentication
- Gin — HTTP framework and routing
- PostgreSQL 18 — primary database
- Redis 7 — caching and session storage
- JWT + bcrypt — authentication and security

**Frontend**
- Lit 3 + TypeScript — lightweight web components
- Vite 5 — build tool and dev server
- Vaadin Router — client-side routing

**Admin Panel**
- React 18 + TypeScript — admin dashboard
- Tailwind CSS — styling
- Redux Toolkit — state management

**DevOps**
- Docker + Docker Compose — containerization
- GitHub Actions — CI/CD pipelines
- Nginx — reverse proxy

---

## Architecture

Clean layered architecture on the backend:

```
Handler → Service → Repository → Database
```

Frontend uses Web Components with Lit Context for state management.
Admin panel uses Redux for complex state across the dashboard.

---

## Current Status

- Backend API complete — 20+ endpoints
- Frontend structure complete — Lit components, routing, services
- Admin panel complete — dashboard, content management, analytics
- CI/CD configured — automated tests and builds on push

---

## Languages Used

Go, TypeScript, SQL, CSS, HTML, YAML (CI/CD), Dockerfile
