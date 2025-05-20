import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/customers/home";
import Product from "../pages/customers/product";
import Contact from "../pages/customers/contact";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

import AdminDashboard from "../pages/admin/dashboard";
import UserProfile from "../pages/customers/profile";

import NotFound from "../pages/notfound";
import ProtectedRoute from "../routes/ProtectedRoute";
import CustomerLayout from "../layouts/CustomerLayout";
import GuestLayout from "../layouts/GuestLayout";
import AdminLayout from "../layouts/AdminLayout";
import CategoryList from "../pages/admin/categories";
import ProductList from "../pages/admin/products";
import OrderManagement from "../pages/admin/order/OrderList";
import UserManagement from "../pages/admin/userbase/CustomerList";
import Cart from "../pages/customers/cart";
import Checkout from "../pages/checkout"
import ChangePassword from "../pages/customers/ChangePass";


const AppRoutes = () => {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;
  console.log(user)
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="customers" element={<UserManagement />} />
      </Route>

      <Route element={<CustomerLayout />}>
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/change-password"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="orders" element={<UserProfile />} />
      </Route>
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
