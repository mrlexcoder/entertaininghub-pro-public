package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type SubscriptionTier string

const (
	TierFree    SubscriptionTier = "free"
	TierPremium SubscriptionTier = "premium"
	TierCreator SubscriptionTier = "creator"
)

type User struct {
	ID                   uuid.UUID        `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Username             string           `gorm:"uniqueIndex;not null" json:"username" binding:"required,min=3,max=50"`
	Email                string           `gorm:"uniqueIndex;not null" json:"email" binding:"required,email"`
	PasswordHash         string           `gorm:"not null" json:"-"`
	FirstName            string           `json:"first_name"`
	LastName             string           `json:"last_name"`
	AvatarURL            string           `json:"avatar_url"`
	Bio                  string           `gorm:"type:text" json:"bio"`
	IsPremium            bool             `gorm:"default:false" json:"is_premium"`
	IsCreator            bool             `gorm:"default:false" json:"is_creator"`
	IsAdmin              bool             `gorm:"default:false" json:"is_admin"`
	SubscriptionTier     SubscriptionTier `gorm:"type:varchar(20);default:'free'" json:"subscription_tier"`
	SubscriptionExpiresAt *time.Time      `json:"subscription_expires_at"`
	PreferredLanguage    string           `gorm:"default:'en'" json:"preferred_language"`
	ContentPreferences   ContentPreferences `gorm:"type:jsonb" json:"content_preferences"`
	EmailVerified        bool             `gorm:"default:false" json:"email_verified"`
	EmailVerifiedAt      *time.Time       `json:"email_verified_at"`
	LastLogin            *time.Time       `json:"last_login"`
	CreatedAt            time.Time        `json:"created_at"`
	UpdatedAt            time.Time        `json:"updated_at"`
	DeletedAt            gorm.DeletedAt   `gorm:"index" json:"-"`
}

type ContentPreferences struct {
	Genres         []string `json:"genres"`
	MaturityRating []string `json:"maturity_rating"`
	Languages      []string `json:"languages"`
}

// TableName specifies the table name for User model
func (User) TableName() string {
	return "users"
}

// BeforeCreate hook to generate UUID
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

// PublicUser returns user data safe for public display
type PublicUser struct {
	ID               uuid.UUID        `json:"id"`
	Username         string           `json:"username"`
	FirstName        string           `json:"first_name"`
	LastName         string           `json:"last_name"`
	AvatarURL        string           `json:"avatar_url"`
	Bio              string           `json:"bio"`
	IsPremium        bool             `json:"is_premium"`
	IsCreator        bool             `json:"is_creator"`
	SubscriptionTier SubscriptionTier `json:"subscription_tier"`
	CreatedAt        time.Time        `json:"created_at"`
}

// ToPublic converts User to PublicUser
func (u *User) ToPublic() PublicUser {
	return PublicUser{
		ID:               u.ID,
		Username:         u.Username,
		FirstName:        u.FirstName,
		LastName:         u.LastName,
		AvatarURL:        u.AvatarURL,
		Bio:              u.Bio,
		IsPremium:        u.IsPremium,
		IsCreator:        u.IsCreator,
		SubscriptionTier: u.SubscriptionTier,
		CreatedAt:        u.CreatedAt,
	}
}
