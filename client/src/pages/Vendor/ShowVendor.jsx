import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

      <div className="bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-8">
        {/* Profile Image + Basic */}
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

        {/* Contact & Address Info */}
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

      {/* Products Section */}
      <div className="bg-white mt-10 rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-700">Products</h3>
        {vendor.products.length > 0 ? (
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {vendor.products.map((product) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products listed yet.</p>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-white mt-6 rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-700">Categories</h3>
        {vendor.categories.length > 0 ? (
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {vendor.categories.map((cat) => (
              <li key={cat._id}>{cat.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default ShowVendor;
