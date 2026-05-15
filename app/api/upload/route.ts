import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File must be under 5 MB" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const slug = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Use Vercel Blob in production, local public/ folder in development
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`workshops/${slug}`, file, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url }, { status: 200 });
  }

  // Local fallback: save to public/workshops/
  const bytes = await file.arrayBuffer();
  const dest = path.join(process.cwd(), "public", "workshops", slug);
  await writeFile(dest, Buffer.from(bytes));
  return NextResponse.json({ url: `/workshops/${slug}` }, { status: 200 });
}
