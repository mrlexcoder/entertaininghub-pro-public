# EntertainingHub Pro — Database Schema

## Overview

- **Database**: PostgreSQL 18
- **ORM**: GORM
- **Migrations**: Auto-migrate via GORM

---

## Tables

### users
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| username | VARCHAR | Unique |
| email | VARCHAR | Unique |
| password_hash | VARCHAR | bcrypt |
| first_name | VARCHAR | |
| last_name | VARCHAR | |
| avatar_url | VARCHAR | |
| bio | TEXT | |
| is_premium | BOOLEAN | default false |
| is_creator | BOOLEAN | default false |
| is_admin | BOOLEAN | default false |
| subscription_tier | VARCHAR | free/premium/creator |
| subscription_expires_at | TIMESTAMP | nullable |
| preferred_language | VARCHAR | default 'en' |
| content_preferences | JSONB | genres, maturity |
| email_verified | BOOLEAN | default false |
| last_login | TIMESTAMP | nullable |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |
| deleted_at | TIMESTAMP | soft delete |

### content
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| title | VARCHAR | indexed |
| slug | VARCHAR | unique |
| description | TEXT | |
| content_type | VARCHAR | movie/series/anime/documentary/gaming/18plus |
| genre | TEXT[] | array |
| language | TEXT[] | array |
| release_year | INTEGER | |
| duration_minutes | INTEGER | |
| poster_url | VARCHAR | |
| banner_url | VARCHAR | |
| trailer_url | VARCHAR | |
| maturity_rating | VARCHAR | U/UA/A/18+ |
| imdb_rating | FLOAT | |
| views_count | BIGINT | default 0 |
| is_published | BOOLEAN | default false |
| created_by_id | UUID | FK → users |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |
| deleted_at | TIMESTAMP | soft delete |

### episodes
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| content_id | UUID | FK → content |
| season_number | INTEGER | |
| episode_number | INTEGER | |
| title | VARCHAR | |
| duration_minutes | INTEGER | |
| video_url | VARCHAR | |
| is_published | BOOLEAN | |

### reviews
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| content_id | UUID | FK → content |
| user_id | UUID | FK → users |
| rating | INTEGER | 1–10 |
| title | VARCHAR | |
| body | TEXT | |
| helpful_count | INTEGER | |

### watchlist
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | FK → users |
| content_id | UUID | FK → content |
| position | INTEGER | ordering |
| added_at | TIMESTAMP | |
| watched_at | TIMESTAMP | nullable |

### watch_history
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | FK → users |
| content_id | UUID | FK → content |
| episode_id | UUID | FK → episodes, nullable |
| watch_duration_seconds | INTEGER | |
| total_duration_seconds | INTEGER | |
| progress_percentage | FLOAT | |
| completed | BOOLEAN | |
| watched_at | TIMESTAMP | |

### recommendations
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | FK → users |
| content_id | UUID | FK → content |
| recommendation_type | VARCHAR | personalized/trending/similar/category |
| score | FLOAT | 0–1 |
| reason | VARCHAR | |
| clicked | BOOLEAN | |
| watched | BOOLEAN | |
| expires_at | TIMESTAMP | 7 days TTL |

---

## Indexes

```sql
-- Content performance
CREATE INDEX idx_content_type_published ON content(content_type, is_published);
CREATE INDEX idx_content_views ON content(views_count DESC);
CREATE INDEX idx_content_rating ON content(imdb_rating DESC);
CREATE INDEX idx_content_genre ON content USING GIN(genre);

-- Full-text search
CREATE INDEX idx_content_search ON content
  USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Watch history
CREATE INDEX idx_watch_history_user ON watch_history(user_id, watched_at DESC);

-- Recommendations
CREATE INDEX idx_recommendations_user ON recommendations(user_id, recommendation_type);
CREATE INDEX idx_recommendations_expires ON recommendations(expires_at);
```
