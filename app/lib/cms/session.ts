import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE, type SessionUser } from "./auth";
import { getAuthUser } from "./store";

/** Validates the cookie signature AND the live token_version in the DB, so a
 *  kicked user (token_version bumped) or a deleted user is rejected immediately.
 *  Returns fresh role + permissions from the DB. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const c = await cookies();
  const tok = verifySession(c.get(SESSION_COOKIE)?.value);
  if (!tok) return null;
  try {
    const u = await getAuthUser(tok.id);
    if (!u || u.token_version !== tok.v) return null;
    return { id: u.id, username: u.username, role: u.role, permissions: u.permissions ?? [] };
  } catch {
    return null;
  }
}

export function isAdmin(u: SessionUser | null): boolean {
  return !!u && u.role === "admin";
}

export function canEdit(u: SessionUser | null, section: string): boolean {
  if (!u) return false;
  if (u.role === "admin") return true;
  return (u.permissions ?? []).includes(section);
}
