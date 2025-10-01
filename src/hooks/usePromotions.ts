import { useState, useCallback } from 'react';
import { Promotion, promotionsData } from '@/assets/data/promotionsData';

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(promotionsData);
  const [isLoading, setIsLoading] = useState(false);

  const createPromotion = useCallback(async (promotionData: Omit<Promotion, 'id'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPromotion: Promotion = {
        ...promotionData,
        id: Date.now().toString(),
      };
      
      setPromotions(prev => [...prev, newPromotion]);
      return { success: true, data: newPromotion };
    } catch (error) {
      return { success: false, error: 'Failed to create promotion' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePromotion = useCallback(async (id: string, updates: Partial<Promotion>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPromotions(prev => 
        prev.map(promotion => 
          promotion.id === id ? { ...promotion, ...updates } : promotion
        )
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update promotion' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePromotion = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPromotions(prev => prev.filter(promotion => promotion.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete promotion' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPromotionById = useCallback((id: string) => {
    return promotions.find(promotion => promotion.id === id);
  }, [promotions]);

  return {
    promotions,
    isLoading,
    createPromotion,
    updatePromotion,
    deletePromotion,
    getPromotionById,
  };
};