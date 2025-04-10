import React, { forwardRef } from "react";

const InputField = forwardRef(({ type, name, value, onChange, placeholder, icon }, ref) => {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-gray-400">{icon}</span>
      <input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full py-2 px-10 rounded-md border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
});

export default InputField;
