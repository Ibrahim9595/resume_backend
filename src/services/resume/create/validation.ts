import { z } from "zod";
import { dateSchema } from "../../../utils/zod-utils";
import { userSchema } from "../utils";

export const createResume = z.object({
  body: z.object({
    templateId: z.number(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    phone: z.string().regex(/^01[0-9]{9}$/),
    jobTitle: z.string(),
    description: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    dateOfBirth: dateSchema.optional(),
    address: z.string().optional(),
  }),
  user: userSchema,
});

export type CreateResumeSchema = z.infer<typeof createResume>;
