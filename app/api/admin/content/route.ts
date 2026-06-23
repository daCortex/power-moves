import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/app/lib/cms/store";
import { getSessionUser } from "@/app/lib/cms/session";
import { hasDb } from "@/app/lib/cms/db";
import { SECTION_KEYS } from "@/app/lib/cms/auth";
import type { SiteContent } from "@/app/lib/cms/schema";

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
  const body = (await req.json().catch(() => null)) as SiteContent | null;
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid content" }, { status: 400 });

  try {
    let toSave = body;
    // Editors may only persist sections they're permitted to edit.
    if (user.role !== "admin") {
      const allowed = new Set(user.permissions ?? []);
      const current = await getContent("en");
      const merged = { ...current } as Record<string, unknown>;
      for (const key of SECTION_KEYS) {
        if (allowed.has(key) && key in (body as Record<string, unknown>)) {
          merged[key] = (body as Record<string, unknown>)[key];
        }
      }
      toSave = merged as SiteContent;
    }
    await saveContent(toSave);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Save failed: " + (e as Error).message }, { status: 500 });
  }
}
