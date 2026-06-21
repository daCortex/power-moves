import { neon } from "@neondatabase/serverless";

export function hasDb() {
  return !!process.env.DATABASE_URL;
}

export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

let ensured = false;
export async function ensureSchema() {
  if (ensured || !hasDb()) return;
  const q = sql();
  await q`create table if not exists pm_content (
    id int primary key default 1,
    doc jsonb not null,
    updated_at timestamptz default now()
  )`;
  await q`create table if not exists pm_users (
    id serial primary key,
    username text unique not null,
    password_hash text not null,
    role text not null default 'editor',
    created_at timestamptz default now()
  )`;
  ensured = true;
}
