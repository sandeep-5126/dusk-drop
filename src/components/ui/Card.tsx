import React from "react";

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full max-w-2xl border-0 shadow-2xl bg-gray-900/50 backdrop-blur-sm border-gray-800 h-fit rounded-lg p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
