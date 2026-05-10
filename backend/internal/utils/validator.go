package utils

import (
	"regexp"
	"strings"
)

var (
	emailRegex    = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	usernameRegex = regexp.MustCompile(`^[a-zA-Z0-9_-]{3,50}$`)
)

// ValidateEmail validates an email address
func ValidateEmail(email string) bool {
	return emailRegex.MatchString(email)
}

// ValidateUsername validates a username
func ValidateUsername(username string) bool {
	return usernameRegex.MatchString(username)
}

// ValidatePassword validates a password (min 8 chars, at least one letter and one number)
func ValidatePassword(password string) bool {
	if len(password) < 8 {
		return false
	}
	hasLetter := regexp.MustCompile(`[a-zA-Z]`).MatchString(password)
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
	return hasLetter && hasNumber
}

// SanitizeString removes leading/trailing whitespace and converts to lowercase
func SanitizeString(s string) string {
	return strings.TrimSpace(strings.ToLower(s))
}
