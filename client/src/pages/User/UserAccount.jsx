import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserAccount = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${id}/account`, {
          withCredentials: true, // Include session cookies if needed
        });

        setUser(response.data.data.userInfo);
        setErrorMsg("");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMsg(
          error.response?.data?.message || "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserDetails();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading user details...</p>
      ) : errorMsg ? (
        <p className="text-center text-red-500">{errorMsg}</p>
      ) : (
        user && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="space-y-3">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Username:</span> {user.username}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone}</p>
              {user.address && (
                <div>
                  <h4 className="font-semibold mt-4">Address:</h4>
                  <p>{user.address.area}, {user.address.city}</p>
                  <p>{user.address.state}, {user.address.country} - {user.address.pincode}</p>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserAccount;
