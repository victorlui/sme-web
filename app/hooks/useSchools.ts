import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  GETSchoolsService,
  POSTSchoolService,
} from "~/service/schools-service";

export const useSchools = (
  page: number = 1,
  limit: number = 1000,
  search: string = ""
) => {
  return useQuery({
    queryKey: ["schools", page, search],
    queryFn: async () => {
      const data = await GETSchoolsService({ page, limit, search });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useSchoolsPOST = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: POSTSchoolService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toast("Dados salvo com sucesso", { type: "success", theme: "colored" });
    },
    onError: (error) => {
      toast(error.message, { type: "error", theme: "colored" });
    },
  });
};
