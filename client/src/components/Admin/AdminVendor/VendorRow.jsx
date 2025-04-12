import React, { useState } from "react";
import axios from "axios";

const VendorRow = ({ vendor, categories, refreshVendors }) => {
  const { name, username, _id, email, phone, address, image } = vendor;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("male");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddCategory = async () => {
    if (!selectedCategory) return setMessage("Select a category");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/vendors/${_id}/add-category`,
        {
          categoryId: selectedCategory,
          tag: selectedTag,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setMessage("Category added successfully!");
        refreshVendors();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <tr className="hover:bg-gray-100 text-center text-gray-900 transition-all">
      <td className="px-4 py-2 border">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full mx-auto object-cover border border-gray-300"
        />
      </td>
      <td className="px-4 py-2 border">{name}</td>
      <td className="px-4 py-2 border">{username}</td>
      <td className="px-4 py-2 border text-xs break-all">{_id}</td>
      <td className="px-4 py-2 border">{phone}</td>
      <td className="px-4 py-2 border">{email}</td>
      <td className="px-4 py-2 border text-sm text-left">
        {address.area}, {address.city}, {address.state}, {address.country} - {address.pincode}
      </td>
      <td className="px-4 py-2 border">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full mt-1 p-1 border rounded text-sm"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button
          onClick={handleAddCategory}
          className="mt-2 w-full bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
        {message && <p className="text-xs text-blue-600 mt-1">{message}</p>}
      </td>
    </tr>
  );
};

export default VendorRow;
