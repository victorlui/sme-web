import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  register: any;
  name: string;
  rules?: any;
  options: { id: string | number; name: string }[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error = "",
  register,
  name,
  rules,
  options,
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col mb-3">
      {label && (
        <label className="font-semibold text-[16px] ml-1 mb-2 text-neutral-100">
          {label}
        </label>
      )}
      <select
        className="border rounded-lg px-3 py-4 text-sm w-full outline-none border-neutral-500 text-neutral-300 placeholder:text-neutral-500"
        {...register(name, rules)}
        {...rest}
      >
        {options.map((option) => (
          <option
            className="text-neutral-700"
            key={option.id}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 mt-1 ml-2 text-[14px]">{error}</p>}
    </div>
  );
};

export default Select;
