import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`bg-secondary-color1 p-2 rounded-md border-[0.5px] border-neutral-700   shadow-md flex flex-col gap-5 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
