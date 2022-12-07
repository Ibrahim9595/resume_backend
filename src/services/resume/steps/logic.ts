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
        ? // This is a workaround to avoid doing 2 requests (1 to get the resume counts in order to check the step condition and one to update the step)
          prisma.$queryRaw`update "Resume" set step=${currentStepOrder.order} + 1 where step <= ${currentStepOrder.order} and "Resume".id=${resumeId}`
        : Promise.resolve(),
  ];
};

// Alternative approach to the raw query
// prisma.resume
// .findFirst({
//   where: { id: resumeId },
// })
// .then((resume) => {
//   if (!resume) return;
//   return prisma.resume.update({
//     data: {
//       step: { set: currentStepOrder.order + 1 },
//     },
//     where: { id: resumeId },
//   });
// })
