import { z } from "zod";

export const resumeReferences = z.array(
  z.object({
    fullname: z.string(),
    company: z.string(),
    phone: z.string(),
    email: z.string().email(),
  })
);

export type ResumeReferencesSchema = z.infer<typeof resumeReferences>;
