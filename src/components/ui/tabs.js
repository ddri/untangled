import React from 'react';

export const Tabs = ({ children, value, onChange }) => {
  return <div>{children}</div>;
};

export const TabsList = ({ children }) => {
  return <div className="flex space-x-2 mb-4">{children}</div>;
};

export const TabsTrigger = ({ children, value, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, activeValue }) => {
  if (value !== activeValue) return null;
  return <div>{children}</div>;
};