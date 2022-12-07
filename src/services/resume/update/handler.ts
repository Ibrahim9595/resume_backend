import { getPrismaClient } from "../../../utils";
import { UpdateResumeSchema } from "./validation";

export const updateResumeHandler = async ({
  body: data,
  resumeId,
}: UpdateResumeSchema) => {
  const prisma = getPrismaClient();
  return await prisma.resume.update({
    data,
    where: {
      id: resumeId,
    },
  });
};
