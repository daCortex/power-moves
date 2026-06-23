"use client";

import { useEffect, useState } from "react";

/* ---------------- helpers ---------------- */
type Json = unknown;

function setByPath(root: Json, path: (string | number)[], value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = [...root];
    copy[head as number] = setByPath(copy[head as number], rest, value);
    return copy;
  }
  const obj = { ...(root as Record<string, Json>) };
  obj[head as string] = setByPath(obj[head as string], rest, value);
  return obj;
}
function blankLike(sample: Json): Json {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return sample.length ? [blankLike(sample[0])] : [];
  if (sample && typeof sample === "object") {
    const o: Record<string, Json> = {};
    for (const k of Object.keys(sample)) o[k] = blankLike((sample as Record<string, Json>)[k]);
    return o;
  }
  return "";
}
function label(key: string | number) {
  const s = String(key).replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
const LONG = new Set(["desc", "blurb", "body", "statement", "intro", "a", "address", "sub", "note"]);

const SECTION_LABELS: Record<string, string> = {
  brand: "Brand", contact: "Contact", nav: "Navigation", footer: "Footer",
  hero: "Hero", marquee: "Ticker", capabilities: "Capabilities", epc: "EPC panel",
  products: "Products", cta: "Call to action", specs: "Specifications", process: "Process",
  industries: "Industries", standards: "Standards", faq: "FAQ",
};
const GROUPS: { label: string; keys: string[] }[] = [
  { label: "Identity", keys: ["brand", "contact"] },
  { label: "Navigation", keys: ["nav", "footer"] },
  { label: "Home sections", keys: ["hero", "marquee", "capabilities", "epc", "products", "cta"] },
  { label: "Detail content", keys: ["specs", "process", "industries", "standards", "faq"] },
];

/* ---------------- recursive field ---------------- */
function Field({ k, value, path, onChange }: { k: string | number; value: Json; path: (string | number)[]; onChange: (p: (string | number)[], v: Json) => void }) {
  const fieldCls = "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-red";
  if (typeof value === "string") {
    const long = LONG.has(String(k)) || value.length > 70;
    return (
      <label className="block">
        <span className="mb-1 block text-[0.7rem] font-medium uppercase tracking-wide text-steel">{label(k)}</span>
        {long ? (
          <textarea value={value} onChange={(e) => onChange(path, e.target.value)} rows={Math.min(6, Math.max(2, Math.ceil(value.length / 60)))} className={`${fieldCls} resize-y`} />
        ) : (
          <input value={value} onChange={(e) => onChange(path, e.target.value)} className={fieldCls} />
        )}
      </label>
    );
  }
  if (typeof value === "number")
    return (
      <label className="block">
        <span className="mb-1 block text-[0.7rem] font-medium uppercase tracking-wide text-steel">{label(k)}</span>
        <input type="number" value={value} onChange={(e) => onChange(path, Number(e.target.value))} className={`${fieldCls} w-40`} />
      </label>
    );
  if (typeof value === "boolean")
    return (
      <label className="flex items-center gap-2"><input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} /><span className="text-sm text-ink">{label(k)}</span></label>
    );
  if (Array.isArray(value)) {
    const arr = value;
    return (
      <div className="rounded-md border border-line bg-surface/60 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-ink">{label(k)} <span className="text-mute">({arr.length})</span></span>
          <button type="button" onClick={() => onChange(path, [...arr, blankLike(arr[0] ?? "")])} className="rounded bg-ink px-2 py-1 text-[0.65rem] font-semibold text-paper hover:bg-red">+ Add</button>
        </div>
        <div className="space-y-3">
          {arr.map((item, i) => (
            <div key={i} className="relative rounded-md border border-line bg-paper/50 p-3 pr-9">
              <button type="button" aria-label="Remove" onClick={() => onChange(path, arr.filter((_, j) => j !== i))} className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded border border-line text-steel hover:border-red hover:text-red">×</button>
              {typeof item !== "object" ? (
                <Field k={i} value={item} path={[...path, i]} onChange={onChange} />
              ) : (
                <div className="space-y-3">{Object.entries(item as Record<string, Json>).map(([ck, cv]) => <Field key={ck} k={ck} value={cv} path={[...path, i, ck]} onChange={onChange} />)}</div>
              )}
            </div>
          ))}
          {arr.length === 0 && <p className="text-xs text-mute">Empty — use “+ Add”.</p>}
        </div>
      </div>
    );
  }
  if (value && typeof value === "object")
    return (
      <div className="rounded-md border border-line bg-surface/60 p-3">
        <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-wide text-ink">{label(k)}</span>
        <div className="space-y-3">{Object.entries(value as Record<string, Json>).map(([ck, cv]) => <Field key={ck} k={ck} value={cv} path={[...path, ck]} onChange={onChange} />)}</div>
      </div>
    );
  return null;
}

