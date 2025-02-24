import React from "react";
import { PiStudent } from "react-icons/pi";
import { LuSchool } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/auth";
import { MdOutlineLogout } from "react-icons/md";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/list-schools");
  };

  return (
    <div className="hidden md:flex md:flex-col md:justify-between md:w-[180px] bg-secondary-color1 border-r-[0.5px] border-neutral-600 fixed top-0  h-full p-5">
      <div className="mb-10 text-center flex flex-col gap-3 items-center justify-center border-b border-gray-500 pb-5">
        <div className="h-16 w-16 overflow-hidden rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-16 w-16 p-5 text-white bg-gray-500 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </div>
        <div>
          <p className="text-neutral-400">Bem vindo(a)</p>
          <h1 className="text-3xl truncate text-ellipsis w-30 text-center">
            {user?.name}
          </h1>
        </div>
      </div>
      <div className="flex-1 flex items-center flex-col gap-5">
        <a href="/escolas" className="flex items-center gap-2 text-[20px]">
          <LuSchool /> Escolas
        </a>
        <a href="/alunos" className="flex items-center gap-2 text-[20px]">
          <PiStudent size={25} />
          Alunos
        </a>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={logout}
          type="button"
          className="bg-transparent cursor-pointer flex items-center gap-2 text-[20px]"
        >
          Sair <MdOutlineLogout size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
