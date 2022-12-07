import { z } from "zod";
import { dateSchema, idSchema } from "../../../../utils/zod-utils";
import { userSchema } from "../../utils";

export const customSectionItemsSchema = z
  .object({
    body: z.array(
      z
        .object({
          title: z.string(),
          description: z.string().optional(),
          startDate: dateSchema.optional(),
          endDate: dateSchema.optional(),
        })
        .refine((schema) =>
          schema.startDate && schema.endDate
            ? schema.startDate.getTime() < schema.endDate.getTime()
            : true
        )
    ),
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

export type CustomSectionItemsSchema = z.infer<typeof customSectionItemsSchema>;
