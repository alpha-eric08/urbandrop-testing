import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService, type CreateUserRequest, type UpdateUserRequest, type User } from '@/services/userService';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export const useUsers = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(token!),
    enabled: !!token,
  });
};

export const useUser = (userId: string) => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId, token!),
    enabled: !!token && !!userId,
  });
};

export const useCreateUser = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => userService.createUser(data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create user');
    },
  });
};

export const useUpdateUser = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserRequest }) =>
      userService.updateUser(userId, data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update user');
    },
  });
};

export const useDeleteUser = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });
};