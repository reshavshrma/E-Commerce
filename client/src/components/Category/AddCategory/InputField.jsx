import React from "react";

const InputField = ({ label, name, value, onChange, error, textarea = false }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-gray-800 font-medium mb-1">
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows="4"
          placeholder={`Enter ${label.toLowerCase()}...`}
          className={`p-3 border rounded-md text-gray-800 bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            error ? "border-red-400" : "border-gray-300"
          }`}
        />
      ) : (
        <input
          id={name}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}...`}
          className={`p-3 border rounded-md text-gray-800 bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            error ? "border-red-400" : "border-gray-300"
          }`}
        />
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
