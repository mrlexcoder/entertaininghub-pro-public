package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

type HealthHandler struct {
	db          *gorm.DB
	redisClient *redis.Client
}

func NewHealthHandler(db *gorm.DB, redisClient *redis.Client) *HealthHandler {
	return &HealthHandler{
		db:          db,
		redisClient: redisClient,
	}
}

func (h *HealthHandler) HealthCheck(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	health := gin.H{
		"status":    "healthy",
		"timestamp": time.Now().Format(time.RFC3339),
		"services":  gin.H{},
	}

	// Check PostgreSQL
	sqlDB, err := h.db.DB()
	if err != nil || sqlDB.Ping() != nil {
		health["services"].(gin.H)["postgres"] = "unhealthy"
		health["status"] = "degraded"
	} else {
		health["services"].(gin.H)["postgres"] = "healthy"
	}

	// Check Redis
	if err := h.redisClient.Ping(ctx).Err(); err != nil {
		health["services"].(gin.H)["redis"] = "unhealthy"
		health["status"] = "degraded"
	} else {
		health["services"].(gin.H)["redis"] = "healthy"
	}

	statusCode := http.StatusOK
	if health["status"] == "degraded" {
		statusCode = http.StatusServiceUnavailable
	}

	c.JSON(statusCode, health)
}
