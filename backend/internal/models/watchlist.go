package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Watchlist struct {
	ID        uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID    uuid.UUID  `gorm:"type:uuid;not null;index" json:"user_id"`
	User      *User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	ContentID uuid.UUID  `gorm:"type:uuid;not null;index" json:"content_id"`
	Content   *Content   `gorm:"foreignKey:ContentID" json:"content,omitempty"`
	Position  int        `gorm:"default:0" json:"position"`
	AddedAt   time.Time  `json:"added_at"`
	WatchedAt *time.Time `json:"watched_at"`
}

func (Watchlist) TableName() string {
	return "watchlist"
}

func (w *Watchlist) BeforeCreate(tx *gorm.DB) error {
	if w.ID == uuid.Nil {
		w.ID = uuid.New()
	}
	if w.AddedAt.IsZero() {
		w.AddedAt = time.Now()
	}
	return nil
}
