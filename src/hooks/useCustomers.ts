import { useState, useMemo, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { customerService, ApiCustomer, CreateCustomerRequest } from '@/services/customerService';
import { useAuthStore } from '@/stores/authStore';

export interface Customer {
  id: string;
  name: string;
  customerId: string;
  email: string;
  phone: string;
  website?: string;
  dateOfBirth?: string;
  joinDate: string;
  location?: string;
  country?: string;
  subscriptionStatus: "Premium" | "Basic";
  accountStatus: "Active" | "Inactive" | "Pending" | "Suspended";
  orderCount?: number;
  orderValue?: string;
  avatar?: any;
}

// Transform API customer to local Customer interface
const transformApiCustomer = (apiCustomer: ApiCustomer): Customer => {
  const location = apiCustomer.address 
    ? `${apiCustomer.address.city}, ${apiCustomer.address.country}`
    : undefined;
  
  const phone = apiCustomer.mcc && apiCustomer.mobile_number 
    ? `${apiCustomer.mcc}${apiCustomer.mobile_number}`
    : apiCustomer.mobile_number || '';

  return {
    id: apiCustomer.id,
    name: apiCustomer.full_name || apiCustomer.email.split('@')[0],
    customerId: apiCustomer.id,
    email: apiCustomer.email,
    phone,
    joinDate: new Date(apiCustomer.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    location,
    country: apiCustomer.address?.country,
    subscriptionStatus: "Basic", // Default since API doesn't have this field
    accountStatus: apiCustomer.status === 'active' && apiCustomer.active ? "Active" : "Inactive",
  };
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { token } = useAuthStore();

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const apiCustomers = await customerService.getCustomers(token);
        const transformedCustomers = apiCustomers.map(transformApiCustomer);
        setCustomers(transformedCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast({
          title: "Error",
          description: "Failed to fetch customers. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token, toast]);

  const deleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== customerId));
    toast({
      title: "Customer deleted",
      description: "Customer has been successfully deleted.",
    });
  };

  const updateCustomer = (customerId: string, updates: Partial<Customer>) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, ...updates }
          : customer
      )
    );
    toast({
      title: "Customer updated",
      description: "Customer information has been successfully updated.",
    });
  };

  const blockCustomer = (customerId: string) => {
    updateCustomer(customerId, { accountStatus: "Suspended" });
    toast({
      title: "Customer blocked",
      description: "Customer has been blocked successfully.",
      variant: "destructive",
    });
  };

  const addCustomer = async (newCustomer: Omit<Customer, 'id' | 'customerId'>) => {
    if (!token) {
      toast({
        title: "Error",
        description: "Authentication required to create customer.",
        variant: "destructive",
      });
      return;
    }

    try {
      const createRequest: CreateCustomerRequest = {
        id: crypto.randomUUID(),
        gc_id: crypto.randomUUID(),
        email: newCustomer.email,
        email_verified: false,
        full_name: newCustomer.name,
        mcc: newCustomer.phone?.slice(0, 4) || '',
        mobile_number: newCustomer.phone?.slice(4) || '',
        mobile_number_verified: false,
        image_url: '',
        active: true,
        mfa_active: false,
        notification_channels: {
          email: true,
          push: true,
          sms: true
        },
        notifications: {
          orders: true,
          offers: true,
          new_menu: true,
          recommendations: true
        },
        address: {
          id: crypto.randomUUID(),
          customer_id: crypto.randomUUID(),
          is_active: true,
          is_default: true,
          address: newCustomer.location?.split(',')[0] || '',
          address_line_2: '',
          city: newCustomer.location?.split(',')[0] || '',
          post_code: '',
          country: newCustomer.country || '',
          state: '',
          latitude: '',
          longitude: '',
          address_type: 'delivery'
        }
      };

      const apiCustomer = await customerService.createCustomer(createRequest, token);
      const customer = transformApiCustomer(apiCustomer);
      
      setCustomers(prev => [customer, ...prev]);
      toast({
        title: "Customer created",
        description: "New customer has been successfully created.",
      });
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      toast({
        title: "Error",
        description: "Failed to create customer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getFilteredCustomers = (searchTerm: string, statusFilter: string) => {
    return useMemo(() => {
      let filtered = customers;

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(customer =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm) ||
          customer.customerId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (statusFilter && statusFilter !== 'all') {
        switch (statusFilter) {
          case 'active':
            filtered = filtered.filter(customer => customer.accountStatus === 'Active');
            break;
          case 'inactive':
            filtered = filtered.filter(customer => customer.accountStatus === 'Inactive');
            break;
          case 'pending':
            filtered = filtered.filter(customer => customer.accountStatus === 'Pending');
            break;
          case 'suspended':
            filtered = filtered.filter(customer => customer.accountStatus === 'Suspended');
            break;
          case 'premium':
            filtered = filtered.filter(customer => customer.subscriptionStatus === 'Premium');
            break;
          case 'basic':
            filtered = filtered.filter(customer => customer.subscriptionStatus === 'Basic');
            break;
        }
      }

      return filtered;
    }, [customers, searchTerm, statusFilter]);
  };

  return {
    customers,
    loading,
    deleteCustomer,
    updateCustomer,
    blockCustomer,
    addCustomer,
    getFilteredCustomers,
  };
};