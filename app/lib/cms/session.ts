import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE, type SessionUser } from "./auth";

export async function getSessionUser(): Promise<SessionUser | null> {
  const c = await cookies();
  return verifySession(c.get(SESSION_COOKIE)?.value);
}
