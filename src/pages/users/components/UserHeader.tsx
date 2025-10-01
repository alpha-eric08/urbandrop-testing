import { useState } from "react";
import { Search, Plus, Filter, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import CreateUserModal from "@/components/CreateUserModal";
import { User } from "@/services/userService";

interface UserHeaderProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  users: User[];
}

export default function UserHeader({
  activeFilter,
  setActiveFilter,
  searchTerm,
  setSearchTerm,
  users,
}: UserHeaderProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filters = [
    { key: "all", label: "All Users", count: users.length },
    { key: "active", label: "Active", count: users.filter(u => u.is_active === 1).length },
    { key: "inactive", label: "Inactive", count: users.filter(u => u.is_active === 0).length },
    { key: "admin", label: "Admins", count: users.filter(u => u.role_id === "admin").length },
    { key: "super_admin", label: "Super Admins", count: users.filter(u => u.role_id === "super_admin").length },
  ];

  const exportToCSV = () => {
    const csvData = users.map(user => ({
      ID: user.id,
      Name: user.full_name,
      Email: user.email,
      Role: user.role_id,
      Status: user.is_active ? 'Active' : 'Inactive',
      'Created At': new Date(user.created_at).toLocaleDateString(),
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:p-8 p-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
          <p className="text-muted-foreground">
            Manage admin users and permissions in your system
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToCSV}>
                <FileText className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setShowCreateModal(true)} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="border-t border-border bg-muted/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:px-8 px-4 py-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <Badge
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "secondary"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label} ({filter.count})
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <CreateUserModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </div>
  );
}