import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Products/AddProduct/InputField";
import SizeCheckbox from "../../components/Products/AddProduct/SizeCheckbox";
import TagSelector from "../../components/Products/AddProduct/TagSelector";
import CategoryDropdown from "../../components/Products/AddProduct/CategoryDropdown";
import ImageUploader from "../../components/Products/AddProduct/ImageUploader";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    sizes: [],
    category: "",
    tag: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (size) => {
    setFormData((prev) => {
      const updatedSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: updatedSizes };
    });
  };

  const handleImageChange = (files) => {
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length > 7) {
      alert("Maximum 7 images allowed.");
      return;
    }

    const productData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img) => productData.append("images", img));
      } else if (key === "sizes") {
        value.forEach((size) => productData.append("sizes", size));
      } else {
        productData.append(key, value);
      }
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/add-product`,
        productData,
        { withCredentials: true }
      );

      setFormData({
        title: "",
        description: "",
        price: "",
        sizes: [],
        category: "",
        tag: "",
        images: [],
      });

      navigate("/");
    } catch (err) {
      console.error("❌ Error adding product:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField label="Product Title" name="title" value={formData.title} onChange={handleChange} required />
        <InputField label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <InputField label="Description" name="description" value={formData.description} onChange={handleChange} required textarea />
        <CategoryDropdown value={formData.category} onChange={handleChange} />
        <TagSelector value={formData.tag} onChange={handleChange} />
        <SizeCheckbox selectedSizes={formData.sizes} onChange={handleCheckboxChange} />
        <div className="col-span-1 md:col-span-2">
          <ImageUploader onChange={handleImageChange} images={formData.images} />
        </div>

        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
