package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type ContentType string

const (
	ContentTypeMovie       ContentType = "movie"
	ContentTypeSeries      ContentType = "series"
	ContentTypeDocumentary ContentType = "documentary"
	ContentTypeAnime       ContentType = "anime"
	ContentTypeGaming      ContentType = "gaming"
	ContentType18Plus      ContentType = "18plus"
)

type MaturityRating string

const (
	RatingU    MaturityRating = "U"
	RatingUA   MaturityRating = "UA"
	RatingA    MaturityRating = "A"
	Rating18Plus MaturityRating = "18+"
)

type Content struct {
	ID              uuid.UUID       `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Title           string          `gorm:"not null;index" json:"title" binding:"required"`
	Slug            string          `gorm:"uniqueIndex;not null" json:"slug"`
	Description     string          `gorm:"type:text" json:"description"`
	ContentType     ContentType     `gorm:"type:varchar(20);not null;index" json:"content_type" binding:"required"`
	Genre           pq.StringArray  `gorm:"type:text[]" json:"genre"`
	Language        pq.StringArray  `gorm:"type:text[]" json:"language"`
	ReleaseYear     int             `json:"release_year"`
	DurationMinutes int             `json:"duration_minutes"`
	PosterURL       string          `json:"poster_url"`
	BannerURL       string          `json:"banner_url"`
	TrailerURL      string          `json:"trailer_url"`
	MaturityRating  MaturityRating  `gorm:"type:varchar(10)" json:"maturity_rating"`
	IMDBRating      float64         `json:"imdb_rating"`
	IMDBID          string          `gorm:"index" json:"imdb_id"`
	TMDBID          string          `json:"tmdb_id"`
	Director        pq.StringArray  `gorm:"type:text[]" json:"director"`
	Cast            pq.StringArray  `gorm:"type:text[]" json:"cast"`
	Producer        pq.StringArray  `gorm:"type:text[]" json:"producer"`
	Studio          string          `json:"studio"`
	Synopsis        string          `gorm:"type:text" json:"synopsis"`
	ViewsCount      int64           `gorm:"default:0" json:"views_count"`
	IsPublished     bool            `gorm:"default:false;index" json:"is_published"`
	CreatedByID     uuid.UUID       `gorm:"type:uuid" json:"created_by_id"`
	CreatedBy       *User           `gorm:"foreignKey:CreatedByID" json:"created_by,omitempty"`
	Episodes        []Episode       `gorm:"foreignKey:ContentID" json:"episodes,omitempty"`
	Reviews         []Review        `gorm:"foreignKey:ContentID" json:"reviews,omitempty"`
	CreatedAt       time.Time       `json:"created_at"`
	UpdatedAt       time.Time       `json:"updated_at"`
	DeletedAt       gorm.DeletedAt  `gorm:"index" json:"-"`
}

func (Content) TableName() string {
	return "content"
}

func (c *Content) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}

// ContentSummary is a lightweight version for listings
type ContentSummary struct {
	ID             uuid.UUID      `json:"id"`
	Title          string         `json:"title"`
	Slug           string         `json:"slug"`
	ContentType    ContentType    `json:"content_type"`
	Genre          []string       `json:"genre"`
	ReleaseYear    int            `json:"release_year"`
	PosterURL      string         `json:"poster_url"`
	MaturityRating MaturityRating `json:"maturity_rating"`
	IMDBRating     float64        `json:"imdb_rating"`
	ViewsCount     int64          `json:"views_count"`
}

func (c *Content) ToSummary() ContentSummary {
	return ContentSummary{
		ID:             c.ID,
		Title:          c.Title,
		Slug:           c.Slug,
		ContentType:    c.ContentType,
		Genre:          c.Genre,
		ReleaseYear:    c.ReleaseYear,
		PosterURL:      c.PosterURL,
		MaturityRating: c.MaturityRating,
		IMDBRating:     c.IMDBRating,
		ViewsCount:     c.ViewsCount,
	}
}
