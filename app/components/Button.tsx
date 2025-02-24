import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}
const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <button
      {...rest}
      className="flex mt-5 flex-row items-center justify-center w-full px-4 py-4  text-sm font-bold bg-sky-700 text-white leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer  mb-0   hover:shadow-lg hover:-translate-y-1"
    >
      {label}
      <span className="ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-current"
        >
          <path
            fill="currentColor"
            d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"
          ></path>
        </svg>
      </span>
    </button>
  );
};

export default Button;
