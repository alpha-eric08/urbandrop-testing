const API_BASE_URL = 'https://urbandrop.onrender.com';
const ADMIN_API_KEY = 'rABlFijaoTrjhuy7t56t7yusRAOssJfejSinG';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    role_id: string;
    role_name: string;
    is_active: number;
    created_at: string;
    can_manage_admins: number;
    can_manage_customers: number;
    can_manage_merchants: number;
    can_manage_products: number;
    can_manage_orders: number;
    can_manage_riders: number;
    can_manage_transactions: number;
    can_manage_promotions: number;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  new_password: string;
}

class AuthService {
  private getHeaders(includeAuth = false, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': ADMIN_API_KEY,
    };

    if (includeAuth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }

    const result = await response.json();
    console.log('Login API response:', result);
    
    // Extract the nested data structure
    return {
      token: result.data.token,
      refresh_token: result.data.refresh_token,
      user: {
        id: result.data.id,
        full_name: result.data.full_name,
        email: result.data.email,
        role_id: result.data.role_id,
        role_name: result.data.role_name || '',
        is_active: result.data.is_active || 0,
        created_at: result.data.created_at || '',
        can_manage_admins: result.data.can_manage_admins || 0,
        can_manage_customers: result.data.can_manage_customers || 0,
        can_manage_merchants: result.data.can_manage_merchants || 0,
        can_manage_products: result.data.can_manage_products || 0,
        can_manage_orders: result.data.can_manage_orders || 0,
        can_manage_riders: result.data.can_manage_riders || 0,
        can_manage_transactions: result.data.can_manage_transactions || 0,
        can_manage_promotions: result.data.can_manage_promotions || 0
      }
    };
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Failed to send reset email');
    }

    return response.json();
  }

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Reset failed' }));
      throw new Error(error.message || 'Password reset failed');
    }

    return response.json();
  }

  async logout(token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(true, token),
    });

    if (!response.ok) {
      console.warn('Logout request failed, but continuing with local logout');
    }
  }
}

export const authService = new AuthService();