import { ResumeStepsOrder } from "@prisma/client";
import { getPrismaClient } from "../../../utils";
import { ResumeStepsSchema } from "./validation";

export const createStepTransactions = ({
  body: { data, step },
  resumeId,
  stepsOrder,
}: ResumeStepsSchema & {
  stepsOrder: ResumeStepsOrder[];
}) => {
  const prisma = getPrismaClient();
  const delegate = prisma[step];

  const currentStepOrder = stepsOrder.find((el) => el.id === step);

  return [
    () => (delegate.deleteMany as any)({ where: { resumeId } }),
    () =>
      (delegate.createMany as any)({
        data: data.map((el) => ({ ...el, resumeId })),
      }),
    () =>
      currentStepOrder
        ? prisma.resume.update({
            data: {
              step: { set: currentStepOrder.order + 1 },
            },
            where: { id: resumeId },
          })
        : Promise.resolve(),
  ];
};
