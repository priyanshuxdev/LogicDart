import React, { forwardRef, useId } from "react";

export const Select = forwardRef(
  (
    {
      options,
      label,
      className = "", //for handling nulls
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="text-sm text-secondary-white">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          {...props}
          className={`${className} w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

// export default forwardRef(Select); //forwardRef is also written like this
