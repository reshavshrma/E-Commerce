import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingTable from '../../components/Admin/AdminBooking/BookingTable';

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/bookings`, { withCredentials: true });
      setBookings(res.data.data.allBookingDetails);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      <BookingTable bookings={bookings} />
    </div>
  );
};

export default AdminBooking;
