# EntertainingHub Pro — API Documentation

Base URL: `http://localhost:8080/api`  
Production: `https://api.entertainingzen.com/api`

---

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | System health check |

**Response:**
```json
{
  "status": "healthy",
  "services": { "postgres": "healthy", "redis": "healthy" },
  "timestamp": "2026-05-11T00:00:00Z"
}
```

---

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login user |
| POST | `/auth/refresh` | No | Refresh JWT token |

**Register:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Login:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "username": "johndoe", "email": "john@example.com" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/content` | No | List all published content |
| GET | `/content/:id` | No | Get content by ID |
| GET | `/content/slug/:slug` | No | Get content by slug |
| GET | `/content/search?q=query` | No | Search content |
| GET | `/content/trending?limit=10` | No | Get trending content |
| POST | `/content/:id/view` | Yes | Record a view |
| POST | `/content/:id/review` | Yes | Submit a review |

**Query Parameters for `/content`:**
- `page` (default: 1)
- `page_size` (default: 20)
- `type` — filter by: `movie`, `series`, `anime`, `documentary`, `gaming`, `18plus`

---

### User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/user/profile` | Yes | Get current user profile |
| PUT | `/user/profile` | Yes | Update profile |
| GET | `/user/watchlist` | Yes | Get watchlist |
| POST | `/user/watchlist/:id` | Yes | Add to watchlist |
| DELETE | `/user/watchlist/:id` | Yes | Remove from watchlist |

---

### Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/admin/content` | Admin | Create content |
| PUT | `/admin/content/:id` | Admin | Update content |
| DELETE | `/admin/content/:id` | Admin | Delete content |
| POST | `/admin/content/:id/publish` | Admin | Publish content |

---

## Error Responses

```json
{
  "success": false,
  "error": "Error message here"
}
```

| Status | Meaning |
|--------|---------|
| 400 | Bad Request — invalid input |
| 401 | Unauthorized — missing/invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

- 100 requests per minute per IP
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`
