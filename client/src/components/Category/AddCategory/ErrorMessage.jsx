import React from "react";

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center font-medium">
    {message}
  </div>
);

export default ErrorMessage;
