const API_BASE_URL = 'https://urbandrop.onrender.com';
const ADMIN_API_KEY = 'rABlFijaoTrjhuy7t56t7yusRAOssJfejSinG';

export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  position: number;
  linkUrl?: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerRequest {
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  position: number;
  linkUrl?: string;
  startDate: string;
  endDate?: string;
}

export interface UpdateBannerRequest {
  title?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  position?: number;
  linkUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

class BannerService {
  private getHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': ADMIN_API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  async getBanners(token: string): Promise<Banner[]> {
    const response = await fetch(`${API_BASE_URL}/banners/`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch banners' }));
      throw new Error(error.message || 'Failed to fetch banners');
    }

    const result: ApiResponse<Banner[]> = await response.json();
    return result.data;
  }

  async getBannerById(bannerId: string, token: string): Promise<Banner> {
    const response = await fetch(`${API_BASE_URL}/banners/${bannerId}`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch banner' }));
      throw new Error(error.message || 'Failed to fetch banner');
    }

    const result: ApiResponse<Banner> = await response.json();
    return result.data;
  }

  async createBanner(data: CreateBannerRequest, token: string): Promise<Banner> {
    const payload = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/banners/`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create banner' }));
      throw new Error(error.message || 'Failed to create banner');
    }

    const result: ApiResponse<Banner> = await response.json();
    return result.data;
  }

  async updateBanner(bannerId: string, data: UpdateBannerRequest, token: string): Promise<Banner> {
    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/banners/${bannerId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update banner' }));
      throw new Error(error.message || 'Failed to update banner');
    }

    const result: ApiResponse<Banner> = await response.json();
    return result.data;
  }

  async deleteBanner(bannerId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/banners/${bannerId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete banner' }));
      throw new Error(error.message || 'Failed to delete banner');
    }
  }
}

export const bannerService = new BannerService();