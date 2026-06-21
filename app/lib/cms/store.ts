import { sql, hasDb, ensureSchema } from "./db";
import { defaultContent, type SiteContent } from "./schema";
import { hashPassword, verifyPassword, type SessionUser } from "./auth";

/* ---------- content ---------- */
export async function getContent(): Promise<SiteContent> {
  if (!hasDb()) return defaultContent;
  try {
    await ensureSchema();
    const rows = await sql()`select doc from pm_content where id = 1`;
    const doc = rows[0]?.doc as Partial<SiteContent> | undefined;
    return doc ? { ...defaultContent, ...doc } : defaultContent;
  } catch (e) {
    console.error("[cms] getContent failed, using defaults:", e);
    return defaultContent;
  }
}

export async function saveContent(doc: SiteContent): Promise<void> {
  await ensureSchema();
  await sql()`
    insert into pm_content (id, doc, updated_at) values (1, ${JSON.stringify(doc)}::jsonb, now())
    on conflict (id) do update set doc = excluded.doc, updated_at = now()`;
}

/* ---------- users ---------- */
export async function countUsers(): Promise<number> {
  if (!hasDb()) return 0;
  await ensureSchema();
  const r = await sql()`select count(*)::int as n from pm_users`;
  return r[0]?.n ?? 0;
}

export async function createUser(username: string, password: string, role = "editor"): Promise<SessionUser> {
  await ensureSchema();
  const hash = hashPassword(password);
  const r = await sql()`
    insert into pm_users (username, password_hash, role) values (${username}, ${hash}, ${role})
    returning id, username, role`;
  return r[0] as SessionUser;
}

export async function listUsers() {
  await ensureSchema();
  return sql()`select id, username, role, created_at from pm_users order by id`;
}

export async function authenticate(username: string, password: string): Promise<SessionUser | null> {
  await ensureSchema();
  const r = await sql()`select * from pm_users where username = ${username}`;
  const u = r[0];
  if (!u) return null;
  if (!verifyPassword(password, u.password_hash as string)) return null;
  return { id: u.id as number, username: u.username as string, role: u.role as string };
}