/* ---------------- auth screens ---------------- */
function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-red text-white"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg></span>
      <span className="font-display text-base font-bold tracking-tight text-ink">Power<span className="text-red">Moves</span> <span className="font-normal text-steel">CMS</span></span>
    </span>
  );
}
function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-28 max-w-sm rounded-xl border border-line bg-surface p-7 elev">
      <div className="mb-5"><Logo /></div>
      <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
      {children}
    </div>
  );
}

type SessionUser = { id: number; username: string; role: string; permissions?: string[] };
type Phase = "loading" | "nodb" | "setup" | "login" | "editor";

export default function AdminApp() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [content, setContent] = useState<Record<string, Json> | null>(null);
  const [section, setSection] = useState<string>("");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session").then((r) => r.json()).then((s) => {
      if (!s.dbConfigured) return setPhase("nodb");
      if (s.user) { setUser(s.user); loadContent(s.user); return; }
      setPhase(s.needsSetup ? "setup" : "login");
    }).catch(() => setPhase("login"));
  }, []);

  function visibleSections(u: SessionUser): string[] {
    const all = GROUPS.flatMap((g) => g.keys);
    if (u.role === "admin") return all;
    const allowed = new Set(u.permissions ?? []);
    return all.filter((k) => allowed.has(k));
  }

  async function loadContent(u: SessionUser) {
    const r = await fetch("/api/admin/content");
    const j = await r.json();
    if (j.content) {
      setContent(j.content);
      const vis = visibleSections(u);
      setSection(vis[0] ?? (u.role === "admin" ? "__users" : ""));
      setPhase("editor");
    }
  }

  async function submitAuth(e: React.FormEvent<HTMLFormElement>, url: string) {
    e.preventDefault(); setBusy(true); setMsg("");
    const f = new FormData(e.currentTarget);
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(f)) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) return setMsg(j.error || "Something went wrong.");
    setUser(j.user); loadContent(j.user);
  }
  function onChange(path: (string | number)[], v: Json) { setContent((c) => setByPath(c, path, v) as Record<string, Json>); setDirty(true); }
  async function save() {
    setBusy(true); setMsg("");
    const r = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) return setMsg(j.error || "Save failed.");
    setDirty(false); setMsg("Saved ✓"); setTimeout(() => setMsg(""), 2500);
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); location.reload(); }

  if (phase === "loading") return <div className="grid min-h-screen place-items-center text-steel tech-label">Loading…</div>;
  if (phase === "nodb")
    return <AuthCard title="Database not configured"><p className="mt-3 text-sm text-graphite">Set <code className="rounded bg-paper px-1 font-mono-tech text-xs">DATABASE_URL</code> and <code className="rounded bg-paper px-1 font-mono-tech text-xs">AUTH_SECRET</code>, then reload. The public site runs on built-in defaults until then.</p></AuthCard>;
  if (phase === "setup" || phase === "login") {
    const isSetup = phase === "setup";
    return (
      <AuthCard title={isSetup ? "Create the first admin" : "Sign in"}>
        <form onSubmit={(e) => submitAuth(e, isSetup ? "/api/admin/setup" : "/api/admin/login")} className="mt-5 space-y-3">
          <input name="username" placeholder="Username" autoComplete="username" required className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-red" />
          <input name="password" type="password" placeholder={isSetup ? "Password (8+ chars)" : "Password"} autoComplete={isSetup ? "new-password" : "current-password"} required className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-red" />
          <button disabled={busy} className="w-full rounded-md bg-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink disabled:opacity-60">{busy ? "…" : isSetup ? "Create admin" : "Sign in"}</button>
          {msg && <p className="text-sm text-red">{msg}</p>}
        </form>
      </AuthCard>
    );
  }

  const admin = user?.role === "admin";
  const vis = user ? visibleSections(user) : [];
  const groups = GROUPS.map((g) => ({ ...g, keys: g.keys.filter((k) => vis.includes(k)) })).filter((g) => g.keys.length);

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-surface/90 px-5 py-3 backdrop-blur">
        <Logo />
        <div className="flex items-center gap-3">
          {msg && <span className="tech-label text-red">{msg}</span>}
          <a href="/" target="_blank" className="hidden tech-label text-steel hover:text-ink sm:inline">View site ↗</a>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="tech-label text-ink">{user?.username}</span>
            <span className={`rounded px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase ${admin ? "bg-red/10 text-red" : "bg-ink/10 text-ink"}`}>{user?.role}</span>
          </span>
          <button onClick={save} disabled={busy || !dirty} className="rounded-full bg-ink px-4 py-2 tech-label text-paper hover:bg-red disabled:opacity-50">{dirty ? "Save changes" : "Saved"}</button>
          <button onClick={logout} className="tech-label text-steel hover:text-red">Sign out</button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[82rem] gap-6 px-4 py-6 sm:px-5">
        <aside className="sticky top-[4.25rem] hidden h-fit w-48 shrink-0 sm:block">
          <nav className="space-y-4">
            {groups.map((g) => (
              <div key={g.label}>
                <div className="px-3 pb-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-mute">{g.label}</div>
                <div className="space-y-0.5">
                  {g.keys.map((s) => (
                    <button key={s} onClick={() => setSection(s)} className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${section === s ? "bg-ink text-paper" : "text-graphite hover:bg-surface"}`}>{SECTION_LABELS[s] ?? label(s)}</button>
                  ))}
                </div>
              </div>
            ))}
            {admin && (
              <div>
                <div className="px-3 pb-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-mute">Admin</div>
                <button onClick={() => setSection("__users")} className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${section === "__users" ? "bg-ink text-paper" : "text-graphite hover:bg-surface"}`}>Users & access</button>
              </div>
            )}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {/* mobile section picker */}
          <select value={section} onChange={(e) => setSection(e.target.value)} className="mb-5 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm sm:hidden">
            {groups.flatMap((g) => g.keys).map((s) => <option key={s} value={s}>{SECTION_LABELS[s] ?? label(s)}</option>)}
            {admin && <option value="__users">Users & access</option>}
          </select>

          {section === "__users" && admin ? (
            <UsersPanel meId={user!.id} />
          ) : content && section && vis.includes(section) ? (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-ink">{SECTION_LABELS[section] ?? label(section)}</h2>
              <div className="space-y-4">
                {typeof content[section] === "object" && !Array.isArray(content[section])
                  ? Object.entries(content[section] as Record<string, Json>).map(([k, v]) => <Field key={k} k={k} value={v} path={[section, k]} onChange={onChange} />)
                  : <Field k={section} value={content[section]} path={[section]} onChange={onChange} />}
              </div>
            </div>
          ) : (
            <p className="text-sm text-steel">Select a section to edit.</p>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------------- users & access (admin) ---------------- */
type ManagedUser = { id: number; username: string; role: string; permissions: string[]; token_version: number };

function UsersPanel({ meId }: { meId: number }) {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  async function load() {
    const r = await fetch("/api/admin/users");
    const j = await r.json();
    if (j.users) { setUsers(j.users); setSections(j.sections ?? []); }
  }
  useEffect(() => { load(); }, []);

  async function patch(id: number, body: object) {
    setBusy(true); setMsg("");
    const r = await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...body }) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) return setMsg(j.error || "Failed");
    setMsg("Updated ✓"); setTimeout(() => setMsg(""), 2000); load();
  }
  async function del(id: number) {
    if (!confirm("Delete this user?")) return;
    await fetch("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }
  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg("");
    const f = new FormData(e.currentTarget);
    const role = String(f.get("role"));
    const permissions = role === "admin" ? [] : sections.filter((s) => f.get(`perm_${s}`));
    const r = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: f.get("username"), password: f.get("password"), role, permissions }) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) return setMsg(j.error || "Failed");
    (e.target as HTMLFormElement).reset(); setMsg("User added ✓"); load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-ink">Users &amp; access</h2>
        {msg && <span className="tech-label text-red">{msg}</span>}
      </div>

      <div className="space-y-3">
        {users.map((u) => {
          const open = editing === u.id;
          return (
            <div key={u.id} className="rounded-xl border border-line bg-surface">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-ink">{u.username}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase ${u.role === "admin" ? "bg-red/10 text-red" : "bg-ink/10 text-ink"}`}>{u.role}</span>
                  {u.id === meId && <span className="tech-label text-steel">you</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditing(open ? null : u.id)} className="rounded-md border border-line px-3 py-1.5 tech-label text-ink hover:border-ink">{open ? "Close" : "Access"}</button>
                  <button onClick={() => patch(u.id, { action: "kick" })} disabled={busy} className="rounded-md border border-line px-3 py-1.5 tech-label text-steel hover:border-red hover:text-red" title="End all active sessions for this user">Kick</button>
                  {u.id !== meId && <button onClick={() => del(u.id)} className="rounded-md border border-line px-3 py-1.5 tech-label text-steel hover:border-red hover:text-red">Delete</button>}
                </div>
              </div>
              {open && (
                <div className="border-t border-line px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="tech-label text-steel">Role</span>
                    <select defaultValue={u.role} onChange={(e) => patch(u.id, { role: e.target.value })} className="rounded-md border border-line bg-paper px-2 py-1 text-sm">
                      <option value="editor">editor</option>
                      <option value="admin">admin</option>
                    </select>
                    <span className="text-xs text-mute">Admins can edit everything &amp; manage users.</span>
                  </div>
                  {u.role !== "admin" && (
                    <div className="mt-4">
                      <div className="mb-2 tech-label text-steel">Sections this editor can control</div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {sections.map((s) => (
                          <label key={s} className="flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-2 text-sm">
                            <input type="checkbox" defaultChecked={u.permissions?.includes(s)} onChange={(e) => {
                              const next = new Set(u.permissions ?? []);
                              if (e.target.checked) next.add(s); else next.delete(s);
                              patch(u.id, { permissions: [...next] });
                            }} />
                            {SECTION_LABELS[s] ?? s}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* add user */}
      <form onSubmit={add} className="rounded-xl border border-line bg-surface p-5">
        <div className="font-display font-bold text-ink">Add a user</div>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <input name="username" placeholder="Username" required className="rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-red" />
          <input name="password" type="password" placeholder="Password (8+)" required className="rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-red" />
          <select name="role" defaultValue="editor" className="rounded-md border border-line bg-paper px-3 py-2 text-sm">
            <option value="editor">editor</option>
            <option value="admin">admin</option>
          </select>
          <button disabled={busy} className="rounded-full bg-ink px-4 py-2 tech-label text-paper hover:bg-red disabled:opacity-60">Add user</button>
        </div>
        <div className="mt-4">
          <div className="mb-2 tech-label text-steel">Editor permissions (ignored for admins)</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {sections.map((s) => (
              <label key={s} className="flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-1.5 text-sm">
                <input type="checkbox" name={`perm_${s}`} /> {SECTION_LABELS[s] ?? s}
              </label>
            ))}
          </div>
        </div>
      </form>

      <p className="text-xs text-mute">Sessions end when the browser is closed. “Kick” immediately ends a user’s active sessions everywhere; they’ll need to sign in again.</p>
    </div>
  );
}
