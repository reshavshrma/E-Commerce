import React, { useState } from "react";
import axios from "axios";
import InputField from "../../components/Category/AddCategory/InputField";
import ErrorMessage from "../../components/Category/AddCategory/ErrorMessage";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required.";
    if (!formData.tag) errors.tag = "Tag is required.";
    if (!formData.image) errors.image = "Image is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("tag", formData.tag);
    data.append("image", formData.image);

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/add-category`,
        data,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setSuccessMsg("✅ Category added successfully!");
        setFormData({ title: "", description: "", tag: "", image: null });
        setImagePreview(null);
        setTimeout(() => navigate('/saved/successfully'), 1000);
      }
    } catch (err) {
      const details = err.response?.data?.details;
      const msg = err.response?.data?.message || "Failed to add category!";
      const backendErrors = details
        ? details.reduce((acc, curr) => {
            if (curr.toLowerCase().includes("title")) acc.title = curr;
            else if (curr.toLowerCase().includes("tag")) acc.tag = curr;
            else acc.global = curr;
            return acc;
          }, {})
        : { global: msg };
      setFormErrors(backendErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 transition-all duration-300"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">Add Category</h2>

      {formErrors.global && <ErrorMessage message={formErrors.global} />}
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      <InputField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={formErrors.title}
      />

      <InputField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={formErrors.description}
        textarea
      />

      <div className="flex flex-col">
        <label htmlFor="tag" className="text-gray-700 font-medium mb-1">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Tag</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formErrors.tag && <p className="text-sm text-red-500 mt-1">{formErrors.tag}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className="text-gray-700 font-medium mb-1">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
        />
        {formErrors.image && <p className="text-sm text-red-500 mt-1">{formErrors.image}</p>}

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 w-full max-w-sm mx-auto rounded-md shadow-sm border border-gray-200"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-lg font-semibold text-white rounded-md transition duration-300 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default AddCategoryForm;
