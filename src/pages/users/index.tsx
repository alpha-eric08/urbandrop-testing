import { useState, useMemo, Suspense, lazy } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useAuthData } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSkeleton, TableLoadingSkeleton } from "@/components/ui/loading-skeleton";

// Lazy load components
const UserHeader = lazy(() => import("./components/UserHeader"));
const UserTable = lazy(() => import("./components/UserTable"));

export default function Users() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, isLoading, error } = useUsers();
  const { user: currentUser } = useAuthData();

  const hasPermission = true;

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilter && activeFilter !== 'all') {
      switch (activeFilter) {
        case 'active':
          filtered = filtered.filter(user => user.is_active === 1);
          break;
        case 'inactive':
          filtered = filtered.filter(user => user.is_active === 0);
          break;
        case 'admin':
          filtered = filtered.filter(user => user.role_id === 'admin');
          break;
        case 'super_admin':
          filtered = filtered.filter(user => user.role_id === 'super_admin');
          break;
      }
    }

    return filtered;
  }, [users, searchTerm, activeFilter]);

  if (!hasPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-lg font-medium mb-2">Access Denied</h3>
            <p className="text-muted-foreground text-center">
              You don't have permission to access the Users Management page.
              Only admins and super admins can manage users.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <LoadingSkeleton rows={2} className="mb-6" />
        <div className="md:p-8 p-4">
          <TableLoadingSkeleton rows={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load users: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<LoadingSkeleton rows={1} />}>
        <UserHeader 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          users={users || []}
        />
      </Suspense>

      <div className="md:px-8 px-4 pb-4">
        <Suspense fallback={<TableLoadingSkeleton rows={8} />}>
          <UserTable 
            users={filteredUsers}
            searchTerm={searchTerm}
          />
        </Suspense>
      </div>
    </div>
  );
}
