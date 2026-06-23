import { sql, hasDb, ensureSchema } from "./db";
import { defaultContent, type SiteContent } from "./schema";
import { hashPassword, verifyPassword } from "./auth";
import { getLocale, deepMerge, overrides, type Locale } from "./locales";

/* ---------- content ---------- */
async function getEnglishBase(): Promise<SiteContent> {
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

/** Locale-aware content. Defaults to the request's cookie locale; pass "en"
 *  explicitly (e.g. the admin) to always get the editable English base. */
export async function getContent(localeArg?: Locale): Promise<SiteContent> {
  const base = await getEnglishBase();
  const locale = localeArg ?? (await getLocale());
  if (locale === "en") return base;
  return deepMerge(base, overrides[locale]);
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

export type AuthUser = { id: number; username: string; role: string; permissions: string[]; token_version: number };

export async function createUser(username: string, password: string, role = "editor", permissions: string[] = []): Promise<AuthUser> {
  await ensureSchema();
  const hash = hashPassword(password);
  const r = await sql()`
    insert into pm_users (username, password_hash, role, permissions)
    values (${username}, ${hash}, ${role}, ${JSON.stringify(permissions)}::jsonb)
    returning id, username, role, permissions, token_version`;
  return r[0] as AuthUser;
}

export async function listUsers(): Promise<AuthUser[]> {
  await ensureSchema();
  return (await sql()`select id, username, role, permissions, token_version, created_at from pm_users order by id`) as AuthUser[];
}

/** Fresh role/permissions/version for session validation. */
export async function getAuthUser(id: number): Promise<AuthUser | null> {
  await ensureSchema();
  const r = await sql()`select id, username, role, permissions, token_version from pm_users where id = ${id}`;
  return (r[0] as AuthUser) ?? null;
}

export async function updateUser(id: number, fields: { role?: string; permissions?: string[] }): Promise<void> {
  await ensureSchema();
  if (fields.role) await sql()`update pm_users set role = ${fields.role} where id = ${id}`;
  if (fields.permissions) await sql()`update pm_users set permissions = ${JSON.stringify(fields.permissions)}::jsonb where id = ${id}`;
}

/** Revoke all of a user's sessions ("kick") by bumping their token version. */
export async function kickUser(id: number): Promise<void> {
  await ensureSchema();
  await sql()`update pm_users set token_version = token_version + 1 where id = ${id}`;
}

export async function deleteUser(id: number): Promise<void> {
  await ensureSchema();
  await sql()`delete from pm_users where id = ${id}`;
}

export async function authenticate(username: string, password: string): Promise<AuthUser | null> {
  await ensureSchema();
  const r = await sql()`select * from pm_users where username = ${username}`;
  const u = r[0];
  if (!u) return null;
  if (!verifyPassword(password, u.password_hash as string)) return null;
  return { id: u.id as number, username: u.username as string, role: u.role as string, permissions: (u.permissions as string[]) ?? [], token_version: (u.token_version as number) ?? 0 };
}
