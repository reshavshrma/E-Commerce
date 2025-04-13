import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../components/UserContext/userContext";
import UserProfileImage from "../../components/User/UserAccountEdit/UserProfileImage";
import UserAccountForm from "../../components/User/UserAccountEdit/UserAccountForm";
import SkeletonForm from "../../components/LoadingSkeleton/SkeletonForm";
const UserAccountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [orgImage, setOrgImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${id}/account`, {
          withCredentials: true,
        });

        const userInfo = data.data.userInfo;
        setUserData({
          name: userInfo.name || "",
          phone: userInfo.phone || "",
          email: userInfo.email || "",
        });
        setOrgImage(userInfo.image || "/default-avatar.png");
      } catch (err) {
        setError("Unable to fetch user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setOrgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${id}/account/edit`,
        formData,
        { withCredentials: true }
      );
      navigate(`/user/${id}/account`);
    } catch (err) {
      setError("Failed to update user. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10 bg-gray-100">
        <SkeletonForm/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-zinc-500 flex items-center justify-center py-10 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Edit Your Profile</h1>
          <p className="text-gray-200 text-sm mt-2">Keep your information up-to-date</p>
        </div>

        <UserProfileImage orgImage={orgImage} handleImageChange={handleImageChange} />

        <UserAccountForm
          userData={userData}
          handleChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={submitLoading}
        />

        {error && (
          <div className="text-center text-red-600 font-semibold text-sm pb-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountEdit;
