import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVendor = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    area: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    image: null, // file
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("password", formData.password);

    // Address fields in nested format
    payload.append("address[area]", formData.area);
    payload.append("address[city]", formData.city);
    payload.append("address[pincode]", formData.pincode);
    payload.append("address[state]", formData.state);
    payload.append("address[country]", formData.country);

    // Image if uploaded
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/add-vendor`, payload, {
        withCredentials: true, // if using cookies
      });

      setMessage("✅ Vendor added successfully!");
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        area: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
        image: null,
      });
      navigate('/saved/successfully');
    } catch (err) {
      console.error("Error adding vendor:", err);
      setMessage(err?.response?.data?.message || "Failed to add vendor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Add New Vendor</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Basic Inputs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />

        {/* Address Inputs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input
            type="text"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />

        {/* File Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
{imagePreview && (
  <div className="w-full flex justify-center">
    <img
      src={imagePreview}
      alt="Preview"
      className="max-w-xs max-h-60 mt-4 rounded-md border border-gray-300 shadow-md"
    />
  </div>
)}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          {loading ? "Submitting..." : "Add Vendor"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="text-center text-sm text-red-500 mt-4">{message}</p>
      )}
    </div>
  );
};

export default AddVendor;
