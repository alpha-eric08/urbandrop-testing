const API_BASE_URL = 'https://urbandrop.onrender.com';
const ADMIN_API_KEY = 'rABlFijaoTrjhuy7t56t7yusRAOssJfejSinG';

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSubcategory {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  storageInstructions: string;
  allergyInfo: string;
  nutritionalBenefits: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface CreateSubcategoryRequest {
  categoryId: string;
  name: string;
  description: string;
  storageInstructions: string;
  allergyInfo: string;
  nutritionalBenefits: string;
  imageUrl: string;
  isActive: boolean;
}

export interface UpdateSubcategoryRequest {
  name?: string;
  description?: string;
  storageInstructions?: string;
  allergyInfo?: string;
  nutritionalBenefits?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

class CategoryService {
  private getHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': ADMIN_API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  // Transform frontend camelCase to API snake_case for categories
  private transformCategoryToAPI(data: CreateCategoryRequest | UpdateCategoryRequest): any {
    return {
      category_name: data.name,
      category_description: data.description,
      image_url: data.imageUrl,
      active: data.isActive,
    };
  }

  // Transform API snake_case to frontend camelCase for categories
  private transformCategoryFromAPI(data: any): ProductCategory {
    return {
      id: data.category_id || data.id,
      name: data.category_name || data.name,
      description: data.category_description || data.description,
      imageUrl: data.image_url || data.imageUrl,
      isActive: data.active !== undefined ? data.active : data.isActive,
      createdAt: data.created_at || data.createdAt || '',
      updatedAt: data.updated_at || data.updatedAt || '',
    };
  }

  // Transform frontend camelCase to API snake_case for subcategories
  private transformSubcategoryToAPI(data: CreateSubcategoryRequest | UpdateSubcategoryRequest): any {
    return {
      parent_category_id: (data as CreateSubcategoryRequest).categoryId,
      subcategory_name: data.name,
      subcategory_description: data.description,
      storage_instructions: data.storageInstructions,
      allergy_information: data.allergyInfo,
      nutritional_benefits: data.nutritionalBenefits,
      subcategory_image: data.imageUrl,
      image_url: data.imageUrl,
      active: data.isActive,
    };
  }

  // Transform API snake_case to frontend camelCase for subcategories
  private transformSubcategoryFromAPI(data: any): ProductSubcategory {
    return {
      id: data.subcategory_id || data.id,
      categoryId: data.parent_category_id || data.categoryId,
      name: data.subcategory_name || data.name,
      description: data.subcategory_description || data.description,
      storageInstructions: data.storage_instructions || data.storageInstructions || '',
      allergyInfo: data.allergy_information || data.allergyInfo || '',
      nutritionalBenefits: data.nutritional_benefits || data.nutritionalBenefits || '',
      imageUrl: data.subcategory_image || data.image_url || data.imageUrl || '',
      isActive: data.active !== undefined ? data.active : data.isActive,
      createdAt: data.created_at || data.createdAt || '',
      updatedAt: data.updated_at || data.updatedAt || '',
    };
  }

  // Category methods
  async getCategories(token: string): Promise<ProductCategory[]> {
    const response = await fetch(`${API_BASE_URL}/product/categories`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch categories' }));
      throw new Error(error.message || 'Failed to fetch categories');
    }

    const result: ApiResponse<any[]> = await response.json();
    return Array.isArray(result.data) ? result.data.map(cat => this.transformCategoryFromAPI(cat)) : [];
  }

  async getCategoryById(categoryId: string, token: string): Promise<ProductCategory> {
    const response = await fetch(`${API_BASE_URL}/product/categories/${categoryId}`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch category' }));
      throw new Error(error.message || 'Failed to fetch category');
    }

    const result: ApiResponse<any> = await response.json();
    return this.transformCategoryFromAPI(result.data);
  }

  async createCategory(data: CreateCategoryRequest, token: string): Promise<ProductCategory> {
    const apiData = this.transformCategoryToAPI(data);
    const response = await fetch(`${API_BASE_URL}/product/categories`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create category' }));
      throw new Error(error.message || 'Failed to create category');
    }

    const result: ApiResponse<any> = await response.json();
    return this.transformCategoryFromAPI(result.data);
  }

  async updateCategory(categoryId: string, data: UpdateCategoryRequest, token: string): Promise<ProductCategory> {
    const apiData = this.transformCategoryToAPI(data);
    const response = await fetch(`${API_BASE_URL}/product/categories/${categoryId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update category' }));
      throw new Error(error.message || 'Failed to update category');
    }

    const result: ApiResponse<any> = await response.json();
    return this.transformCategoryFromAPI(result.data);
  }

  async deleteCategory(categoryId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/product/categories/${categoryId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete category' }));
      throw new Error(error.message || 'Failed to delete category');
    }
  }

  // Subcategory methods
  async getAllSubcategories(token: string): Promise<ProductSubcategory[]> {
    const response = await fetch(`${API_BASE_URL}/product/subcategories`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch subcategories' }));
      throw new Error(error.message || 'Failed to fetch subcategories');
    }

    const result: ApiResponse<any[]> = await response.json();
    return Array.isArray(result.data) ? result.data.map(sub => this.transformSubcategoryFromAPI(sub)) : [];
  }

  async getSubcategoriesByCategory(categoryId: string, token: string): Promise<ProductSubcategory[]> {
    const response = await fetch(`${API_BASE_URL}/product/categories/${categoryId}/subcategories`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch subcategories' }));
      throw new Error(error.message || 'Failed to fetch subcategories');
    }

    const result: ApiResponse<any[]> = await response.json();
    return Array.isArray(result.data) ? result.data.map(sub => this.transformSubcategoryFromAPI(sub)) : [];
  }

  async createSubcategory(data: CreateSubcategoryRequest, token: string): Promise<ProductSubcategory> {
    const apiData = this.transformSubcategoryToAPI(data);
    const response = await fetch(`${API_BASE_URL}/product/subcategories`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create subcategory' }));
      throw new Error(error.message || 'Failed to create subcategory');
    }

    const result: ApiResponse<any> = await response.json();
    return this.transformSubcategoryFromAPI(result.data);
  }

  async updateSubcategory(subcategoryId: string, data: UpdateSubcategoryRequest, token: string): Promise<ProductSubcategory> {
    const apiData = this.transformSubcategoryToAPI(data);
    const response = await fetch(`${API_BASE_URL}/product/subcategories/${subcategoryId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update subcategory' }));
      throw new Error(error.message || 'Failed to update subcategory');
    }

    const result: ApiResponse<any> = await response.json();
    return this.transformSubcategoryFromAPI(result.data);
  }

  async deleteSubcategory(subcategoryId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/product/subcategories/${subcategoryId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete subcategory' }));
      throw new Error(error.message || 'Failed to delete subcategory');
    }
  }
}

export const categoryService = new CategoryService();