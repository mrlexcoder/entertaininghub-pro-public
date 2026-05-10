package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type WatchHistory struct {
	ID                   uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID               uuid.UUID  `gorm:"type:uuid;not null;index" json:"user_id"`
	User                 *User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	ContentID            uuid.UUID  `gorm:"type:uuid;not null;index" json:"content_id"`
	Content              *Content   `gorm:"foreignKey:ContentID" json:"content,omitempty"`
	EpisodeID            *uuid.UUID `gorm:"type:uuid;index" json:"episode_id"`
	Episode              *Episode   `gorm:"foreignKey:EpisodeID" json:"episode,omitempty"`
	WatchDurationSeconds int        `gorm:"not null" json:"watch_duration_seconds"`
	TotalDurationSeconds int        `gorm:"not null" json:"total_duration_seconds"`
	ProgressPercentage   float64    `gorm:"not null" json:"progress_percentage"`
	WatchedAt            time.Time  `gorm:"index" json:"watched_at"`
	Completed            bool       `gorm:"default:false" json:"completed"`
}

func (WatchHistory) TableName() string {
	return "watch_history"
}

func (w *WatchHistory) BeforeCreate(tx *gorm.DB) error {
	if w.ID == uuid.Nil {
		w.ID = uuid.New()
	}
	if w.WatchedAt.IsZero() {
		w.WatchedAt = time.Now()
	}
	// Calculate progress percentage
	if w.TotalDurationSeconds > 0 {
		w.ProgressPercentage = float64(w.WatchDurationSeconds) / float64(w.TotalDurationSeconds) * 100
		if w.ProgressPercentage >= 90 {
			w.Completed = true
		}
	}
	return nil
}
