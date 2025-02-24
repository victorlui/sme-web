import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import DatePickerInput from "~/components/DatePickerInput";
import Filter from "~/components/Filter";
import Input from "~/components/Input";
import LoadingSkeleton from "~/components/LoadingSkeleton";
import Modal from "~/components/Modal";
import { Pagination } from "~/components/Pagination";
import Select from "~/components/Select";
import { useSchools } from "~/hooks/useSchools";
import {
  useStudentCreateMutation,
  useStudentsQuery,
} from "~/hooks/useStudents";
import DefaultLayout from "~/layout/default-layout";
import { studentSchema, StudentSchema } from "~/schemas/students-schema";
import { StudentsRequest } from "~/service/students-service";

const StudentsPage: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    mutate,
    isPending: loadingCreate,
    data: success,
  } = useStudentCreateMutation();
  const { data, isPending } = useStudentsQuery(currentPage, 20, search);
  const { data: schools, refetch } = useSchools();
  const dataStudent = watch();

  useEffect(() => {
    if (success) {
      setShowModal(false);
    }
  }, [success]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const openModal = () => {
    refetch();
    reset();
    setShowModal(true);
  };

  const handlerChangeDate = (date: Date | null) => {
    setValue("date_of_birth", date ?? new Date());
  };

  const submit = (data: StudentSchema) => {
    mutate(data);
  };

  const initalName = (name: string) => {
    return `${name[0]}`.toUpperCase();
  };

  const handlerService = (student: any) => {
    navigation(`/atendimento/${student.id}`);
  };

  return (
    <DefaultLayout>
      {showModal && (
        <Modal
          width="md:w-5/12"
          title="Novo aluno"
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit(submit)}
          isLoading={loadingCreate}
        >
          <div className="grid md:grid-cols-2 md:gap-y-1 md:gap-x-4">
            <Input
              label="Nome do aluno"
              name="name"
              placeholder="Informe o nome do aluno"
              type="text"
              register={register}
              error={errors.name?.message}
            />
            <DatePickerInput
              date={dataStudent.date_of_birth}
              setDate={handlerChangeDate}
              label="Data de nascimento"
              error={errors.date_of_birth?.message}
            />
            <Input
              label="Nome do pai"
              name="name_of_dad"
              placeholder="Nome do pai completo"
              type="text"
              register={register}
              error={errors.name_of_dad?.message}
            />
            <Input
              label="Nome da mãe"
              name="name_of_mother"
              placeholder="Nome da mãe completo"
              type="text"
              register={register}
              error={errors.name_of_mother?.message}
            />
            <Input
              label="Serie"
              name="serie"
              placeholder="Informe a serie do aluno"
              type="text"
              register={register}
              error={errors.serie?.message}
            />
            <Input
              label="RA"
              name="ra"
              placeholder="Informe o RA do aluno"
              type="text"
              register={register}
              error={errors.ra?.message}
            />
            <Select
              label="Seleciona a escola do aluno"
              name="school_id"
              register={register}
              options={schools?.itens ?? []}
              error={errors.school_id?.message}
            />
          </div>
        </Modal>
      )}
      <Filter title="Alunos" onSearch={handleSearch}>
        <button
          onClick={openModal}
          className="bg-pink px-3 py-3  rounded-md cursor-pointer text-white"
        >
          Adicionar aluno
        </button>
      </Filter>

      {isPending && (
        <div className="grid grid-cols-3 mt-20">
          {Array.from({ length: 3 }).map((_, key) => (
            <LoadingSkeleton key={key} />
          ))}
        </div>
      )}

      {data?.itens?.length === 0 && (
        <div className="mt-20">
          <p>Nenhum aluno encontrado</p>
        </div>
      )}

      <div className="grid grid-cols-3 my-10 gap-4">
        {data?.itens.map((student) => (
          <div
            onClick={() => handlerService(student)}
            className="relative cursor-pointer bg-secondary-color1  rounded-md w-full py-4 px-4 flex flex-col md:flex-row items-start gap-3   "
            key={student.id}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-pink text-white font-semibold text-xl rounded-full">
              {initalName(student.name)}
            </div>
            <div>
              <h1 className="text-[20px] w-42 truncate text-ellipsis">
                {student.name}
              </h1>
              <p className="text-[13px]">RA: {student.ra}</p>
              <p className="text-[13px]">Serie: {student.serie}</p>
            </div>
          </div>
        ))}
      </div>

      {data?.itens && data?.itens?.length > 0 && (
        <Pagination
          totalPages={data?.totalPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </DefaultLayout>
  );
};

export default StudentsPage;
