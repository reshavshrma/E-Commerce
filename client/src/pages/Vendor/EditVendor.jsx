import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditVendor = () => {
    const {id} = useParams();
    const navigate  = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      area: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    },
    image: null,
  });

  useEffect(() => {
    // Fetch existing vendor data
    const fetchVendor = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/vendor/${id}/account`, { withCredentials: true });
        const vendor = data?.data?.vendorInfo;
        setFormData({
          name: vendor.name || "",
          username: vendor.username || "",
          email: vendor.email || "",
          phone: vendor.phone || "",
          address: vendor.address || {
            area: "",
            city: "",
            pincode: "",
            state: "",
            country: "",
          },
          image: null,
        });
      } catch (err) {
        console.error("Error fetching vendor:", err);
      }
    };

    if (id) fetchVendor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["area", "city", "pincode", "state", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "address") {
          Object.entries(value).forEach(([addrKey, addrVal]) =>
            payload.append(`address[${addrKey}]`, addrVal)
          );
        } else {
          payload.append(key, value);
        }
      });

      await axios.put(`${import.meta.env.VITE_API_URL}/api/vendor/${id}/account/edit`, payload, {
        withCredentials: true,
      });

      navigate('/');
    } catch (err) {
      console.error("Error updating vendor:", err);
      alert("Failed to update vendor");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Vendor</h2>
      <form onSubmit={handleSubmit}>
        {["name", "username", "email", "phone"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
        ))}

        {["area", "city", "pincode", "state", "country"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={`Address ${field}`}
            value={formData.address[field]}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
        ))}

        <input type="file" onChange={handleImageChange} className="mb-3" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVendor;
