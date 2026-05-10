.PHONY: help dev build test clean migrate migrate-down seed run

help:
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@echo '  dev          Start development server with hot reload'
	@echo '  build        Build the application'
	@echo '  test         Run tests'
	@echo '  clean        Clean build artifacts'
	@echo '  migrate      Run database migrations'
	@echo '  migrate-down Rollback last migration'
	@echo '  seed         Seed database with sample data'
	@echo '  run          Run the application'

dev:
	@echo "Starting development server..."
	go run cmd/api/main.go

build:
	@echo "Building application..."
	go build -o bin/entertainzen cmd/api/main.go

test:
	@echo "Running tests..."
	go test -v -cover ./...

clean:
	@echo "Cleaning..."
	rm -rf bin/
	go clean

migrate:
	@echo "Running migrations..."
	go run cmd/api/main.go migrate

migrate-down:
	@echo "Rolling back migrations..."
	go run cmd/api/main.go migrate-down

seed:
	@echo "Seeding database..."
	go run cmd/api/main.go seed

run: build
	@echo "Running application..."
	./bin/entertainzen

install:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

lint:
	@echo "Running linter..."
	golangci-lint run

format:
	@echo "Formatting code..."
	go fmt ./...
	goimports -w .
