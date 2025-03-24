import React from "react";

const SecondaryButton = ({
  handleClick,
  children,
  className = "",
}: {
  handleClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className={`w-fit font-medium border border-gray-700 hover:bg-gray-800 text-gray-300 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
