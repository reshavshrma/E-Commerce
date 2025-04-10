import React from "react";

const InputField = ({ label, name, value, onChange, error, textarea = false }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows="3"
          className="p-2 border rounded-md"
        />
      ) : (
        <input
          id={name}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 border rounded-md"
        />
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
