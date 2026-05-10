package database

import (
	"fmt"
	"log"

	"github.com/entertainzen/entertaininghub-pro/internal/config"
	"github.com/redis/go-redis/v9"
)

func InitRedis(cfg *config.Config) *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", cfg.RedisHost, cfg.RedisPort),
		Password: cfg.RedisPassword,
		DB:       cfg.RedisDB,
	})

	log.Println("✅ Redis client created")
	return client
}
