import React, { useState } from "react";
import Filter from "~/components/Filter";
import Input from "~/components/Input";
import Modal from "~/components/Modal";
import DefaultLayout from "~/layout/default-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSchools, useSchoolsPOST } from "~/hooks/useSchools";
import { schollSchema, SchollSchema } from "~/schemas/scholl-schema";
import { Pagination } from "~/components/Pagination";
import { LuSchool } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import LoadingSkeleton from "~/components/LoadingSkeleton";

const ListSchoolsPage: React.FC = () => {
  const { register, watch, setValue } = useForm<SchollSchema>({
    resolver: zodResolver(schollSchema),
  });

  const schoolsQuery = useSchoolsPOST();
  const name = watch("name");
  const [erros, setErros] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, refetch, isPending } = useSchools(currentPage, 10, search);

  const onSubmit = () => {
    if (!name) {
      setErros("Nome obrigatório");
      return;
    }

    schoolsQuery.mutate(name);
    setShowModal(false);
    setValue("name", "");
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    refetch(); // Chama a busca sempre que o usuário parar de digitar
  };

  return (
    <DefaultLayout>
      {showModal && (
        <Modal
          onSubmit={onSubmit}
          title="Adicionar escola"
          isLoading={schoolsQuery.isPending}
          onClose={() => setShowModal(false)}
        >
          <Input
            label="Nome da escola"
            name="name"
            placeholder="Nome da escola"
            type="text"
            register={register}
            error={erros}
            className="border border-neutral-500 rounded-md p-3 text-neutral-300 placeholder:text-neutral-300"
          />
        </Modal>
      )}
      <Filter title="Escolas" onSearch={handleSearch}>
        <button
          onClick={() => setShowModal(true)}
          className="bg-pink px-3 py-3  rounded-md cursor-pointer text-white"
        >
          Adicionar escola
        </button>
      </Filter>
      {isPending && (
        <div className="grid grid-cols-3 mt-20">
          {Array.from({ length: 3 }).map((_, key) => (
            <LoadingSkeleton key={key} />
          ))}
        </div>
      )}
      <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-3 mt-10">
        {data?.itens.map((s) => (
          <div
            key={s.id}
            className="bg-secondary-color1  rounded-md w-full p-5 flex items-center justify-between gap-3 "
          >
            <LuSchool className="text-neutral-200" size={30} />
            <div className="flex-1">
              <h1 className="text-neutral-400 ">Escola:</h1>
              <p className="font-semibold text-neutral-200">{s.name}</p>
            </div>
            <div>
              <MdDelete size={27} color="#FF5A65" className="cursor-pointer" />
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

      {/* {data?.itens && data.itens.length === 0 && !isPending && (
        <div>
          <LuSchool className="text-neutral-200" size={30} />
        </div>
      )} */}
    </DefaultLayout>
  );
};

export default ListSchoolsPage;
