import { NextResponse } from "next/server";
import { listUsers, createUser, updateUser, kickUser, deleteUser } from "@/app/lib/cms/store";
import { getSessionUser, isAdmin } from "@/app/lib/cms/session";
import { hasDb } from "@/app/lib/cms/db";
import { SECTION_KEYS } from "@/app/lib/cms/auth";

export const dynamic = "force-dynamic";

function cleanPerms(p: unknown): string[] {
  if (!Array.isArray(p)) return [];
  return p.filter((x) => (SECTION_KEYS as readonly string[]).includes(x));
}

export async function GET() {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ users: await listUsers(), sections: SECTION_KEYS });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!hasDb()) return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  const { username, password, role, permissions } = await req.json().catch(() => ({}));
  if (!username || !password || String(password).length < 8) {
    return NextResponse.json({ error: "Username and 8+ char password required." }, { status: 400 });
  }
  try {
    const created = await createUser(String(username).trim(), String(password), role === "admin" ? "admin" : "editor", cleanPerms(permissions));
    return NextResponse.json({ user: created });
  } catch (e) {
    const msg = (e as Error).message?.includes("unique") ? "That username is taken." : "Could not create user.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  const me = await getSessionUser();
  if (!isAdmin(me)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id, action, role, permissions } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  try {
    if (action === "kick") {
      await kickUser(Number(id));
    } else {
      await updateUser(Number(id), {
        role: role === "admin" || role === "editor" ? role : undefined,
        permissions: permissions !== undefined ? cleanPerms(permissions) : undefined,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const me = await getSessionUser();
  if (!isAdmin(me)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await req.json().catch(() => ({}));
  if (!id || (me && Number(id) === me.id)) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  await deleteUser(Number(id));
  return NextResponse.json({ ok: true });
}
