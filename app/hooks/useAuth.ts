import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth";
import { loginService } from "../service/auth-service";
import { toast } from "react-toastify";

export const useAuth = () => {
  const { login: setLogin } = useAuthStore();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      console.log(data);

      setLogin(
        {
          id: data.id ?? 0,
          email: data.email,
          name: data.name,
          phone: data.phone ?? "",
        },
        data.token ?? ""
      );
    },
    onError: (error) => {
      toast(error.message, { type: "error", theme: "colored" });
    },
  });
};
