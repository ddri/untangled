import React from 'react';

export const Tabs = ({ children, value, onValueChange, className, ...props }) => (
  <div className={`${className}`} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { value, onValueChange })
    )}
  </div>
);

export const TabsList = ({ children, className, ...props }) => (
  <div className={`flex border-b ${className}`} {...props}>
    {children}
  </div>
);

export const TabsTrigger = ({ children, value, className, ...props }) => (
  <button
    className={`px-4 py-2 font-semibold ${
      props.active ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, className, ...props }) => (
  <div className={`mt-4 ${className}`} hidden={props.value !== value} {...props}>
    {children}
  </div>
);
