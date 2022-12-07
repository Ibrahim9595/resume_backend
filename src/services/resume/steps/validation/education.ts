import { z } from "zod";
import { dateSchema } from "../../../../utils/zod-utils";

export const resumeEducationSchema = z.array(
  z
    .object({
      school: z.string(),
      degree: z.string(),
      startDate: dateSchema,
      endDate: dateSchema,
      description: z.string(),
    })
    .refine((schema) => schema.startDate.getTime() < schema.endDate.getTime())
);

export type ResumeEducationSchema = z.infer<typeof resumeEducationSchema>;
