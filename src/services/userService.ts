const API_BASE_URL = 'https://urbandrop.onrender.com';
const ADMIN_API_KEY = 'rABlFijaoTrjhuy7t56t7yusRAOssJfejSinG';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role_id: string;
  is_active: number;
  created_at: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  full_name: string;
  role_id: string;
  is_active: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  full_name?: string;
  role_id?: string;
  is_active?: boolean;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

class UserService {
  private getHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': ADMIN_API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  async getUsers(token: string): Promise<User[]> {
    console.log('Fetching users with token:', token);
    console.log('URL:', `${API_BASE_URL}/admin/`);
    
    const response = await fetch(`${API_BASE_URL}/admin/`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch users' }));
      console.error('Error fetching users:', error);
      throw new Error(error.message || 'Failed to fetch users');
    }

    const result: ApiResponse<User[]> = await response.json();
    console.log('Users API response:', result);
    return result.data;
  }

  async getUserById(userId: string, token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/admin/${userId}`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch user' }));
      throw new Error(error.message || 'Failed to fetch user');
    }

    const result: ApiResponse<User> = await response.json();
    return result.data;
  }

  async createUser(data: CreateUserRequest, token: string): Promise<User> {
    const payload = {
      id: crypto.randomUUID(),
      email: data.email,
      password: data.password,
      full_name: data.full_name,
      role_id: data.role_id,
      is_active: data.is_active,
    };

    const response = await fetch(`${API_BASE_URL}/admin/`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create user' }));
      throw new Error(error.message || 'Failed to create user');
    }

    const result: ApiResponse<User> = await response.json();
    return result.data;
  }

  async updateUser(userId: string, data: UpdateUserRequest, token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/admin/${userId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update user' }));
      throw new Error(error.message || 'Failed to update user');
    }

    const result: ApiResponse<User> = await response.json();
    return result.data;
  }

  async deleteUser(userId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/${userId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete user' }));
      throw new Error(error.message || 'Failed to delete user');
    }
  }
}

export const userService = new UserService();