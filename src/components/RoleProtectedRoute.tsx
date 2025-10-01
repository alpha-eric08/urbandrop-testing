import { Navigate } from 'react-router-dom';
import { usePermissions, type Permission } from '@/hooks/usePermissions';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  requireAll?: boolean; // If true, user must have ALL permissions. If false, user needs ANY permission
  allowedRoles?: string[]; // Specific roles that can access this route
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ 
  children, 
  requiredPermissions = [],
  requireAll = false,
  allowedRoles = []
}) => {
  const { 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions, 
    isAuthenticated, 
    user,
    isSuperAdmin 
  } = usePermissions();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user has required permissions or roles
      const hasRequiredPermissions = requiredPermissions.length === 0 || 
        (requireAll ? hasAllPermissions(requiredPermissions) : hasAnyPermission(requiredPermissions));
      
      const hasRequiredRole = allowedRoles.length === 0 || 
        allowedRoles.includes(user.role_id);

      if (!hasRequiredPermissions && !hasRequiredRole && !isSuperAdmin()) {
        toast.error('Access denied: You do not have permission to access this page');
      }
    }
  }, [isAuthenticated, user, requiredPermissions, allowedRoles, requireAll, hasAnyPermission, hasAllPermissions, isSuperAdmin]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Super admin has access to everything
  if (isSuperAdmin()) {
    return <>{children}</>;
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requireAll 
      ? hasAllPermissions(requiredPermissions) 
      : hasAnyPermission(requiredPermissions);
    
    if (!hasRequiredPermissions) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Check roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role_id)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;