import { getPrismaClient } from "../../../utils";
import { ReadResumeSchema } from "./validation";

export const readResumeHandler = async ({ resumeId }: ReadResumeSchema) => {
  const prisma = getPrismaClient();
  return prisma.resume.findFirst({
    include: {
      education: true,
      languages: true,
      customSections: {
        include: {
          CustomSectionItem: true,
        },
      },
      references: true,
      skills: true,
      socialLinks: true,
      template: true,
      workExperience: true,
    },
    where: { id: resumeId },
  });
};
