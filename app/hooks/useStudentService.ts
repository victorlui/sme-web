import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  DeleteStudentService,
  GETAllStudentsService,
  POSTServiceStudents,
} from "~/service/service";

export const useStudentsServiceQuery = (
  page: number,
  limit: number,
  idStudent: any,
  selectedDate: Date | null
) => {
  return useQuery({
    queryKey: ["students-service", page, selectedDate],
    queryFn: async () => {
      const data = await GETAllStudentsService({
        page,
        limit: 10,
        idStudent,
        selectedDate,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useStudentServiceCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: POSTServiceStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students-service"] });
      toast("Atendimento salvo com sucesso", {
        type: "success",
        theme: "colored",
      });
    },
    onError: (error) => {
      toast(error.message, { type: "error", theme: "colored" });
    },
  });
};

export const useStudentServiceDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteStudentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students-service"] });
      toast("Atendimento deletado com sucesso", {
        type: "success",
        theme: "colored",
      });
    },
    onError: (error) => {
      toast("Erro ao deletar atendimento", { type: "error", theme: "colored" });
    },
  });
};
