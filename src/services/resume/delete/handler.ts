import { getPrismaClient } from "../../../utils";
import { DeleteResumeSchema } from "./validation";

export const deleteResumeHandler = async ({ resumeId }: DeleteResumeSchema) => {
  const prisma = getPrismaClient();
  return prisma.resume.delete({
    where: { id: resumeId },
  });
};
