import { z } from "zod";
import { idSchema } from "../../../../utils";
import { userSchema } from "../../utils";

export const createCustomSectionSchema = z
  .object({
    body: z.object({
      title: z.string(),
    }),
    user: userSchema,
    params: z.object({
      resumeId: idSchema,
    }),
  })
  .transform(({ params, ...rest }) => ({ ...rest, resumeId: params.resumeId }));

export type CreateCustomSectionSchema = z.infer<
  typeof createCustomSectionSchema
>;
