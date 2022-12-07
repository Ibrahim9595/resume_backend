import { z } from "zod";
import { idSchema } from "../../../utils";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email(),
});
export type UserSchema = z.infer<typeof userSchema>;

export const paramsSchema = z
  .object({
    params: z.object({ resumeId: idSchema }),
  })
  .transform(({ params }) => ({ resumeId: params.resumeId }));
