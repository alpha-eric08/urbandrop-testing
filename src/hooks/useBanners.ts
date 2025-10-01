import { useState, useCallback } from 'react';
import { Banner, bannersData } from '@/assets/data/bannersData';

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>(bannersData);
  const [isLoading, setIsLoading] = useState(false);

  const createBanner = useCallback(async (bannerData: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBanner: Banner = {
        ...bannerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setBanners(prev => [...prev, newBanner]);
      return { success: true, data: newBanner };
    } catch (error) {
      return { success: false, error: 'Failed to create banner' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBanner = useCallback(async (id: string, updates: Partial<Banner>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBanners(prev => 
        prev.map(banner => 
          banner.id === id ? { ...banner, ...updates, updatedAt: new Date().toISOString() } : banner
        )
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update banner' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBanner = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBanners(prev => prev.filter(banner => banner.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete banner' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBannerById = useCallback((id: string) => {
    return banners.find(banner => banner.id === id);
  }, [banners]);

  const toggleBannerStatus = useCallback(async (id: string) => {
    const banner = getBannerById(id);
    if (banner) {
      return updateBanner(id, { isActive: !banner.isActive });
    }
    return { success: false, error: 'Banner not found' };
  }, [getBannerById, updateBanner]);

  return {
    banners,
    isLoading,
    createBanner,
    updateBanner,
    deleteBanner,
    getBannerById,
    toggleBannerStatus,
  };
};