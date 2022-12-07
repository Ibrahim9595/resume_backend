import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await Promise.all([
    prisma.template.create({
      data: {
        name: "default",
        url: "",
      },
    }),
    prisma.resumeStepsOrder.createMany({
      data: [
        { id: "education", order: 1 },
        { id: "workExperience", order: 2 },
        { id: "skill", order: 3 },
        { id: "language", order: 4 },
        { id: "socialLink", order: 5 },
        { id: "reference", order: 6 },
        { id: "customSection", order: 7 },
      ],
    }),
  ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
