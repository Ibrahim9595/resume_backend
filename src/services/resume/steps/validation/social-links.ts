import { z } from "zod";

export const resumeSocialLinks = z.array(
  z.object({
    label: z.string(),
    url: z.string().url(),
  })
);

export type ResumeSocialLinksSchema = z.infer<typeof resumeSocialLinks>;
