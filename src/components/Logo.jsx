import React from "react";

export const Logo = ({ className = "" }) => {
  return (
    <div>
      <img
        src="/logo-1.png"
        alt="logo"
        className={`bg-white rounded-full p-1 ${className}`}
      />
    </div>
  );
};
