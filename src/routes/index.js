import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/customers/home";
import Product from "../pages/customers/product";
import Contact from "../pages/customers/contact";

import Login from "../pages/auth/login";
import Register from '../pages/auth/register';

import AdminDashboard from "../pages/admin/dashboard";
import UserProfile from "../pages/customers/profile";

import NotFound from "../pages/notfound";
import ProtectedRoute from "../routes/ProtectedRoute";
import CustomerLayout from "../layouts/CustomerLayout";

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserProfile />
          </ProtectedRoute>
        }
      />



      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
