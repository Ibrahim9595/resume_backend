import { getPrismaClient } from "../../../../utils";
import { CustomSectionItemsSchema } from "./validation";

export const customSectionItemsHandler = ({
  body,
  customSectionId,
}: CustomSectionItemsSchema) => {
  const prisma = getPrismaClient();

  return prisma.$transaction([
    prisma.customSectionItem.deleteMany({
      where: {
        customSectionId,
      },
    }),
    prisma.customSectionItem.createMany({
      data: body.map((el) => ({ ...el, customSectionId })),
    }),
  ]);
};
