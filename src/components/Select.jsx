import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm text-gray-300">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-md bg-[#2a2d3e] text-[#f1f1f1] outline-none border border-[#3a3d4e] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200 w-full ${className}`}
      >
        {/* options? is a check to ensure that the options prop is defined or not */}
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#2a2d3e] text-white"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
