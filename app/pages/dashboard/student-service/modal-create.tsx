import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { data, useParams } from "react-router";
import DatePickerInput from "~/components/DatePickerInput";
import Input from "~/components/Input";
import Modal from "~/components/Modal";
import UploadFile from "~/components/UploadFile";
import { useStudentServiceCreateMutation } from "~/hooks/useStudentService";
import { schollSchema } from "~/schemas/scholl-schema";
import {
  StudentServiceSchema,
  studentServiceSchema,
} from "~/schemas/student-service-schema";
import { useAuthStore } from "~/store/auth";

type Props = {
  onClose: () => void;
  serviceData?: {
    id: number;
    date_service: Date;
    reason: string;
    file: string;
  };
};

export default function ModalCreate({ onClose, serviceData }: Props) {
  const { idAluno } = useParams();
  const { user } = useAuthStore();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentServiceSchema>({
    resolver: zodResolver(studentServiceSchema),
    defaultValues: {
      id: serviceData?.id ?? 0,
      user_id: user?.id,
      student_id: Number(idAluno),
      date_service: serviceData?.date_service
        ? new Date(serviceData.date_service)
        : new Date(),
      reason: serviceData?.reason ?? "",
      file: serviceData?.file ?? "",
    },
  });

  const {
    mutate,
    isPending: loadingCreate,
    data: success,
  } = useStudentServiceCreateMutation();

  const dataService = watch();

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  const handlerChangeDate = (date: Date | null) => {
    setValue("date_service", date ?? new Date());
  };

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <Modal
      width="md:w-6/12"
      onSubmit={handleSubmit(onSubmit)}
      title="Realizar atendimento"
      onClose={onClose}
      isLoading={loadingCreate}
    >
      <div className="mb-5 flex justify-end">
        <div>
          <DatePickerInput
            date={dataService.date_service}
            setDate={handlerChangeDate}
            label="Data do atendimento"
            error={errors.date_service?.message}
          />
        </div>
      </div>

      <Input
        textarea
        label="Informe o motivo do atendimento"
        name="reason"
        placeholder="Descreva o motivo do seu atendimento"
        type="text"
        register={register}
        error={errors.reason?.message}
      />
      <UploadFile
        fileUrl={dataService.file}
        funcHandleFileChange={(fileUrl) => setValue("file", fileUrl)}
      />
    </Modal>
  );
}
