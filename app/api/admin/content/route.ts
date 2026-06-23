import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/app/lib/cms/store";
import { getSessionUser } from "@/app/lib/cms/session";
import { hasDb } from "@/app/lib/cms/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ content: await getContent("en") });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDb()) return NextResponse.json({ error: "Database not configured. Set DATABASE_URL to save." }, { status: 503 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  try {
    await saveContent(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Save failed: " + (e as Error).message }, { status: 500 });
  }
}
