import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { workshopUpdateSchema } from "@/lib/validations/workshop";

function isNotFoundError(error: unknown) {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === "P2025";
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const workshop = await prisma.workshop.findUnique({
    where: { id: params.id },
  });

  if (!workshop) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(workshop, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = workshopUpdateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const updateData: {
    title?: string;
    description?: string;
    date?: Date;
    time?: string;
    location?: string;
    price?: number;
    imageUrl?: string | null;
    isPublished?: boolean;
  } = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.date !== undefined) updateData.date = data.date;
  if (data.time !== undefined) updateData.time = data.time;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.imageUrl !== undefined) {
    updateData.imageUrl = data.imageUrl === "" ? null : data.imageUrl.trim();
  }
  if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

  let workshop;
  try {
    workshop = await prisma.workshop.update({
      where: { id: params.id },
      data: updateData,
    });
  } catch (error: unknown) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }

  return NextResponse.json(workshop, { status: 200 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.workshop.delete({
      where: { id: params.id },
    });
  } catch (error: unknown) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
