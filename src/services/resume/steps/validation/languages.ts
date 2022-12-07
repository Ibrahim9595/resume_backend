import { z } from "zod";

export const resumeLanguages = z.array(
  z.object({
    name: z.string(),
    position: z.number(),
    experience: z.enum(["a1", "a2", "b1", "b2", "c1", "c2"]),
  })
);

export type ResumeLanguagesSchema = z.infer<typeof resumeLanguages>;
