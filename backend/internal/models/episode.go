package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Episode struct {
	ID              uuid.UUID      `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	ContentID       uuid.UUID      `gorm:"type:uuid;not null;index" json:"content_id"`
	Content         *Content       `gorm:"foreignKey:ContentID" json:"content,omitempty"`
	SeasonNumber    int            `gorm:"not null;index" json:"season_number"`
	EpisodeNumber   int            `gorm:"not null;index" json:"episode_number"`
	Title           string         `gorm:"not null" json:"title"`
	Description     string         `gorm:"type:text" json:"description"`
	DurationMinutes int            `json:"duration_minutes"`
	ReleaseDate     *time.Time     `json:"release_date"`
	VideoURL        string         `json:"video_url"`
	ThumbnailURL    string         `json:"thumbnail_url"`
	IsPublished     bool           `gorm:"default:false;index" json:"is_published"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
}

func (Episode) TableName() string {
	return "episodes"
}

func (e *Episode) BeforeCreate(tx *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}
