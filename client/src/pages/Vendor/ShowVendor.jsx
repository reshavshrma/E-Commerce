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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/vendor/${id}/account`, {
        withCredentials: true, // if using session cookies
        headers: {
          // Authorization: `Bearer ${your_token}` if using JWT
        },
      });
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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Vendor Details</h1>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-40 h-40 object-cover rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{vendor.name}</h2>
          <p>Username: {vendor.username}</p>
          <p>Email: {vendor.email}</p>
          <p>Phone: {vendor.phone}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mt-4">Address</h3>
          <p>
            {vendor.address.area}, {vendor.address.city}, {vendor.address.pincode}, {vendor.address.state}, {vendor.address.country}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mt-4">Products</h3>
          <ul className="list-disc ml-6">
            {vendor.products.length > 0 ? (
              vendor.products.map((product) => (
                <li key={product._id}>{product.title}</li>
              ))
            ) : (
              <p>No products yet</p>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mt-4">Categories</h3>
          <ul className="list-disc ml-6">
            {vendor.categories.length > 0 ? (
              vendor.categories.map((cat) => (
                <li key={cat._id}>{cat.title}</li>
              ))
            ) : (
              <p>No categories</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowVendor;
