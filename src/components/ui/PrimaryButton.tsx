import React from "react";

const PrimaryButton = ({
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
      className={`w-fit font-medium cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
