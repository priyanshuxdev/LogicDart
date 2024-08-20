import React from "react";

export const Button = ({
  children,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-lg cursor-pointer hover:scale-105 ${type} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
