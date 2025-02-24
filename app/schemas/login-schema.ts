import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "E-mail obrigatório" })
    .email("E-mail inválido"),
  password: z
    .string({
      message: "Senha obrigatório",
    })
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z
      .string({ required_error: "E-mail obrigatório" })
      .email("E-mail inválido"),
    phone: z
      .string()
      .min(11, "Telefone inválido")
      .regex(
        /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/,
        "Número de celular inválido. Ex: (11) 98765-4321"
      )
      .optional(),
    password: z
      .string({
        message: "Senha obrigatório",
      })
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação da senha obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
