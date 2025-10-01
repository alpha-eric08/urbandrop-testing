import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  full_name: string;
  email: string;
  role_id: string;
  role_name: string;
  is_active: number;
  created_at: string;
  can_manage_admins: number;
  can_manage_customers: number;
  can_manage_merchants: number;
  can_manage_products: number;
  can_manage_orders: number;
  can_manage_riders: number;
  can_manage_transactions: number;
  can_manage_promotions: number;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refresh_token: string | null;
  user: User | null;
  isLoading: boolean;
}

interface AuthActions {
  login: (token: string, refresh_token: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      refresh_token: null,
      user: null,
      isLoading: false,

      login: (token, refresh_token, user) =>
        set({
          isAuthenticated: true,
          token,
          refresh_token,
          user,
          isLoading: false,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          token: null,
          refresh_token: null,
          user: null,
          isLoading: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      updateUser: (user) => set({ user }),
    }),
    {
      name: 'urbanDrop-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refresh_token: state.refresh_token,
        user: state.user,
      }),
    }
  )
);