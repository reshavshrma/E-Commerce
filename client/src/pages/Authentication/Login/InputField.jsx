import React, { forwardRef } from "react";

const InputField = forwardRef(({ type, name, value, onChange, placeholder, icon, error }, ref) => {
  return (
    <div className="space-y-1">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span>
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full py-2 px-10 rounded-lg border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

export default InputField;
