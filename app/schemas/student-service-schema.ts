import { z } from "zod";

export const studentServiceSchema = z.object({
  id: z.number(),
  reason: z.string().min(1, "Motivo do atendimento obrigatório"),
  file: z.string(),
  student_id: z.number(),
  user_id: z.number(),
  date_service: z.date(),
});

export type StudentServiceSchema = z.infer<typeof studentServiceSchema>;
