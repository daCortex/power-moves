import { NextResponse } from "next/server";
import { hasDb } from "@/app/lib/cms/db";
import { authenticate } from "@/app/lib/cms/store";
import { signSession, SESSION_COOKIE } from "@/app/lib/cms/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!hasDb()) return NextResponse.json({ error: "Database not configured. Set DATABASE_URL." }, { status: 503 });
  const { username, password } = await req.json().catch(() => ({}));
  if (!username || !password) return NextResponse.json({ error: "Enter your username and password." }, { status: 400 });
  const user = await authenticate(String(username).trim(), String(password));
  if (!user) return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  const res = NextResponse.json({ user });
  res.cookies.set(SESSION_COOKIE, signSession(user), {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * 86400,
  });
  return res;
}
