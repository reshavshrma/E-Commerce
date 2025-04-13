import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VendorProduct from "../../components/Vendors/VendorProduct/VendorProduct";
import AllCategories from "../../components/Category/AllCategory/AllCategory";
const ShowVendor = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVendorDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/vendor/${id}/account`,
        {
          withCredentials: true,
        }
      );
      setVendor(res.data.data.vendorInfo);
    } catch (err) {
      console.error("❌ Error fetching vendor:", err);
      setError(err.response?.data?.message || "Failed to fetch vendor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[40vh] text-gray-600 text-lg">
        Loading vendor details...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-indigo-600 inline-block pb-2">
        Vendor Profile
      </h1>

      {/* Basic Profile */}
      <div className="bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-40 h-40 rounded-full object-cover shadow-md"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {vendor.name}
            </h2>
            <p className="text-gray-500">@{vendor.username}</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">{vendor.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-base font-medium">{vendor.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Full Address</p>
            <p className="text-base leading-relaxed">
              {vendor.address.area}, {vendor.address.city},{" "}
              {vendor.address.pincode}, {vendor.address.state},{" "}
              {vendor.address.country}
            </p>
          </div>
        </div>
      </div>

    <AllCategories/>
 
    </div>
  );
};

export default ShowVendor;
