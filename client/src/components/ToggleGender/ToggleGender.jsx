import React, { useState } from "react";

const ToggleGender = ({ onToggle }) => {
  const [selected, setSelected] = useState("male");

  const handleToggle = (value) => {
    setSelected(value);
    if (onToggle) onToggle(value);
  };

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="flex bg-gray-100 dark:bg-zinc-800 shadow-inner rounded-full overflow-hidden border border-gray-300 dark:border-zinc-700">
        {["male", "female"].map((gender) => (
          <button
            key={gender}
            onClick={() => handleToggle(gender)}
            className={`px-6 py-2 text-sm sm:text-base transition duration-300 font-medium focus:outline-none ${
              selected === gender
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleGender;
