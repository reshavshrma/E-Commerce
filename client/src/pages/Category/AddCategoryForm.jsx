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

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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
        `${import.meta.env.VITE_API_URL}/api/category/add-category`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        setSuccessMsg("Category added successfully!");
        setFormData({ title: "", description: "", tag: "", image: null });
      }
      navigate('/');
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-xl mx-auto">
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

      <div>
        <label className="block text-gray-700 mb-1">Tag</label>
        <select
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Tag</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formErrors.tag && <p className="text-sm text-red-500">{formErrors.tag}</p>}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        {formErrors.image && <p className="text-sm text-red-500">{formErrors.image}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 mt-4 font-semibold text-white rounded ${
          isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default AddCategoryForm;
