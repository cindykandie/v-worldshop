import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { workshopInputSchema } from "@/lib/validations/workshop";

export async function GET() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { date: "asc" },
  });

  return NextResponse.json(workshops, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = workshopInputSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const workshop = await prisma.workshop.create({
    data: {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      location: data.location,
      price: data.price,
      imageUrl:
        data.imageUrl === ""
          ? null
          : data.imageUrl?.trim()
          ? data.imageUrl.trim()
          : null,
      isPublished: data.isPublished,
    },
  });

  return NextResponse.json(workshop, { status: 201 });
}
