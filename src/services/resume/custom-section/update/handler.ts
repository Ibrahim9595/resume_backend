import { getPrismaClient } from "../../../../utils";
import { UpdateCustomSectionSchema } from "./validation";

export const updateCustomSectionHandler = ({
  body: data,
  customSectionId,
}: UpdateCustomSectionSchema) => {
  const prisma = getPrismaClient();
  return prisma.customSection.update({
    data,
    where: {
      id: customSectionId,
    },
  });
};
