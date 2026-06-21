import crypto from "crypto";

const SESSION_DAYS = 7;

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

export type SessionUser = { id: number; username: string; role: string };

export function signSession(user: SessionUser): string {
  const payload = { ...user, exp: Date.now() + SESSION_DAYS * 86400_000 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token: string | undefined | null): SessionUser | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expect = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (sig !== expect) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    if (p.exp && Date.now() > p.exp) return null;
    return { id: p.id, username: p.username, role: p.role };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "pm_session";
