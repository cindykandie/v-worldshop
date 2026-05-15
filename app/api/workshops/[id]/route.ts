import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { workshopUpdateSchema } from "@/lib/validations/workshop";

type RouteContext = { params: Promise<{ id: string }> };

function isNotFoundError(error: unknown) {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === "P2025";
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    });

    if (!workshop) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(workshop, { status: 200 });
  } catch (error) {
    console.error("[GET /api/workshops/:id]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

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
    bookingUrl?: string | null;
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
  if (data.bookingUrl !== undefined) {
    updateData.bookingUrl = data.bookingUrl === "" ? null : data.bookingUrl.trim();
  }
  if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

  try {
    const workshop = await prisma.workshop.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(workshop, { status: 200 });
  } catch (error: unknown) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("[PATCH /api/workshops/:id]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await prisma.workshop.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("[DELETE /api/workshops/:id]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
