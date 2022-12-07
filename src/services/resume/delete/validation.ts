import { z } from "zod";
import { paramsSchema } from "../utils";

export const deleteResumeSchema = paramsSchema;

export type DeleteResumeSchema = z.infer<typeof deleteResumeSchema>;
