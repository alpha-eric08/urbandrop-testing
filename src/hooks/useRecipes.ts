import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { recipeService, type CreateRecipeRequest, type UpdateRecipeRequest, type RecipeResponse } from '@/services/recipeService';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export const useRecipes = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['recipes'],
    queryFn: () => recipeService.getRecipes(token!),
    enabled: !!token,
  });
};

export const useRecipe = (recipeId: string) => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => recipeService.getRecipeById(recipeId, token!),
    enabled: !!token && !!recipeId,
  });
};

export const useCreateRecipe = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRecipeRequest) => recipeService.createRecipe(data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create recipe');
    },
  });
};

export const useUpdateRecipe = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipeId, data }: { recipeId: string; data: UpdateRecipeRequest }) =>
      recipeService.updateRecipe(recipeId, data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update recipe');
    },
  });
};

export const useDeleteRecipe = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => recipeService.deleteRecipe(recipeId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete recipe');
    },
  });
};