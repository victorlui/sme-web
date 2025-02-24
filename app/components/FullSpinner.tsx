import React from "react";

const FullSpinner: React.FC = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-gray-500  opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <div className="rounded-full h-20 w-20 bg-sky-700 animate-ping"></div>
      </div>
    </div>
  );
};

export default FullSpinner;
