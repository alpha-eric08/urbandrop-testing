const API_BASE_URL = 'https://urbandrop.onrender.com';
const ADMIN_API_KEY = 'rABlFijaoTrjhuy7t56t7yusRAOssJfejSinG';

export interface CustomerAddress {
  id: string;
  customer_id: string;
  address: string;
  address_line_2?: string;
  city: string;
  post_code: string;
  country: string;
  state: string;
  is_default: number;
  is_active: number;
  latitude?: string;
  longitude?: string;
  created_at: string;
  address_type: 'delivery' | 'billing';
}

export interface CustomerNotifications {
  orders: boolean;
  offers: boolean;
  new_menu: boolean;
  recommendations: boolean;
}

export interface CustomerNotificationChannels {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface ApiCustomer {
  id: string;
  email: string;
  email_verified: number;
  mcc?: string;
  mobile_number?: string;
  mobile_number_verified: number;
  is_social_login: number;
  status: string;
  active: number;
  mfa_active: number;
  notifications: CustomerNotifications;
  created_at: string;
  notification_channels: CustomerNotificationChannels;
  full_name?: string;
  gcid?: string;
  stripe_id?: string;
  address?: CustomerAddress;
}

export interface CreateCustomerRequest {
  id: string;
  gc_id: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  mcc: string;
  mobile_number: string;
  mobile_number_verified: boolean;
  image_url: string;
  active: boolean;
  mfa_active: boolean;
  notification_channels: CustomerNotificationChannels;
  notifications: CustomerNotifications;
  address: {
    id: string;
    customer_id: string;
    is_active: boolean;
    is_default: boolean;
    address: string;
    address_line_2: string;
    city: string;
    post_code: string;
    country: string;
    state: string;
    latitude: string;
    longitude: string;
    address_type: 'delivery' | 'billing';
  };
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
  pagination?: {
    perPage: number;
    currentPage: number;
    from: number;
    to: number;
    total: number;
    lastPage: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

class CustomerService {
  private getHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': ADMIN_API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  async getCustomers(token: string): Promise<ApiCustomer[]> {
    console.log('Fetching customers with token:', token);
    console.log('URL:', `${API_BASE_URL}/customer/list`);
    
    const response = await fetch(`${API_BASE_URL}/customer/list`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch customers' }));
      console.error('Error fetching customers:', error);
      throw new Error(error.message || 'Failed to fetch customers');
    }

    const result: ApiResponse<ApiCustomer[]> = await response.json();
    console.log('Customers API response:', result);
    return result.data;
  }

  async createCustomer(data: CreateCustomerRequest, token: string): Promise<ApiCustomer> {
    const response = await fetch(`${API_BASE_URL}/customer`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create customer' }));
      throw new Error(error.message || 'Failed to create customer');
    }

    const result: ApiResponse<ApiCustomer> = await response.json();
    return result.data;
  }
}

export const customerService = new CustomerService();