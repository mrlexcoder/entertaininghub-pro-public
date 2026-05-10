package config

import (
	"os"
	"time"
)

type Config struct {
	// Application
	Env     string
	Port    string
	AppName string

	// Database
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	DBSSLMode  string

	// Redis
	RedisHost     string
	RedisPort     string
	RedisPassword string
	RedisDB       int

	// JWT
	JWTSecret        string
	JWTExpiry        time.Duration
	JWTRefreshExpiry time.Duration

	// CORS
	CORSAllowedOrigins []string

	// Rate Limiting
	RateLimitRequests int
	RateLimitDuration time.Duration

	// External APIs
	TMDBAPIKey string
	IMDBAPIKey string

	// Storage
	StorageType       string
	AWSRegion         string
	AWSBucket         string
	AWSAccessKeyID    string
	AWSSecretAccessKey string

	// Payment
	StripeSecretKey      string
	StripePublishableKey string
	RazorpayKeyID        string
	RazorpayKeySecret    string

	// Email
	SMTPHost     string
	SMTPPort     string
	SMTPUser     string
	SMTPPassword string
	SMTPFrom     string

	// Logging
	LogLevel  string
	LogFormat string
}

func Load() *Config {
	return &Config{
		// Application
		Env:     getEnv("ENV", "development"),
		Port:    getEnv("PORT", "8080"),
		AppName: getEnv("APP_NAME", "EntertainingHub Pro"),

		// Database
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "entertainzen"),
		DBPassword: getEnv("DB_PASSWORD", ""),
		DBName:     getEnv("DB_NAME", "entertainzen"),
		DBSSLMode:  getEnv("DB_SSLMODE", "disable"),

		// Redis
		RedisHost:     getEnv("REDIS_HOST", "localhost"),
		RedisPort:     getEnv("REDIS_PORT", "6379"),
		RedisPassword: getEnv("REDIS_PASSWORD", ""),
		RedisDB:       0,

		// JWT
		JWTSecret:        getEnv("JWT_SECRET", "your-super-secret-jwt-key"),
		JWTExpiry:        parseDuration(getEnv("JWT_EXPIRY", "24h")),
		JWTRefreshExpiry: parseDuration(getEnv("JWT_REFRESH_EXPIRY", "168h")),

		// External APIs
		TMDBAPIKey: getEnv("TMDB_API_KEY", ""),
		IMDBAPIKey: getEnv("IMDB_API_KEY", ""),

		// Storage
		StorageType:        getEnv("STORAGE_TYPE", "local"),
		AWSRegion:          getEnv("AWS_REGION", "us-east-1"),
		AWSBucket:          getEnv("AWS_BUCKET", ""),
		AWSAccessKeyID:     getEnv("AWS_ACCESS_KEY_ID", ""),
		AWSSecretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY", ""),

		// Payment
		StripeSecretKey:      getEnv("STRIPE_SECRET_KEY", ""),
		StripePublishableKey: getEnv("STRIPE_PUBLISHABLE_KEY", ""),
		RazorpayKeyID:        getEnv("RAZORPAY_KEY_ID", ""),
		RazorpayKeySecret:    getEnv("RAZORPAY_KEY_SECRET", ""),

		// Email
		SMTPHost:     getEnv("SMTP_HOST", ""),
		SMTPPort:     getEnv("SMTP_PORT", "587"),
		SMTPUser:     getEnv("SMTP_USER", ""),
		SMTPPassword: getEnv("SMTP_PASSWORD", ""),
		SMTPFrom:     getEnv("SMTP_FROM", "noreply@entertainingzen.com"),

		// Logging
		LogLevel:  getEnv("LOG_LEVEL", "debug"),
		LogFormat: getEnv("LOG_FORMAT", "json"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func parseDuration(s string) time.Duration {
	d, err := time.ParseDuration(s)
	if err != nil {
		return 24 * time.Hour
	}
	return d
}
