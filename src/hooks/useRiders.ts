import { useState, useCallback } from 'react';
import { Rider, ridersData } from '@/assets/data/ridersData';

export const useRiders = () => {
  const [riders, setRiders] = useState<Rider[]>(ridersData);
  const [isLoading, setIsLoading] = useState(false);

  const createRider = useCallback(async (riderData: Omit<Rider, 'id'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRider: Rider = {
        ...riderData,
        id: Date.now().toString(),
      };
      
      setRiders(prev => [...prev, newRider]);
      return { success: true, data: newRider };
    } catch (error) {
      return { success: false, error: 'Failed to create rider' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRider = useCallback(async (id: string, updates: Partial<Rider>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRiders(prev => 
        prev.map(rider => 
          rider.id === id ? { ...rider, ...updates } : rider
        )
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update rider' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteRider = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRiders(prev => prev.filter(rider => rider.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete rider' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRiderById = useCallback((id: string) => {
    return riders.find(rider => rider.id === id);
  }, [riders]);

  return {
    riders,
    isLoading,
    createRider,
    updateRider,
    deleteRider,
    getRiderById,
  };
};