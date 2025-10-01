const API_BASE_URL = 'https://urbandrop-testing.onrender.com';
const ADMIN_API_KEY = 'rABlFijaoTrjhuy7t56t7yusRAOssJfejSinG';

export interface RecipeResponse {
  id: string;
  food_name: string;
  country: string;
  image_url?: string;
  ingredients: Array<{
    id: number | string;
    name: string;
    quantity: number | string;
    unit: string;
  }> | string[];
  preparation_steps: Array<{
    id: number | string;
    stepNumber: number | string;
    instruction: string;
  }> | string;
  instagram_link?: string;
  youTube_link?: string;
  tikTok_link?: string;
  created_at: string;
  estimated_time?: string;
  status?: string;
  facebook_link?: string;
}

export interface CreateRecipeRequest {
  country: string;
  food_name: string;
  ingredients: Array<{
    id: number;
    name: string;
    quantity: number | string;
    unit: string;
  }>;
  preparation_steps: Array<{
    id: number;
    stepNumber: number;
    instruction: string;
  }>;
  instagram_link?: string;
  youTube_link?: string;
  tikTok_link?: string;
  image_url?: string;
  estimated_time?: string;
  status?: string;
}

export interface UpdateRecipeRequest {
  country?: string;
  food_name?: string;
  ingredients?: Array<{
    id: number;
    name: string;
    quantity: number | string;
    unit: string;
  }>;
  preparation_steps?: Array<{
    id: number;
    stepNumber: number;
    instruction: string;
  }>;
  instagram_link?: string;
  youTube_link?: string;
  tikTok_link?: string;
  image_url?: string;
  estimated_time?: string;
  status?: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

class RecipeService {
  private getHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': ADMIN_API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  async getRecipes(token: string): Promise<RecipeResponse[]> {
    console.log('Fetching recipes with token:', token);
    console.log('URL:', `${API_BASE_URL}/recipe`);
    
    const response = await fetch(`${API_BASE_URL}/recipe`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch recipes' }));
      console.error('Error fetching recipes:', error);
      throw new Error(error.message || 'Failed to fetch recipes');
    }

    const result: ApiResponse<RecipeResponse[]> = await response.json();
    console.log('Recipes API response:', result);
    return result.data;
  }

  async getRecipeById(recipeId: string, token: string): Promise<RecipeResponse> {
    const response = await fetch(`${API_BASE_URL}/recipe/${recipeId}`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch recipe' }));
      throw new Error(error.message || 'Failed to fetch recipe');
    }

    const result: ApiResponse<RecipeResponse> = await response.json();
    return result.data;
  }

  async createRecipe(data: CreateRecipeRequest, token: string): Promise<RecipeResponse> {
    const response = await fetch(`${API_BASE_URL}/recipe`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create recipe' }));
      throw new Error(error.message || 'Failed to create recipe');
    }

    const result: ApiResponse<RecipeResponse> = await response.json();
    return result.data;
  }

  async updateRecipe(recipeId: string, data: UpdateRecipeRequest, token: string): Promise<RecipeResponse> {
    const response = await fetch(`${API_BASE_URL}/recipe/${recipeId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update recipe' }));
      throw new Error(error.message || 'Failed to update recipe');
    }

    const result: ApiResponse<RecipeResponse> = await response.json();
    return result.data;
  }

  async deleteRecipe(recipeId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/recipe/${recipeId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete recipe' }));
      throw new Error(error.message || 'Failed to delete recipe');
    }
  }
}

export const recipeService = new RecipeService();