import React from "react";
import { useUser } from "./UserContext";


const IsAdmin = ({ children }) => {
  const { user } = useUser();

  // Check if user is not logged in or not an admin
  if (!user || user.role !== "admin") {
    return <p>Page Not Found !</p>  // Redirect to 404 page
  }

  return children;
};

export default IsAdmin;
