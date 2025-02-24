import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { UploadService } from "~/service/upload-file";

export const useUploadHook = () => {
  return useMutation({
    mutationFn: UploadService,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      toast("Erro ao fazer upload do arquivo", {
        type: "error",
        theme: "colored",
      });
    },
  });
};
