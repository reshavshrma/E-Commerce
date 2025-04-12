import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackTable from '../../components/Admin/AdminFeedback/FeedbackTable';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbackData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/feedbacks`, { withCredentials: true });
      setFeedbacks(res.data.data.allFeedbackDetails);
    } catch (err) {
      console.error('Error fetching feedback data:', err);
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      <FeedbackTable feedbacks={feedbacks} />
    </div>
  );
};

export default AdminFeedback;
