import React, { forwardRef, useId } from "react";

export const Input = forwardRef(
  ({ label, type = "text", className, ...props }, ref) => {
    const id = useId();
    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={id}
            className="inline-block mb-1 font-lato text-secondary-white"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-2 py-[3px] rounded-md bg-transparent border border-slate-500 focus:outline-none active:bg-transparent active:border-white focus:border-white placeholder:text-sm ${className}`}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
