# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ Yes    |

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Email: **mrlexcoder@gmail.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (optional)

We will respond within **48 hours** and aim to release a fix within **7 days** for critical issues.

## Security Measures

- JWT authentication with 24h expiry
- bcrypt password hashing (cost 10)
- CORS whitelist
- Rate limiting (100 req/min)
- SQL injection prevention via GORM
- Input validation on all endpoints
- HTTPS enforced in production
- Soft deletes — no data destruction
