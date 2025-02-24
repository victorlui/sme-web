import React, { useCallback, useState } from "react";
import _ from "lodash";
import { IoSearchSharp } from "react-icons/io5";

interface Props {
  title: string;
  children: React.ReactNode;
  onSearch?: (value: string) => void;
}

const Filter: React.FC<Props> = ({ title, children, onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    _.debounce((value: string) => {
      if (onSearch) onSearch(value);
    }, 1000),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // Atualiza o input

    if (value.trim() === "") {
      // Se o campo estiver vazio, chama a busca imediatamente
      if (onSearch) onSearch("");
    } else {
      // Se houver texto, aplica debounce
      handleSearch(value);
    }
  };
  return (
    <div className="flex flex-col md:flex-row md:flex md:items-center md:justify-between gap-4 md:gap-0 ">
      <div className="order-2  flex items-start  flex-col gap-2 md:order-1 md:flex-row md:items-center md:gap-6">
        <h1 className="text-neutral-100 text-2xl">{title}</h1>
        <div className="bg-secondary-color1 flex items-center border border-secondary-color4 pl-3 rounded-md w-full md:w-auto ">
          <IoSearchSharp className="text-neutral-500 " size={20} />
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            className="placeholder:text-neutral-500 h-full p-3 text-neutral-200 w-60 outline-0"
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="order-1 ">{children}</div>
    </div>
  );
};

export default Filter;
