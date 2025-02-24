import { z } from "zod";

export const schollSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
});

export type SchollSchema = z.infer<typeof schollSchema>;
