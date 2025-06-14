import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-purple-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md ${bgColor} ${textColor} hover:opacity-90 transition duration-200 ${className}`}
      {...props}
    >
      {children}
      {/* This children means text or element that will be passed inside the button component */}
    </button>
  );
}
