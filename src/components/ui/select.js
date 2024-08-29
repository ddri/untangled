import React from 'react';

export const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';