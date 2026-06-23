import crypto from "crypto";

const SESSION_DAYS = 7; // hard cap; the cookie itself is session-scoped (clears on browser close)

function secret() {
  return process.env.AUTH_SECRET || "pm-dev-insecure-secret-change-me";
}

export function hashPassword(pw: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(pw: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const h = crypto.scryptSync(pw, salt, 64).toString("hex");
  const a = Buffer.from(h);
  const b = Buffer.from(hash);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export type SessionUser = { id: number; username: string; role: string; permissions?: string[] };
type TokenPayload = { id: number; username: string; v: number };

/** v = the user's token_version at issue time (bumped to revoke / "kick"). */
export function signSession(p: TokenPayload): string {
  const payload = { ...p, exp: Date.now() + SESSION_DAYS * 86400_000 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token: string | undefined | null): (TokenPayload & { exp: number }) | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expect = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (sig !== expect) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    if (p.exp && Date.now() > p.exp) return null;
    return { id: p.id, username: p.username, v: p.v ?? 0, exp: p.exp };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "pm_session";

/** Cookie options — session-scoped (no maxAge ⇒ cleared when the browser closes). */
export const sessionCookieOpts = {
  httpOnly: true as const,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

/** All controllable content sections (used for per-user permissions). */
export const SECTION_KEYS = [
  "brand", "contact", "nav", "hero", "marquee", "capabilities", "epc",
  "specs", "products", "process", "industries", "standards", "faq", "cta", "footer",
] as const;
