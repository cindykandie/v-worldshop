import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin12345", 12);

  await prisma.adminUser.upsert({
    where: { email: "admin@vaginaworldshop.com" },
    update: {
      passwordHash,
      name: "VWS Admin",
      role: "admin",
    },
    create: {
      email: "admin@vaginaworldshop.com",
      passwordHash,
      name: "VWS Admin",
      role: "admin",
    },
  });

  await prisma.workshop.createMany({
    data: [
      {
        title: "Twerk Out: Power & Pulse",
        description:
          "An energizing twerk session focused on grounding, stamina, and joyful release. All levels welcome.",
        date: new Date("2026-04-12T00:00:00.000Z"),
        time: "6:30 PM - 8:00 PM",
        location: "Nairobi Dance Loft",
        price: 2500,
        imageUrl: "/dancelogo.jpg",
        isPublished: true,
      },
      {
        title: "Soft Power Flow",
        description:
          "A slow, sensual movement class exploring breath, hips, and soft embodiment practices.",
        date: new Date("2026-04-19T00:00:00.000Z"),
        time: "5:00 PM - 6:30 PM",
        location: "The Vagina Worldshop Studio",
        price: 2200,
        imageUrl: "/dancelogo.jpg",
        isPublished: true,
      },
      {
        title: "Twerk Out: Foundations",
        description:
          "Beginner-friendly twerk foundations with posture, rhythm, and playful choreography.",
        date: new Date("2026-04-26T00:00:00.000Z"),
        time: "4:00 PM - 5:30 PM",
        location: "Nairobi Dance Loft",
        price: 2000,
        imageUrl: "/dancelogo.jpg",
        isPublished: true,
      },
    ],
    skipDuplicates: true,
  });

  // Example verification query:
  // const workshops = await prisma.workshop.findMany();
  // console.log(workshops);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
