package repositories

import (
	"github.com/entertainzen/entertaininghub-pro/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ContentRepository struct {
	db *gorm.DB
}

func NewContentRepository(db *gorm.DB) *ContentRepository {
	return &ContentRepository{db: db}
}

func (r *ContentRepository) Create(content *models.Content) error {
	return r.db.Create(content).Error
}

func (r *ContentRepository) GetByID(id uuid.UUID) (*models.Content, error) {
	var content models.Content
	err := r.db.Preload("Episodes").Preload("Reviews").Where("id = ?", id).First(&content).Error
	return &content, err
}

func (r *ContentRepository) GetBySlug(slug string) (*models.Content, error) {
	var content models.Content
	err := r.db.Preload("Episodes").Preload("Reviews").Where("slug = ?", slug).First(&content).Error
	return &content, err
}

func (r *ContentRepository) GetAll(page, pageSize int, contentType string) ([]models.Content, int64, error) {
	var contents []models.Content
	var total int64

	offset := (page - 1) * pageSize
	query := r.db.Model(&models.Content{}).Where("is_published = ?", true)

	if contentType != "" {
		query = query.Where("content_type = ?", contentType)
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	err := query.Offset(offset).Limit(pageSize).Order("created_at DESC").Find(&contents).Error
	return contents, total, err
}

func (r *ContentRepository) Search(query string, page, pageSize int) ([]models.Content, int64, error) {
	var contents []models.Content
	var total int64

	offset := (page - 1) * pageSize
	searchQuery := r.db.Model(&models.Content{}).
		Where("is_published = ?", true).
		Where("title ILIKE ? OR description ILIKE ?", "%"+query+"%", "%"+query+"%")

	if err := searchQuery.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	err := searchQuery.Offset(offset).Limit(pageSize).Order("views_count DESC").Find(&contents).Error
	return contents, total, err
}

func (r *ContentRepository) GetTrending(limit int) ([]models.Content, error) {
	var contents []models.Content
	err := r.db.Where("is_published = ?", true).
		Order("views_count DESC").
		Limit(limit).
		Find(&contents).Error
	return contents, err
}

func (r *ContentRepository) Update(id uuid.UUID, updates map[string]interface{}) (*models.Content, error) {
	var content models.Content
	if err := r.db.Model(&content).Where("id = ?", id).Updates(updates).Error; err != nil {
		return nil, err
	}
	return r.GetByID(id)
}

func (r *ContentRepository) Delete(id uuid.UUID) error {
	return r.db.Where("id = ?", id).Delete(&models.Content{}).Error
}

func (r *ContentRepository) Publish(id uuid.UUID) error {
	return r.db.Model(&models.Content{}).Where("id = ?", id).Update("is_published", true).Error
}
