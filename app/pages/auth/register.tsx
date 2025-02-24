import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "../../schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "../../service/auth-service";
import { toast } from "react-toastify";
import FullSpinner from "../../components/FullSpinner";
import { useNavigate } from "react-router";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      toast("Conta criada com sucesso", {
        type: "success",
        theme: "colored",
      });
      navigate("/login");
    },
    onError: (error) => {
      toast(error.message, { type: "error", theme: "colored" });
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col m-5 md:m-0 items-center justify-center md:h-screen ">
      {isPending && <FullSpinner />}
      <Card className="p-5 w-[99%] md:w-[50%]">
        <div>
          <h1 className="m-0 text-[22px] font-bold ">Criar nova conta</h1>
          <p className="text-[#8F9BA3]">
            Insira seus dados abaixo para criar sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            name="name"
            placeholder="Informe seu nome"
            register={register}
            error={errors.name?.message}
          />
          <div className="grid md:grid-cols-2 gap-3">
            <Input
              mask="(__) _____-____"
              label="Telefone"
              name="phone"
              placeholder="Informe seu telefone"
              register={register}
              error={errors.phone?.message}
            />
            <Input
              label="E-mail"
              name="email"
              placeholder="Informe seu e-mail"
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Input
              label="Senha"
              name="password"
              placeholder="Informe sua senha"
              register={register}
              error={errors.password?.message}
              type="password"
            />
            <Input
              label="Confirme sua senha"
              name="confirmPassword"
              placeholder="Confrirme sua senha"
              register={register}
              error={errors.confirmPassword?.message}
              type="password"
            />
          </div>

          <Button label="Criar conta" type="submit" />
        </form>
        <div className="text-center ">
          <div className="inline-block text-sm  align-baseline ">
            Ja tem uma conta ?{" "}
            <a
              className="inline-block text-sm  align-baseline hover:text-[#0d5179]"
              href="login"
            >
              Entrar{" "}
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
