package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Review struct {
	ID              uuid.UUID      `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	ContentID       uuid.UUID      `gorm:"type:uuid;not null;index" json:"content_id"`
	Content         *Content       `gorm:"foreignKey:ContentID" json:"content,omitempty"`
	UserID          uuid.UUID      `gorm:"type:uuid;not null;index" json:"user_id"`
	User            *User          `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Rating          int            `gorm:"not null;check:rating >= 1 AND rating <= 10" json:"rating" binding:"required,min=1,max=10"`
	Title           string         `gorm:"not null" json:"title" binding:"required"`
	Content_        string         `gorm:"type:text;column:content" json:"content"`
	HelpfulCount    int            `gorm:"default:0" json:"helpful_count"`
	UnhelpfulCount  int            `gorm:"default:0" json:"unhelpful_count"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Review) TableName() string {
	return "reviews"
}

func (r *Review) BeforeCreate(tx *gorm.DB) error {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	return nil
}
