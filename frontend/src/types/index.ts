// Type Definitions - EntertainingHub Pro

export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  bio?: string;
  is_premium: boolean;
  is_creator: boolean;
  is_admin: boolean;
  subscription_tier: 'free' | 'premium' | 'creator';
  created_at: string;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  description: string;
  content_type: 'movie' | 'series' | 'documentary' | 'anime' | 'gaming' | '18plus';
  genre: string[];
  language: string[];
  release_year: number;
  duration_minutes?: number;
  poster_url: string;
  banner_url?: string;
  trailer_url?: string;
  maturity_rating: 'U' | 'UA' | 'A' | '18+';
  imdb_rating?: number;
  imdb_id?: string;
  director?: string[];
  cast?: string[];
  studio?: string;
  synopsis?: string;
  views_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: string;
  content_id: string;
  season_number: number;
  episode_number: number;
  title: string;
  description?: string;
  duration_minutes: number;
  release_date?: string;
  video_url: string;
  thumbnail_url?: string;
  is_published: boolean;
}

export interface Review {
  id: string;
  content_id: string;
  user_id: string;
  user?: User;
  rating: number;
  title: string;
  content: string;
  helpful_count: number;
  unhelpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface Watchlist {
  id: string;
  user_id: string;
  content_id: string;
  content?: Content;
  position: number;
  added_at: string;
  watched_at?: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  content_id: string;
  content?: Content;
  recommendation_type: 'personalized' | 'trending' | 'similar' | 'category';
  score: number;
  reason?: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total_pages: number;
    total_items: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface SearchFilters {
  query?: string;
  type?: string;
  genre?: string[];
  language?: string[];
  year?: number;
  rating?: number;
  sort?: 'latest' | 'popular' | 'rating' | 'title';
}
