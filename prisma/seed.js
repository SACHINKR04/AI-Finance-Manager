import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { clerkUserId: "user_31jBn6pwNO3XgCtLXZavadzwJBs" }, // unique constraint
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      clerkUserId: "user_31jBn6pwNO3XgCtLXZavadzwJBs",
    },
  });
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
