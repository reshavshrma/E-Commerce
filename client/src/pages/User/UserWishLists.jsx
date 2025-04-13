import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserWishlistProductCard from "../../components/User/UserWishlist/UserWishlistProductCard";


const UserWishlists = () => {
  const { id } = useParams();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist
  useEffect(() => {
    if (!id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${id}/account/wishlists`, {
          withCredentials: true,
        });

        const products = res?.data?.data?.wishlists || [];
        setWishlists(products);
      } catch (err) {
        setError("Failed to fetch wishlists");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [id]);



  if (error) return <div className="text-center">Error !</div>;

  return (
    <div className="bg-gray-100 min-h-screen">


      {loading ? (
        <div className="text-center py-20">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-hidden">
          <h2 className="text-center text-3xl font-bold text-gray-900 mt-10 mb-6">My Wishlists</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-6 md:px-10 lg:px-20 py-10">
            {wishlists.length > 0 ? (
              wishlists.map((product) => (
                <UserWishlistProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full">
                not availble !
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWishlists;
