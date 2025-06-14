import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-[#1b1d2b] text-white rounded-2xl shadow-md">
      {children}
    </div>
  );
}

export default Container;
