import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("🔁 Loaded user from localStorage:", storedUser);
      return JSON.parse(storedUser);
    }
    return null;
  });

  const fetchAuthStatus = async () => {
    console.log("📡 Fetching user authentication status...");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/auth`,
        { withCredentials: true }
      );

      if (response.data.isAuthenticated) {
        console.log("✅ User is authenticated:", response.data.user);
        setUser(response.data.user);
      } else {
        console.log("❌ User is not authenticated");
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Error fetching authentication status:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("🔍 No user in state, calling fetchAuthStatus()");
      fetchAuthStatus();
    } else {
      console.log("✅ User already in state:", user);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log("💾 Saving user to localStorage...");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("🧹 Removing user from localStorage (logged out)");
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
