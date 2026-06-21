import { NextResponse } from "next/server";
import { listUsers, createUser } from "@/app/lib/cms/store";
import { getSessionUser } from "@/app/lib/cms/session";
import { hasDb } from "@/app/lib/cms/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ users: await listUsers() });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDb()) return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  const { username, password, role } = await req.json().catch(() => ({}));
  if (!username || !password || String(password).length < 8) {
    return NextResponse.json({ error: "Username and 8+ char password required." }, { status: 400 });
  }
  try {
    const created = await createUser(String(username).trim(), String(password), role === "admin" ? "admin" : "editor");
    return NextResponse.json({ user: created });
  } catch (e) {
    const msg = (e as Error).message?.includes("unique") ? "That username is taken." : "Could not create user.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
