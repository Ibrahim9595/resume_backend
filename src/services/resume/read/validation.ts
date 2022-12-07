import { z } from "zod";
import { paramsSchema } from "../utils";

export const readResumeSchema = paramsSchema;

export type ReadResumeSchema = z.infer<typeof readResumeSchema>;
