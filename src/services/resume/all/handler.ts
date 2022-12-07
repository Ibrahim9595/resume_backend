import { getPrismaClient } from "../../../utils";
import { ReadAllResumeSchema } from "./validation";

export const readAllResumeHandler = async ({ user }: ReadAllResumeSchema) => {
  const prisma = getPrismaClient();
  return prisma.resume.findMany({
    where: { userId: user.id },
  });
};
