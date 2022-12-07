import { getPrismaClient } from "../../../utils";
import { CreateResumeSchema } from "./validation";

export const createResumeHandler = async ({
  body,
  user,
}: CreateResumeSchema) => {
  const prisma = getPrismaClient();
  return await prisma.resume.create({
    data: {
      ...body,
      userId: user.id,
    },
  });
};
