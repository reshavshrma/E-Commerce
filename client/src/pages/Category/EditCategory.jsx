import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "", // can be URL or File
  });

  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/${id}`);
        const { title, description, image } = res.data?.data?.category || {};
        setFormData({ title, description, image });
        setPreviewImage(image);
      } catch (err) {
        console.error("❌ Error fetching category:", err);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit updated category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedData = new FormData();
      if (formData.title) updatedData.append("title", formData.title);
      if (formData.description) updatedData.append("description", formData.description);
      if (formData.image && formData.image instanceof File) {
        updatedData.append("image", formData.image);
      } else if (typeof formData.image === "string") {
        updatedData.append("image", formData.image);
      }

      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/category/${id}/edit`, updatedData, 
        {
        withCredentials: true, // if using cookies/auth
      });

      navigate("/"); // adjust path as needed
    } catch (err) {
      console.error("❌ Error updating category:", err);
      alert("Something went wrong while updating the category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Category Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full border px-3 py-2 rounded"
            placeholder="Category Description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-full max-w-xs rounded shadow"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
