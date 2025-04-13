// pages/User/UserBookings.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserBookingCard from "../../components/User/UserBooking/UserBookingCard";


const UserBooking = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings
  useEffect(() => {
    if (!id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/account/bookings`,
          { withCredentials: true }
        );

        const products = res?.data?.data?.bookings || [];
        setBookings(products);
      } catch (err) {
        console.error("Booking fetch failed:", err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">

      {loading ? (
        <div className="text-center py-20 text-gray-600 text-xl">Loading...</div>
      ) : (
        <div className="overflow-x-hidden">
          <h2 className="text-center text-3xl font-bold text-gray-900 mt-10 mb-6">
            My Bookings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-6 md:px-10 lg:px-20 py-10">
            {bookings.length > 0 ? (
              bookings.map((product) => (
                <UserBookingCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No bookings available.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBooking;
