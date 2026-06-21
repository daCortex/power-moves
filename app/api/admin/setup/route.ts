import { NextResponse } from "next/server";
import { hasDb } from "@/app/lib/cms/db";
import { countUsers, createUser } from "@/app/lib/cms/store";
import { signSession, SESSION_COOKIE } from "@/app/lib/cms/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!hasDb()) return NextResponse.json({ error: "Database not configured. Set DATABASE_URL." }, { status: 503 });
  const { username, password } = await req.json().catch(() => ({}));
  if (!username || !password || String(password).length < 8) {
    return NextResponse.json({ error: "Username and a password of 8+ characters are required." }, { status: 400 });
  }
  if ((await countUsers()) > 0) {
    return NextResponse.json({ error: "Setup already complete. Please sign in." }, { status: 409 });
  }
  const user = await createUser(String(username).trim(), String(password), "admin");
  const res = NextResponse.json({ user });
  res.cookies.set(SESSION_COOKIE, signSession(user), {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * 86400,
  });
  return res;
}
