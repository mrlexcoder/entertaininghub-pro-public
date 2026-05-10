package services

import (
	"github.com/entertainzen/entertaininghub-pro/internal/models"
	"github.com/entertainzen/entertaininghub-pro/internal/repositories"
	"github.com/entertainzen/entertaininghub-pro/internal/utils"
	"github.com/google/uuid"
)

type ContentService struct {
	contentRepo *repositories.ContentRepository
}

func NewContentService(contentRepo *repositories.ContentRepository) *ContentService {
	return &ContentService{contentRepo: contentRepo}
}

func (s *ContentService) GetAll(page, pageSize int, contentType string) ([]models.Content, int64, error) {
	return s.contentRepo.GetAll(page, pageSize, contentType)
}

func (s *ContentService) GetByID(id uuid.UUID) (*models.Content, error) {
	return s.contentRepo.GetByID(id)
}

func (s *ContentService) GetBySlug(slug string) (*models.Content, error) {
	return s.contentRepo.GetBySlug(slug)
}

func (s *ContentService) Search(query string, page, pageSize int) ([]models.Content, int64, error) {
	return s.contentRepo.Search(query, page, pageSize)
}

func (s *ContentService) GetTrending(limit int) ([]models.Content, error) {
	return s.contentRepo.GetTrending(limit)
}

func (s *ContentService) Create(content *models.Content) error {
	// Generate slug from title
	content.Slug = utils.GenerateSlug(content.Title)
	return s.contentRepo.Create(content)
}

func (s *ContentService) Update(id uuid.UUID, updates map[string]interface{}) (*models.Content, error) {
	return s.contentRepo.Update(id, updates)
}

func (s *ContentService) Delete(id uuid.UUID) error {
	return s.contentRepo.Delete(id)
}

func (s *ContentService) Publish(id uuid.UUID) error {
	return s.contentRepo.Publish(id)
}
