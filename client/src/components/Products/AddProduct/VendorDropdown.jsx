import { useEffect, useState } from "react";
import axios from "axios";

const VendorDropdown = ({ value, onChange }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/vendor/all-vendors`, { withCredentials: true })
      .then((res) => {
        setVendors(res.data.data || []);
      })
      .catch(() => setVendors([]));
  }, []);

  return (
    <div>
      <label className="block font-medium mb-2 text-gray-700">Select Vendor</label>
      <select
        name="vendor"
        value={value}
        onChange={onChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Select...</option>
        {vendors.map((vendor) => (
          <option key={vendor._id} value={vendor._id}>
            {vendor.name} ({vendor.username})
          </option>
        ))}
      </select>
    </div>
  );
};

export default VendorDropdown;
