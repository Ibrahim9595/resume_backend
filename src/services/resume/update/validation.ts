import { z } from "zod";
import { dateSchema, idSchema } from "../../../utils";
import { createResume } from "../create";
import { paramsSchema, userSchema } from "../utils";

export const updateResume = z
  .object({
    body: z.object({
      templateId: z.number().optional(),
      firstname: z.string().optional(),
      lastname: z.string().optional(),
      email: z.string().email().optional(),
      phone: z
        .string()
        .regex(/^01[0-9]{9}$/)
        .optional(),
      jobTitle: z.string().optional(),
      description: z.string().optional(),
      avatarUrl: z.string().url().optional(),
      dateOfBirth: dateSchema.optional(),
      address: z.string().optional(),
    }),
    user: userSchema,
    paramsSchema,
  })
  .transform(({ paramsSchema, ...rest }) => ({
    ...rest,
    resumeId: paramsSchema.resumeId,
  }));

export type UpdateResumeSchema = z.infer<typeof updateResume>;
