import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import NotFound from "./pages/NotFound";
// import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Login from "./pages/auth/Login";
import Layout from "./pages/Layout";
import Customers from "./pages/customer";
import CustomerDetail from "./pages/customer/CustomerDetail";
import Dashboard from "./pages/dashboard";
import MerchantsPage from "./pages/merchant";
import Recipes from "./pages/recipe";
import OrdersPage from "./pages/orders";
import OrderView from "./pages/orders/OrderView";
import OrderCreate from "./pages/orders/OrderCreate";
import Users from "./pages/users";
import RidersPage from "./pages/riders";
import PromotionsPage from "./pages/promotions";
import Notifications from "./pages/help/Notifications";
import HelpCenter from "./pages/help/HelpCenter";
import ContactSupport from "./pages/help/ContactSupport";
import Documentation from "./pages/help/Documentation";
import ProfileDetails from "./pages/profile/ProfileDetails";
import BannersPage from "./pages/banners";
import CategoriesPage from "./pages/categories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="customers"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_customers']}>
                      <Customers />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="customers/:id"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_customers']}>
                      <CustomerDetail />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="merchants"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_merchants']}>
                      <MerchantsPage />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="recipes"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_products']}>
                      <Recipes />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_orders']}>
                      <OrdersPage />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/view"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_orders']}>
                      <OrderView />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/create"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_orders']}>
                      <OrderCreate />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_admins']}>
                      <Users />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/riders"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_riders']}>
                      <RidersPage />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promotions"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute requiredPermissions={['can_manage_promotions']}>
                      <PromotionsPage />
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/help-center"
                element={
                  <ProtectedRoute>
                    <HelpCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact-support"
                element={
                  <ProtectedRoute>
                    <ContactSupport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/documentation"
                element={
                  <ProtectedRoute>
                    <Documentation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/banners"
                element={
                  <ProtectedRoute>
                    <BannersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <CategoriesPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* THE CATCH-ALL "*" ROUTE  NotFound*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
