import { z } from "zod";
import { dateSchema } from "../../../../utils";

export const resumeWorkExperience = z.array(
  z
    .object({
      title: z.string(),
      employer: z.string(),
      startDate: dateSchema,
      endDate: dateSchema.optional(),
      current: z.boolean().optional(),
      description: z.string().optional(),
    })
    .refine((schema) =>
      schema.endDate
        ? schema.startDate.getTime() < schema.endDate?.getTime()
        : true
    )
);

export type ResumeWorkExperienceSchema = z.infer<typeof resumeWorkExperience>;
