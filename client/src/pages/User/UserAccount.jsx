import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbars/Navbar/Navbar";
import UserProfile from "../../components/User/UserAccount/UserProfile";
import UserDetailsForm from "../../components/User/UserAccount/UserDetailsForm";
import UserActions from "../../components/User/UserAccount/UserActions";


const UserAccount = () => {
  const [showUser, setShowUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const userDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/${id}/account`,
        { withCredentials: true }
      );
      setShowUser(data.data.userInfo);
    } catch (err) {
      setError("Error in fetching user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userDetails();
  }, [id]);


  return (
    <>
      <Navbar />
      
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <p>Loading...</p> 
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
          <UserProfile user={showUser} />

          <div className="flex-1 bg-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-zinc-800 mb-6 tracking-wide" >
                My Account
              </h2>

              {showUser ? (
                <>
                  <UserDetailsForm user={showUser} />
                  <UserActions navigate={navigate} />
                </>
              ) : (
                <p className="text-gray-500 text-lg text-center">User details not found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccount;
