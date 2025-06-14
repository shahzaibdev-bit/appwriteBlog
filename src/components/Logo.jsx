import React from "react";

function Logo({ width = "120px" }) {
  return (
    <div
      className="text-xl font-bold text-purple-500 tracking-wider select-none"
      style={{ width }}
    >
      EchoVerse
    </div>
  );
}

export default Logo;
