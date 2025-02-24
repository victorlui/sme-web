import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { ServiceStudentsProps } from "~/service/service";

interface Props {
  data?: ServiceStudentsProps[];
  onSelectitem?: (item: any, type: string) => void;
}

const Table: React.FC<Props> = ({ data, onSelectitem = () => {} }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  return (
    <div className="overflow-auto rounded-lg ">
      <table className="min-w-full">
        <thead className="bg-secondary-color1">
          <tr>
            <th className="px-4 py-2  text-left">ID do atendimento</th>
            <th className="px-4 py-2  text-left">Data do atendimento</th>
            <th className="px-4 py-2  text-left" colSpan={3}>
              Usuário que atendeu
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((service) => (
            <tr
              key={service.id}
              className="border-b border-gray-700 last:border-0"
            >
              <td className="px-4 py-5 ">{service.id}</td>
              <td className="px-4 py-5 ">{formatDate(service.date_service)}</td>
              <td className="px-4 py-5  " width={100} colSpan={3}>
                {service.user.name}
              </td>
              <td className="py-5  flex justify-end ">
                <div className="flex gap-5 justify-end pr-5">
                  <FaEye
                    className="cursor-pointer"
                    size={20}
                    onClick={() => onSelectitem(service, "view")}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-500"
                    size={20}
                    onClick={() => onSelectitem(service, "delete")}
                  />
                  <FaEdit
                    className="cursor-pointer"
                    size={20}
                    onClick={() => onSelectitem(service, "edit")}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
