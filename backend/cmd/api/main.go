package main

import (
	"fmt"
	"log"
	"os"

	"github.com/entertainzen/entertaininghub-pro/internal/config"
	"github.com/entertainzen/entertaininghub-pro/internal/database"
	"github.com/entertainzen/entertaininghub-pro/api"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Initialize configuration
	cfg := config.Load()

	// Initialize database
	db, err := database.InitPostgres(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Run migrations
	if err := database.RunMigrations(db); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize Redis
	redisClient := database.InitRedis(cfg)
	if err := redisClient.Ping(redisClient.Context()).Err(); err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	// Set Gin mode
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize router
	router := api.SetupRouter(db, redisClient, cfg)

	// Start server
	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("🚀 Server starting on %s", addr)
	log.Printf("📚 API Documentation: http://localhost:%s/api/docs", cfg.Port)
	log.Printf("🏥 Health Check: http://localhost:%s/api/health", cfg.Port)

	if err := router.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
