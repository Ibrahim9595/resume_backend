import { z } from "zod";
import { idSchema } from "../../../../utils";
import { paramsSchema, userSchema } from "../../utils";
import { resumeEducationSchema } from "./education";
import { resumeWorkExperience } from "./experience";
import { resumeLanguages } from "./languages";
import { resumeReferences } from "./references";
import { resumeSkills } from "./skills";
import { resumeSocialLinks } from "./social-links";

export const resumeSteps = z.union([
  z.object({
    step: z.enum(["education"]),
    data: resumeEducationSchema,
  }),
  z.object({
    step: z.enum(["workExperience"]),
    data: resumeWorkExperience,
  }),
  z.object({
    step: z.enum(["language"]),
    data: resumeLanguages,
  }),
  z.object({
    step: z.enum(["reference"]),
    data: resumeReferences,
  }),
  z.object({
    step: z.enum(["skill"]),
    data: resumeSkills,
  }),
  z.object({
    step: z.enum(["socialLink"]),
    data: resumeSocialLinks,
  }),
]);

export const resumeStepsSchema = z
  .object({
    body: resumeSteps,
    user: userSchema,
    params: z.object({ resumeId: idSchema }),
  })
  .transform(({ params, ...rest }) => ({ ...rest, resumeId: params.resumeId }));

export type ResumeStepsSchema = z.infer<typeof resumeStepsSchema>;
export type ResumeStepNames = ResumeStepsSchema["body"]["step"];
