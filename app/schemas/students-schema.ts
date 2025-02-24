import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  name_of_dad: z.string().min(1, "Campo obrigatório"),
  name_of_mother: z.string().min(1, "Campo obrigatório"),
  ra: z.string().min(1, "Campo obrigatório"),
  serie: z.string().min(1, "Campo obrigatório"),
  date_of_birth: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? "Data inválida" : defaultError,
    }),
  }),
  school_id: z.string().min(1, "Campo obrigatório"),
});

export type StudentSchema = z.infer<typeof studentSchema>;
