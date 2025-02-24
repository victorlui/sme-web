import React from "react";

import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import FullSpinner from "../../components/FullSpinner";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useAuth();

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <>
      <div className="bg-neutral-800 flex flex-col items-center justify-center h-screen">
        {isPending && <FullSpinner />}
        <Card className="w-[90%] sm:w-[30%] xl:w-[15%]  p-5">
          <div>
            <p className="m-0 text-[22px] font-bold text-neutral-100 ">Login</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="E-mail"
              name="email"
              placeholder="Informe seu E-mail"
              register={register}
              error={errors.email?.message}
            />

            <Input
              label="Senha"
              placeholder="Informe a sua senha"
              type="password"
              name="password"
              register={register}
              error={errors.password && errors.password.message}
            />

            <Button label="ENTRAR" type="submit" />

            <div className="text-center mt-5">
              <div className="inline-block text-sm  align-baseline text-neutral-100 ">
                Não tem uma conta ?{" "}
                <a
                  className="inline-block text-sm align-baseline hover:text-[#0d5179]"
                  href="register"
                >
                  Registre-se aqui{" "}
                </a>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
