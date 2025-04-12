import React from 'react';

const FeedbackRow = ({ feedback }) => {
  const { user, message, status } = feedback;

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{user?.name}</td>
      <td className="px-4 py-2">{user?.email}</td>
      <td className="px-4 py-2">{user?.phone}</td>
      <td className="px-4 py-2">{message}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded-full text-white text-sm ${
            status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-500'
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default FeedbackRow;
