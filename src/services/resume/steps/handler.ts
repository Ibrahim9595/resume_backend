import { getPrismaClient } from "../../../utils";
import { ResumeStepsSchema } from "./validation";
import { createStepTransactions } from "./logic";

export const resumeStepHandler = async ({
  user,
  body,
  resumeId,
}: ResumeStepsSchema) => {
  const prisma = getPrismaClient();
  const stepsOrder = await prisma.resumeStepsOrder.findMany({
    orderBy: {
      order: "asc",
    },
  });

  const transactions = createStepTransactions({
    user,
    body,
    resumeId,
    stepsOrder,
  });

  return prisma.$transaction(transactions.map((fn) => fn()));
};
