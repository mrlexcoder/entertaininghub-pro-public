// Content Service - EntertainingHub Pro

import { api } from './api';
import type { Content, PaginatedResponse, SearchFilters } from '../types';

export class ContentService {
  async getAll(page = 1, pageSize = 20, type?: string): Promise<PaginatedResponse<Content>> {
    let endpoint = `/content?page=${page}&page_size=${pageSize}`;
    if (type) {
      endpoint += `&type=${type}`;
    }
    return api.get<PaginatedResponse<Content>>(endpoint);
  }

  async getById(id: string): Promise<Content> {
    const response = await api.get<{ success: boolean; data: Content }>(`/content/${id}`);
    return response.data;
  }

  async getBySlug(slug: string): Promise<Content> {
    const response = await api.get<{ success: boolean; data: Content }>(`/content/slug/${slug}`);
    return response.data;
  }

  async search(query: string, page = 1, pageSize = 20): Promise<PaginatedResponse<Content>> {
    return api.get<PaginatedResponse<Content>>(`/content/search?q=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`);
  }

  async getTrending(limit = 10): Promise<Content[]> {
    const response = await api.get<{ success: boolean; data: Content[] }>(`/content/trending?limit=${limit}`);
    return response.data;
  }

  async getByCategory(type: string, page = 1, pageSize = 20): Promise<PaginatedResponse<Content>> {
    return this.getAll(page, pageSize, type);
  }
}

export const contentService = new ContentService();
