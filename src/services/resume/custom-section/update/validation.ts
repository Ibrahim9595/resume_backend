import { z } from "zod";
import { idSchema } from "../../../../utils";
import { userSchema } from "../../utils";

export const updateCustomSectionSchema = z
  .object({
    body: z.object({
      title: z.string(),
    }),
    user: userSchema,
    params: z.object({
      resumeId: idSchema,
      customSectionId: z.string(),
    }),
  })
  .transform(({ params, ...rest }) => ({
    ...rest,
    resumeId: params.resumeId,
    customSectionId: params.customSectionId,
  }));

export type UpdateCustomSectionSchema = z.infer<
  typeof updateCustomSectionSchema
>;
