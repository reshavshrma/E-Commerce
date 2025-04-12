import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorTable from "../../components/Admin/AdminVendor/VendorTable";


const AdminVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/vendors`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setVendors(response.data.data.allVendorDetails);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch vendor data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Registered Vendors
      </h1>

      {loading ? (
        <p > Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-medium">{error}</p>
      ) : vendors.length === 0 ? (
        <p className="text-center text-gray-600 font-medium">No vendors found.</p>
      ) : (
        <VendorTable vendors={vendors} />
      )}
    </div>
  );
};

export default AdminVendor;
