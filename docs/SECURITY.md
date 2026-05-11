# EntertainingHub Pro — Security Guidelines

## Authentication & Authorization

- **JWT tokens** — 24h expiry, 7-day refresh window
- **bcrypt** — password hashing with cost factor 10
- **Role-based access** — User / Creator / Admin tiers
- **Token blacklisting** — via Redis on logout

## API Security

- CORS whitelist — only allowed origins
- Rate limiting — 100 requests/minute per IP
- Input validation — all endpoints validated
- SQL injection prevention — GORM parameterized queries
- XSS prevention — output encoding

## Data Protection

- Passwords never stored in plain text
- Sensitive fields encrypted at rest (bank_account, tax_id)
- Soft deletes — data preserved, not destroyed
- HTTPS enforced in production

## Reporting Vulnerabilities

Email: mrlexcoder@gmail.com  
Please do not open public issues for security vulnerabilities.
