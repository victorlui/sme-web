import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ImFileText2 } from "react-icons/im";
import { toast } from "react-toastify";
import Table from "~/components/Table";
import { useStudentById } from "~/hooks/useStudents";
import {
  useStudentServiceDeleteMutation,
  useStudentsServiceQuery,
} from "~/hooks/useStudentService";
import DefaultLayout from "~/layout/default-layout";
import ModalCreate from "./modal-create";
import FullSpinner from "~/components/FullSpinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalView from "./modal-view";
import DatePickerInput from "~/components/DatePickerInput";
import { Pagination } from "~/components/Pagination";

const StudentServicePage: React.FC = () => {
  const { idAluno } = useParams();
  const { data, isError, isPending } = useStudentById(Number(idAluno));
  const { mutate } = useStudentServiceDeleteMutation();
  const [modalCreateService, setModalCreateService] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [serviceData, setServiceData] = useState<any>();
  const [viewData, setViewData] = useState<any>();
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: student_service, isPending: loading_list } =
    useStudentsServiceQuery(currentPage, 10, idAluno, dateFilter);

  const openModal = () => {
    setServiceData(null);
    setModalCreateService(true);
  };

  const handleItem = (item: any, type: string) => {
    if (type === "delete") {
      withReactContent(Swal)
        .fire({
          title: `Deseja deletar o atendimento ${item.id}`,
          confirmButtonColor: "red",
          showCancelButton: true,
          confirmButtonText: "Deletar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            mutate(item.id);
          }
        });
      return;
    }

    if (type === "edit") {
      setServiceData({
        id: item.id,
        date_service: item.date_service,
        reason: item.reason,
        file: item.file,
      });
      setModalCreateService(true);
      return;
    }

    if (type === "view") {
      setViewData({
        id: item.id,
        date_service: item.date_service,
        reason: item.reason,
        file: item.file,
        user: item.user.name,
      });
      setModalView(true);
    }
  };

  const handlerChangeDate = (date: Date | null) => {
    setDateFilter(date ?? new Date());
    setCurrentPage(1);
  };

  return (
    <DefaultLayout>
      {isPending && loading_list && <FullSpinner />}
      {modalCreateService && (
        <ModalCreate
          serviceData={serviceData}
          onClose={() => setModalCreateService(false)}
        />
      )}

      {modalView && (
        <ModalView service={viewData} onClose={() => setModalView(false)} />
      )}
      <div className="bg-secondary-color1 rounded-md p-5  flex gap-3 justify-between ">
        <div>
          <p className="text-neutral-500">Aluno</p>
          <p className="text-[22px]">{data?.name}</p>
        </div>
        <div>
          <p className="text-neutral-500">RA</p>
          <p className="text-[22px]">{data?.ra}</p>
        </div>
        <div>
          <p className="text-neutral-500">Série</p>
          <p className="text-[22px]">{data?.serie}</p>
        </div>
        <div>
          <p className="text-neutral-500">Escola</p>
          <p className="text-[22px]">{data?.school.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between my-8">
        <h2 className=" text-[22px]">Atendimentos realizados</h2>
        <button
          type="button"
          onClick={openModal}
          className="bg-pink px-3 py-3  rounded-md cursor-pointer text-white"
        >
          Realizar atendimento
        </button>
      </div>

      <div className="my-5 flex flex-row items-center ">
        <div className="w-40">
          <DatePickerInput
            date={dateFilter}
            setDate={handlerChangeDate}
            label="Filtrar por data"
          />
        </div>

        <button
          className="mx-5 mt-5 cursor-pointer"
          onClick={() => {
            setDateFilter(null);
            setCurrentPage(1);
          }}
        >
          Limpar filtro
        </button>
      </div>

      {student_service?.itens.length === 0 && (
        <div className="flex flex-col gap-5 items-center text-center mt-30">
          <ImFileText2 size={100} className="text-neutral-500" />
          <h1 className="text-3xl">Nenhum atendimento realizado</h1>
        </div>
      )}

      {student_service && student_service?.itens.length > 0 && (
        <Table
          data={student_service.itens}
          onSelectitem={(item: any, type: string) => handleItem(item, type)}
        />
      )}

      {student_service?.itens && student_service?.itens?.length > 0 && (
        <Pagination
          totalPages={student_service?.totalPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </DefaultLayout>
  );
};

export default StudentServicePage;
