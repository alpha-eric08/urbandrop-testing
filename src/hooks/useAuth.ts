import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { authService, type LoginRequest, type ForgotPasswordRequest, type ResetPasswordRequest } from '@/services/authService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData, ForgotPasswordFormData, ResetPasswordFormData } from '@/lib/schemas';

export const useLogin = () => {
  const { login, setLoading } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login({ email: data.email, password: data.password, rememberMe: data.rememberMe }),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      login(response.token, response.refresh_token, response.user);
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
      setLoading(false);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) => authService.forgotPassword({ email: data.email }),
    onSuccess: () => {
      toast.success('Reset link sent to your email!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send reset email');
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Password reset successfully!');
      navigate('/login', { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Password reset failed');
    },
  });
};

export const useLogout = () => {
  const { logout, token } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(token!),
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    },
    onError: () => {
      // Even if the API call fails, we still logout locally
      logout();
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });
};

export const useAuthData = () => {
  const { isAuthenticated, user, token, isLoading } = useAuthStore();
  return { isAuthenticated, user, token, isLoading };
};