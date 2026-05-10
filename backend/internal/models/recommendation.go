package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RecommendationType string

const (
	RecommendationPersonalized RecommendationType = "personalized"
	RecommendationTrending     RecommendationType = "trending"
	RecommendationSimilar      RecommendationType = "similar"
	RecommendationCategory     RecommendationType = "category"
)

type Recommendation struct {
	ID                 uuid.UUID          `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID             uuid.UUID          `gorm:"type:uuid;not null;index" json:"user_id"`
	User               *User              `gorm:"foreignKey:UserID" json:"user,omitempty"`
	ContentID          uuid.UUID          `gorm:"type:uuid;not null;index" json:"content_id"`
	Content            *Content           `gorm:"foreignKey:ContentID" json:"content,omitempty"`
	RecommendationType RecommendationType `gorm:"type:varchar(20);not null" json:"recommendation_type"`
	Score              float64            `gorm:"not null" json:"score"`
	Reason             string             `json:"reason"`
	Clicked            bool               `gorm:"default:false" json:"clicked"`
	Watched            bool               `gorm:"default:false" json:"watched"`
	CreatedAt          time.Time          `json:"created_at"`
	ExpiresAt          time.Time          `gorm:"index" json:"expires_at"`
}

func (Recommendation) TableName() string {
	return "recommendations"
}

func (r *Recommendation) BeforeCreate(tx *gorm.DB) error {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	if r.ExpiresAt.IsZero() {
		r.ExpiresAt = time.Now().Add(7 * 24 * time.Hour) // 7 days
	}
	return nil
}
