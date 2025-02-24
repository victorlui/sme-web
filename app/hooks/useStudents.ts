import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  GETAllStudents,
  GETByIdStudent,
  POSTStudents,
} from "~/service/students-service";

export const useStudentsQuery = (
  page: number,
  limit: number,
  search: string
) => {
  return useQuery({
    queryKey: ["students", page, search],
    queryFn: async () => {
      const data = await GETAllStudents({ page, limit: 12, search });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useStudentById = (id: number) => {
  return useQuery({
    queryKey: ["students", id],
    queryFn: async () => {
      const data = await GETByIdStudent(id);

      return data;
    },
  });
};

export const useStudentCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: POSTStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast("Aluno registrado com sucesso", {
        type: "success",
        theme: "colored",
      });
    },
    onError: (error) => {
      toast(error.message, { type: "error", theme: "colored" });
    },
    onSettled(data, error, variables, context) {
      console.log("aqui", data, error, variables, context);
    },
  });
};

// Hook para editar um estudante
// export const useStudentEditMutation = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//       mutationFn: PUTStudent,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["students"] });
//         toast("Aluno atualizado com sucesso", { type: "success", theme: "colored" });
//       },
//       onError: (error) => {
//         toast(error.message, { type: "error", theme: "colored" });
//       },
//     });
//   };

// export const useStudentDeleteMutation = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//       mutationFn: DELETEStudent,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["students"] });
//         toast("Aluno excluído com sucesso", { type: "success", theme: "colored" });
//       },
//       onError: (error) => {
//         toast(error.message, { type: "error", theme: "colored" });
//       },
//     });
//   };
