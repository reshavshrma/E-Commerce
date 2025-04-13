import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorCard from "../../components/Vendors/VendorCard.jsx/VendorCard";
import SkeletonList from "../../components/LoadingSkeleton/SkeletonList";
const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const  {data}  = await axios.get(`${import.meta.env.VITE_API_URL}/api/vendor/all-vendors`);
        console.log("res of vendor" , data.data.image);
        
        setVendors(data.data);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Meet Our Vendors
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <SkeletonList/>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVendors;
