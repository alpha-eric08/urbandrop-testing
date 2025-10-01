import { useAuthStore } from '@/stores/authStore';

export type Permission = 
  | 'can_manage_admins'
  | 'can_manage_customers'
  | 'can_manage_merchants'
  | 'can_manage_products'
  | 'can_manage_orders'
  | 'can_manage_riders'
  | 'can_manage_transactions'
  | 'can_manage_promotions';

export const usePermissions = () => {
  const { user, isAuthenticated } = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    if (!isAuthenticated || !user) return false;
    return user[permission] === 1;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const isSuperAdmin = (): boolean => {
    return user?.role_id === 'super_admin';
  };

  const isAdmin = (): boolean => {
    return user?.role_id === 'admin';
  };

  const isViewer = (): boolean => {
    return user?.role_id === 'viewer';
  };

  const canAccessRoute = (route: string): boolean => {
    if (!isAuthenticated || !user) return false;

    // Super admin has access to everything
    if (isSuperAdmin()) return true;

    // Route-based permission mapping
    const routePermissions: Record<string, Permission[]> = {
      '/users': ['can_manage_admins'],
      '/customers': ['can_manage_customers'],
      '/merchants': ['can_manage_merchants'],
      '/recipes': ['can_manage_products'],
      '/orders': ['can_manage_orders'],
      '/riders': ['can_manage_riders'],
      '/promotions': ['can_manage_promotions'],
    };

    const requiredPermissions = routePermissions[route];
    if (!requiredPermissions) {
      // For routes not in the mapping (like dashboard), allow access for authenticated users
      return true;
    }

    return hasAnyPermission(requiredPermissions);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isSuperAdmin,
    isAdmin,
    isViewer,
    canAccessRoute,
    user,
    isAuthenticated
  };
};