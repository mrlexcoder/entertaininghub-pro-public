package handlers

import (
	"net/http"
	"strconv"

	"github.com/entertainzen/entertaininghub-pro/internal/models"
	"github.com/entertainzen/entertaininghub-pro/internal/services"
	"github.com/entertainzen/entertaininghub-pro/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ContentHandler struct {
	contentService *services.ContentService
}

func NewContentHandler(contentService *services.ContentService) *ContentHandler {
	return &ContentHandler{contentService: contentService}
}

func (h *ContentHandler) GetAll(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "20"))
	contentType := c.Query("type")

	contents, total, err := h.contentService.GetAll(page, pageSize, contentType)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.PaginatedSuccessResponse(c, contents, page, pageSize, total)
}

func (h *ContentHandler) GetByID(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid content ID")
		return
	}

	content, err := h.contentService.GetByID(id)
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Content not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Content retrieved successfully", content)
}

func (h *ContentHandler) GetBySlug(c *gin.Context) {
	slug := c.Param("slug")

	content, err := h.contentService.GetBySlug(slug)
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Content not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Content retrieved successfully", content)
}

func (h *ContentHandler) Search(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "Search query required")
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "20"))

	contents, total, err := h.contentService.Search(query, page, pageSize)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.PaginatedSuccessResponse(c, contents, page, pageSize, total)
}

func (h *ContentHandler) GetTrending(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	contents, err := h.contentService.GetTrending(limit)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Trending content retrieved successfully", contents)
}

func (h *ContentHandler) Create(c *gin.Context) {
	var content models.Content
	if err := c.ShouldBindJSON(&content); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.contentService.Create(&content); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Content created successfully", content)
}

func (h *ContentHandler) Update(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid content ID")
		return
	}

	var updates map[string]interface{}
	if err := c.ShouldBindJSON(&updates); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	content, err := h.contentService.Update(id, updates)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Content updated successfully", content)
}

func (h *ContentHandler) Delete(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid content ID")
		return
	}

	if err := h.contentService.Delete(id); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Content deleted successfully", nil)
}

func (h *ContentHandler) Publish(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid content ID")
		return
	}

	if err := h.contentService.Publish(id); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Content published successfully", nil)
}

func (h *ContentHandler) RecordView(c *gin.Context) {
	utils.SuccessResponse(c, http.StatusOK, "View recorded", nil)
}

func (h *ContentHandler) CreateReview(c *gin.Context) {
	utils.SuccessResponse(c, http.StatusCreated, "Review created", nil)
}

func (h *ContentHandler) GetWatchlist(c *gin.Context) {
	utils.SuccessResponse(c, http.StatusOK, "Watchlist retrieved", []interface{}{})
}

func (h *ContentHandler) AddToWatchlist(c *gin.Context) {
	utils.SuccessResponse(c, http.StatusOK, "Added to watchlist", nil)
}

func (h *ContentHandler) RemoveFromWatchlist(c *gin.Context) {
	utils.SuccessResponse(c, http.StatusOK, "Removed from watchlist", nil)
}
