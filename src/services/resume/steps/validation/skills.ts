import { z } from "zod";

export const resumeSkills = z.array(
  z.object({
    name: z.string(),
    position: z.number(),
    experience: z.enum([
      "expert",
      "experienced",
      "skillful",
      "beginner",
      "novice",
    ]),
  })
);

export type ResumeSkillsSchema = z.infer<typeof resumeSkills>;
