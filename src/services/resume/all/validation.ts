import { z } from "zod";
import { userSchema } from "../utils";

export const readAllResumeSchema = z.object({
  user: userSchema,
});

export type ReadAllResumeSchema = z.infer<typeof readAllResumeSchema>;
