package database

import (
	"log"

	"github.com/entertainzen/entertaininghub-pro/internal/models"
	"gorm.io/gorm"
)

// RunMigrations runs all database migrations
func RunMigrations(db *gorm.DB) error {
	log.Println("Running database migrations...")

	// Enable UUID extension
	if err := db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"").Error; err != nil {
		return err
	}

	// Auto migrate all models
	err := db.AutoMigrate(
		&models.User{},
		&models.Content{},
		&models.Episode{},
		&models.Review{},
		&models.Watchlist{},
		&models.Recommendation{},
		&models.WatchHistory{},
	)

	if err != nil {
		return err
	}

	// Create indexes
	if err := createIndexes(db); err != nil {
		return err
	}

	log.Println("✅ Migrations completed successfully")
	return nil
}

func createIndexes(db *gorm.DB) error {
	// Content indexes
	db.Exec("CREATE INDEX IF NOT EXISTS idx_content_type_published ON content(content_type, is_published)")
	db.Exec("CREATE INDEX IF NOT EXISTS idx_content_genre ON content USING GIN(genre)")
	db.Exec("CREATE INDEX IF NOT EXISTS idx_content_language ON content USING GIN(language)")
	db.Exec("CREATE INDEX IF NOT EXISTS idx_content_views ON content(views_count DESC)")
	db.Exec("CREATE INDEX IF NOT EXISTS idx_content_rating ON content(imdb_rating DESC)")

	// User indexes
	db.Exec("CREATE INDEX IF NOT EXISTS idx_users_subscription ON users(subscription_tier, is_premium)")

	// Watch history indexes
	db.Exec("CREATE INDEX IF NOT EXISTS idx_watch_history_user_content ON watch_history(user_id, content_id)")
	db.Exec("CREATE INDEX IF NOT EXISTS idx_watch_history_watched_at ON watch_history(watched_at DESC)")

	// Recommendation indexes
	db.Exec("CREATE INDEX IF NOT EXISTS idx_recommendations_user_type ON recommendations(user_id, recommendation_type)")
	db.Exec("CREATE INDEX IF NOT EXISTS idx_recommendations_expires ON recommendations(expires_at)")

	// Review indexes
	db.Exec("CREATE INDEX IF NOT EXISTS idx_reviews_content_rating ON reviews(content_id, rating DESC)")

	// Full-text search index for content
	db.Exec("CREATE INDEX IF NOT EXISTS idx_content_search ON content USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')))")

	return nil
}
