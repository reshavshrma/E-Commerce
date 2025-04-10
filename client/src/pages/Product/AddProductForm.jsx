import React, { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../../components/Products/AddProduct/InputField";
import SizeCheckbox from "../../components/Products/AddProduct/SizeCheckbox";
import TagSelector from "../../components/Products/AddProduct/TagSelector";
import CategoryDropdown from "../../components/Products/AddProduct/CategoryDropdown";
import ImageUploader from "../../components/Products/AddProduct/ImageUploader";
import { useNavigate } from "react-router-dom";


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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/product/add-product`,
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
      navigate('/')
    } catch (err) {
console.error("error in prd " , err);

    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Title" name="title" value={formData.title} onChange={handleChange} required />
        <InputField label="Description" name="description" value={formData.description} onChange={handleChange} required textarea />
        <InputField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <SizeCheckbox selectedSizes={formData.sizes} onChange={handleCheckboxChange} />
        <CategoryDropdown value={formData.category} onChange={handleChange} />
        <TagSelector value={formData.tag} onChange={handleChange} />
        <ImageUploader onChange={handleImageChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default AddProductForm;
