import React from "react";
import { InputMask } from "@react-input/mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register: any;
  name: string;
  rules?: any;
  mask?: string;
  textarea?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error = "",
  register,
  name,
  rules,
  mask,
  textarea = false,
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col  mb-3">
      <label className="font-semibold text-[16px] ml-1 mb-2 text-neutral-100">
        {label}
      </label>
      {textarea && (
        <textarea
          rows={10}
          className="border rounded-lg px-3 py-4 text-sm w-full outline-none border-neutral-500 text-neutral-300 placeholder:text-neutral-500"
          {...register(name, rules)}
          {...rest}
        />
      )}

      {!textarea &&
        (mask ? (
          <InputMask
            mask={mask}
            replacement={{ _: /\d/ }}
            className="border rounded-lg px-3 py-4 text-sm w-full outline-none border-gray-300 placeholder:text-neutral-200"
            {...register(name, rules)}
            {...rest}
          />
        ) : (
          <input
            className="border rounded-lg px-3 py-4 text-sm w-full outline-none border-neutral-500 text-neutral-300 placeholder:text-neutral-500"
            {...register(name, rules)}
            {...rest}
          />
        ))}

      {error && <p className="text-red-500 mt-1 ml-2 text-[14px]">{error}</p>}
    </div>
  );
};

export default Input;
