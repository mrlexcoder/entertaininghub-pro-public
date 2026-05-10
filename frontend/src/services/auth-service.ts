// Auth Service - EntertainingHub Pro

import { api } from './api';
import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types';

export class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    
    if (response.success && response.data) {
      this.saveAuthData(response.data.token, response.data.user);
    }
    
    return response;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      this.saveAuthData(response.data.token, response.data.user);
    }
    
    return response;
  }

  async refreshToken(): Promise<AuthResponse> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.post<AuthResponse>('/auth/refresh', { refresh_token: token });
    
    if (response.success && response.data) {
      this.saveAuthData(response.data.token, response.data.user);
    }
    
    return response;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<{ success: boolean; data: User }>('/user/profile', true);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private saveAuthData(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export const authService = new AuthService();
