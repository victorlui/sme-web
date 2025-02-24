import React from "react";

// import { Container } from './styles';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg p-4 bg-secondary-color1 animate-pulse w-[300px] ">
      <div className="flex space-x-4 py-6">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
