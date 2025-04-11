import React from "react";

const InputField = React.memo(({ label, name, type, value, onChange, error, placeholder, icon: Icon }) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full px-4 py-2 pl-10 rounded-xl border ${
            error ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

export default InputField;
