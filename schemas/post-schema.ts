import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "O título deve possuir no mínimo 3 caracteres"),
  body: z.string().min(10, "O conteúdo deve possuir no mínimo 10 caracteres"),
});

export type PostFormData = z.infer<typeof postSchema>;
