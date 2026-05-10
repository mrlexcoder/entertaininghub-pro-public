.PHONY: help dev build test clean migrate seed docker-up docker-down

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start all services in development mode
	@echo "Starting development environment..."
	docker-compose up -d postgres redis
	@echo "Waiting for databases to be ready..."
	sleep 5
	cd backend && make dev &
	cd frontend && npm run dev &
	cd admin-panel && npm run dev &

build: ## Build all services
	@echo "Building backend..."
	cd backend && make build
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Building admin panel..."
	cd admin-panel && npm run build

test: ## Run all tests
	@echo "Running backend tests..."
	cd backend && make test
	@echo "Running frontend tests..."
	cd frontend && npm run test
	@echo "Running admin panel tests..."
	cd admin-panel && npm run test

clean: ## Clean build artifacts
	@echo "Cleaning..."
	cd backend && make clean
	cd frontend && rm -rf dist node_modules
	cd admin-panel && rm -rf dist node_modules

migrate: ## Run database migrations
	cd backend && make migrate

seed: ## Seed database with sample data
	cd backend && make seed

docker-up: ## Start all services with Docker Compose
	docker-compose up -d

docker-down: ## Stop all Docker services
	docker-compose down

docker-build: ## Build Docker images
	docker-compose build

docker-logs: ## Show Docker logs
	docker-compose logs -f

install: ## Install all dependencies
	@echo "Installing backend dependencies..."
	cd backend && go mod download
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installing admin panel dependencies..."
	cd admin-panel && npm install

setup: install migrate seed ## Complete project setup
	@echo "Setup complete! Run 'make dev' to start development."
