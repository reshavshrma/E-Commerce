import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";
import SkeletonForm from '../LoadingSkeleton/SkeletonForm'
const Logout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/user/logout`,
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUser(null);
          localStorage.removeItem("user");
          navigate("/"); // Redirect to homepage or login page
        } else {
          console.error("Logout failed with unexpected status:", response.status);
        }
      } catch (error) {
        console.error("❌ Failed to logout:", error?.response?.data?.message || error.message);
      }
    };

    logoutUser();
  }, [setUser, navigate]);

  return (
    <> 
    <div className="flex justify-center items-center mt-10">
      <SkeletonForm/>
    </div>
    </>
  );
};

export default Logout;
