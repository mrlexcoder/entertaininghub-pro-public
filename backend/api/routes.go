package api

import (
	"net/http"

	"github.com/entertainzen/entertaininghub-pro/internal/config"
	"github.com/entertainzen/entertaininghub-pro/internal/handlers"
	"github.com/entertainzen/entertaininghub-pro/internal/middleware"
	"github.com/entertainzen/entertaininghub-pro/internal/repositories"
	"github.com/entertainzen/entertaininghub-pro/internal/services"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB, redisClient *redis.Client, cfg *config.Config) *gin.Engine {
	router := gin.Default()

	// Global middleware
	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.LoggingMiddleware())

	// Initialize repositories
	userRepo := repositories.NewUserRepository(db)
	contentRepo := repositories.NewContentRepository(db)

	// Initialize services
	authService := services.NewAuthService(userRepo, cfg)
	userService := services.NewUserService(userRepo)
	contentService := services.NewContentService(contentRepo)

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(authService)
	contentHandler := handlers.NewContentHandler(contentService)
	healthHandler := handlers.NewHealthHandler(db, redisClient)

	// Public routes
	api := router.Group("/api")
	{
		// Health check
		api.GET("/health", healthHandler.HealthCheck)

		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
			auth.POST("/refresh", authHandler.RefreshToken)
		}

		// Public content routes
		content := api.Group("/content")
		{
			content.GET("", contentHandler.GetAll)
			content.GET("/:id", contentHandler.GetByID)
			content.GET("/slug/:slug", contentHandler.GetBySlug)
			content.GET("/search", contentHandler.Search)
			content.GET("/trending", contentHandler.GetTrending)
		}
	}

	// Protected routes (require authentication)
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware(cfg))
	{
		// User routes
		user := protected.Group("/user")
		{
			user.GET("/profile", authHandler.GetProfile)
			user.PUT("/profile", authHandler.UpdateProfile)
			user.GET("/watchlist", contentHandler.GetWatchlist)
			user.POST("/watchlist/:id", contentHandler.AddToWatchlist)
			user.DELETE("/watchlist/:id", contentHandler.RemoveFromWatchlist)
		}

		// Content interaction routes
		protected.POST("/content/:id/view", contentHandler.RecordView)
		protected.POST("/content/:id/review", contentHandler.CreateReview)
	}

	// Admin routes (require admin privileges)
	admin := api.Group("/admin")
	admin.Use(middleware.AuthMiddleware(cfg))
	admin.Use(middleware.AdminMiddleware())
	{
		// Content management
		admin.POST("/content", contentHandler.Create)
		admin.PUT("/content/:id", contentHandler.Update)
		admin.DELETE("/content/:id", contentHandler.Delete)
		admin.POST("/content/:id/publish", contentHandler.Publish)
	}

	// 404 handler
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Route not found",
		})
	})

	return router
}
