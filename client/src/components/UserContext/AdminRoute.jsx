import React from "react";
import { useUser } from "./UserContext";
import AdminDashboard from "../../pages/Admin/AdminDashboard";

const AdminRoute = () => {
  const { user } = useUser();

  // Check if user is not logged in or not an admin
  if (!user || user.role !== "admin") {
    return <p> Page Not Found</p> // Redirect to 404 page
  }

  return <AdminDashboard />; // Render the admin panel if user is an admin
};

export default AdminRoute;
