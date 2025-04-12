import React from 'react';
import FeedbackRow from './FeedbackRow';

const FeedbackTable = ({ feedbacks }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <FeedbackRow key={feedback._id} feedback={feedback} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
