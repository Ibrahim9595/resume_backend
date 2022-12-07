import { getPrismaClient } from "../../../../utils";
import { CreateCustomSectionSchema } from "./validation";

export const createCustomSectionHandler = ({
  body,
  resumeId,
}: CreateCustomSectionSchema) => {
  const prisma = getPrismaClient();
  return prisma.customSection.create({
    data: {
      ...body,
      resumeId,
    },
  });
};
