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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vendor/add-vendor`, payload, {
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
      navigate('/');
    } catch (err) {
      console.error("Error adding vendor:", err);
      setMessage(err?.response?.data?.message || "Failed to add vendor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Vendor</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Basic Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Address Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* File Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Add Vendor"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  );
};

export default AddVendor;
