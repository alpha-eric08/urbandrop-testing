import { useState, useCallback, useEffect } from 'react';
import { ProductCategory, ProductSubcategory } from '@/assets/data/categoriesData';
import { categoryService } from '@/services/categoryService';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

export const useCategories = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [subcategories, setSubcategories] = useState<ProductSubcategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();

  // Fetch categories and subcategories on mount
  const fetchData = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const [categoriesData, subcategoriesData] = await Promise.all([
        categoryService.getCategories(token),
        categoryService.getAllSubcategories(token),
      ]);
      
      // Ensure we always have arrays, not objects
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setSubcategories(Array.isArray(subcategoriesData) ? subcategoriesData : []);
    } catch (error) {
      // Set empty arrays on error to prevent undefined issues
      setCategories([]);
      setSubcategories([]);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Category methods
  const createCategory = useCallback(async (categoryData: Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    setIsLoading(true);
    try {
      const newCategory = await categoryService.createCategory(categoryData, token);
      setCategories(prev => [...prev, newCategory]);
      await fetchData(); // Refresh data
      return { success: true, data: newCategory };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to create category' };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchData]);

  const updateCategory = useCallback(async (id: string, updates: Partial<ProductCategory>) => {
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    setIsLoading(true);
    try {
      const updatedCategory = await categoryService.updateCategory(id, updates, token);
      setCategories(prev => 
        prev.map(category => category.id === id ? updatedCategory : category)
      );
      await fetchData(); // Refresh data
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to update category' };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchData]);

  const deleteCategory = useCallback(async (id: string) => {
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    setIsLoading(true);
    try {
      await categoryService.deleteCategory(id, token);
      setCategories(prev => prev.filter(category => category.id !== id));
      setSubcategories(prev => prev.filter(sub => sub.categoryId !== id));
      await fetchData(); // Refresh data
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to delete category' };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchData]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find(category => category.id === id);
  }, [categories]);

  // Subcategory methods
  const createSubcategory = useCallback(async (subcategoryData: Omit<ProductSubcategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    setIsLoading(true);
    try {
      const newSubcategory = await categoryService.createSubcategory(subcategoryData, token);
      setSubcategories(prev => [...prev, newSubcategory]);
      await fetchData(); // Refresh data
      return { success: true, data: newSubcategory };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to create subcategory' };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchData]);

  const updateSubcategory = useCallback(async (id: string, updates: Partial<ProductSubcategory>) => {
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    setIsLoading(true);
    try {
      const updatedSubcategory = await categoryService.updateSubcategory(id, updates, token);
      setSubcategories(prev => 
        prev.map(subcategory => subcategory.id === id ? updatedSubcategory : subcategory)
      );
      await fetchData(); // Refresh data
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to update subcategory' };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchData]);

  const deleteSubcategory = useCallback(async (id: string) => {
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    setIsLoading(true);
    try {
      await categoryService.deleteSubcategory(id, token);
      setSubcategories(prev => prev.filter(subcategory => subcategory.id !== id));
      await fetchData(); // Refresh data
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to delete subcategory' };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchData]);

  const getSubcategoryById = useCallback((id: string) => {
    return subcategories.find(subcategory => subcategory.id === id);
  }, [subcategories]);

  const getSubcategoriesByCategory = useCallback((categoryId: string) => {
    return subcategories.filter(subcategory => subcategory.categoryId === categoryId);
  }, [subcategories]);

  return {
    categories,
    subcategories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategoryById,
    getSubcategoriesByCategory,
  };
};