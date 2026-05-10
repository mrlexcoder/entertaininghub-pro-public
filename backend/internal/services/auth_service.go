package services

import (
	"errors"

	"github.com/entertainzen/entertaininghub-pro/internal/config"
	"github.com/entertainzen/entertaininghub-pro/internal/models"
	"github.com/entertainzen/entertaininghub-pro/internal/repositories"
	"github.com/entertainzen/entertaininghub-pro/internal/utils"
	"github.com/google/uuid"
)

type AuthService struct {
	userRepo *repositories.UserRepository
	config   *config.Config
}

func NewAuthService(userRepo *repositories.UserRepository, config *config.Config) *AuthService {
	return &AuthService{
		userRepo: userRepo,
		config:   config,
	}
}

func (s *AuthService) Register(username, email, password string) (*models.User, string, error) {
	// Validate input
	if !utils.ValidateEmail(email) {
		return nil, "", errors.New("invalid email format")
	}
	if !utils.ValidateUsername(username) {
		return nil, "", errors.New("invalid username format")
	}
	if !utils.ValidatePassword(password) {
		return nil, "", errors.New("password must be at least 8 characters with letters and numbers")
	}

	// Check if user already exists
	if _, err := s.userRepo.GetByEmail(email); err == nil {
		return nil, "", errors.New("email already registered")
	}
	if _, err := s.userRepo.GetByUsername(username); err == nil {
		return nil, "", errors.New("username already taken")
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return nil, "", err
	}

	// Create user
	user := &models.User{
		Username:         username,
		Email:            email,
		PasswordHash:     hashedPassword,
		SubscriptionTier: models.TierFree,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, "", err
	}

	// Generate token
	token, err := utils.GenerateToken(user.ID, user.Email, user.Username, user.IsAdmin, s.config.JWTSecret, s.config.JWTExpiry)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *AuthService) Login(email, password string) (*models.User, string, error) {
	user, err := s.userRepo.GetByEmail(email)
	if err != nil {
		return nil, "", errors.New("invalid credentials")
	}

	// Check password
	if err := utils.CheckPassword(user.PasswordHash, password); err != nil {
		return nil, "", errors.New("invalid credentials")
	}

	// Generate token
	token, err := utils.GenerateToken(user.ID, user.Email, user.Username, user.IsAdmin, s.config.JWTSecret, s.config.JWTExpiry)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *AuthService) RefreshToken(oldToken string) (string, error) {
	return utils.RefreshToken(oldToken, s.config.JWTSecret, s.config.JWTExpiry)
}

func (s *AuthService) GetUserByID(id uuid.UUID) (*models.User, error) {
	return s.userRepo.GetByID(id)
}

func (s *AuthService) UpdateProfile(id uuid.UUID, updates map[string]interface{}) (*models.User, error) {
	return s.userRepo.Update(id, updates)
}
