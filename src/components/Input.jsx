import React, { useId } from "react";

// ForwardRef is used to forward the ref to the input element
// Like we are using multiple inputs in a form and we want to manage the state of our Input but we don't know which Input is for which field
// So for this we use forwardRef to forward the ref to the input element to our main file where we are using this Input component to handle the state of the input
// This is a common practice to use forwardRef in input components

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-sm text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-md bg-[#2a2d3e] text-[#f1f1f1] placeholder-gray-400 outline-none border border-[#3a3d4e] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
