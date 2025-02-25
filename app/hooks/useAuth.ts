import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth";
import { loginService } from "../service/auth-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const { login: setLogin } = useAuthStore();
  const navigation = useNavigate();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      setLogin(
        {
          id: data.id ?? 0,
          email: data.email,
          name: data.name,
          phone: data.phone ?? "",
        },
        data.token ?? ""
      );
      navigation("/alunos");
    },
    onError: (error) => {
      toast(error.message, { type: "error", theme: "colored" });
    },
  });
};
