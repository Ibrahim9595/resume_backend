import { z } from "zod";

export const registrationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export type RegisterSchema = z.infer<typeof registrationSchema>;
