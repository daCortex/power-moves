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

/* ---------------- recursive field ---------------- */
function Field({
  k, value, path, onChange,
}: {
  k: string | number;
  value: Json;
  path: (string | number)[];
  onChange: (path: (string | number)[], v: Json) => void;
}) {
  // primitive string
  if (typeof value === "string") {
    const long = LONG.has(String(k)) || value.length > 70;
    return (
      <label className="block">
        <span className="mb-1 block text-[0.7rem] font-medium uppercase tracking-wide text-steel">{label(k)}</span>
        {long ? (
          <textarea
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            rows={Math.min(6, Math.max(2, Math.ceil(value.length / 60)))}
            className="w-full resize-y rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-red"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-red"
          />
        )}
      </label>
    );
  }
  if (typeof value === "number") {
    return (
      <label className="block">
        <span className="mb-1 block text-[0.7rem] font-medium uppercase tracking-wide text-steel">{label(k)}</span>
        <input type="number" value={value} onChange={(e) => onChange(path, Number(e.target.value))}
          className="w-40 rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-red" />
      </label>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} />
        <span className="text-sm text-ink">{label(k)}</span>
      </label>
    );
  }

  // array
  if (Array.isArray(value)) {
    const arr = value;
    // array of [string,string] tuples -> inline row of two inputs
    const isTuple = arr.length > 0 && Array.isArray(arr[0]);
    return (
      <div className="rounded-md border border-line bg-surface/60 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-ink">{label(k)} <span className="text-mute">({arr.length})</span></span>
          <button type="button" onClick={() => onChange(path, [...arr, blankLike(arr[0] ?? "")])}
            className="rounded bg-ink px-2 py-1 text-[0.65rem] font-semibold text-paper hover:bg-red">+ Add</button>
        </div>
        <div className="space-y-3">
          {arr.map((item, i) => (
            <div key={i} className="relative rounded-md border border-line bg-paper/50 p-3 pr-9">
              <button type="button" aria-label="Remove"
                onClick={() => onChange(path, arr.filter((_, j) => j !== i))}
                className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded border border-line text-steel hover:border-red hover:text-red">×</button>
              {isTuple || typeof item !== "object" ? (
                <Field k={i} value={item} path={[...path, i]} onChange={onChange} />
              ) : (
                <div className="space-y-3">
                  {Object.entries(item as Record<string, Json>).map(([ck, cv]) => (
                    <Field key={ck} k={ck} value={cv} path={[...path, i, ck]} onChange={onChange} />
                  ))}
                </div>
              )}
            </div>
          ))}
          {arr.length === 0 && <p className="text-xs text-mute">Empty — use “+ Add”.</p>}
        </div>
      </div>
    );
  }

  // object
  if (value && typeof value === "object") {
    return (
      <div className="rounded-md border border-line bg-surface/60 p-3">
        <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-wide text-ink">{label(k)}</span>
        <div className="space-y-3">
          {Object.entries(value as Record<string, Json>).map(([ck, cv]) => (
            <Field key={ck} k={ck} value={cv} path={[...path, ck]} onChange={onChange} />
          ))}
        </div>
      </div>
    );
  }
  return null;
}

/* ---------------- auth screens ---------------- */
function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-32 max-w-sm rounded-lg border border-line bg-surface p-7 elev">
      <div className="mb-5 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-red text-white">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
        </span>
        <span className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">Power<span className="text-red">Moves</span> <span className="text-steel">CMS</span></span>
      </div>
      <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
      {children}
    </div>
  );
}

/* ---------------- main ---------------- */
type Phase = "loading" | "nodb" | "setup" | "login" | "editor";

export default function AdminApp() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [content, setContent] = useState<Record<string, Json> | null>(null);
  const [section, setSection] = useState<string>("");
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session").then((r) => r.json()).then((s) => {
      if (!s.dbConfigured) return setPhase("nodb");
      if (s.user) { setUser(s.user); loadContent(); return; }
      setPhase(s.needsSetup ? "setup" : "login");
    }).catch(() => setPhase("login"));
  }, []);

  async function loadContent() {
    const r = await fetch("/api/admin/content");
    const j = await r.json();
    if (j.content) { setContent(j.content); setSection(Object.keys(j.content)[0]); setPhase("editor"); }
  }

  async function submitAuth(e: React.FormEvent<HTMLFormElement>, url: string) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const f = new FormData(e.currentTarget);
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(f)) });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) return setMsg(j.error || "Something went wrong.");
    setUser(j.user); loadContent();
  }

  function onChange(path: (string | number)[], v: Json) {
    setContent((c) => setByPath(c, path, v) as Record<string, Json>);
    setDirty(true);
  }

  async function save() {
    setBusy(true); setMsg("");
    const r = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) return setMsg(j.error || "Save failed.");
    setDirty(false); setMsg("Saved ✓"); setTimeout(() => setMsg(""), 2500);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  }

  if (phase === "loading") return <div className="grid min-h-screen place-items-center text-steel tech-label">Loading…</div>;

  if (phase === "nodb")
    return (
      <AuthCard title="Database not configured">
        <p className="mt-3 text-sm text-graphite">Set <code className="rounded bg-paper px-1 font-mono-tech text-xs">DATABASE_URL</code> (Neon) and <code className="rounded bg-paper px-1 font-mono-tech text-xs">AUTH_SECRET</code> in your environment, then reload. The public site keeps running on built-in defaults until then.</p>
      </AuthCard>
    );

  if (phase === "setup" || phase === "login") {
    const isSetup = phase === "setup";
    return (
      <AuthCard title={isSetup ? "Create the first admin" : "Sign in"}>
        <form onSubmit={(e) => submitAuth(e, isSetup ? "/api/admin/setup" : "/api/admin/login")} className="mt-5 space-y-3">
          <input name="username" placeholder="Username" autoComplete="username" required
            className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-red" />
          <input name="password" type="password" placeholder={isSetup ? "Password (8+ chars)" : "Password"} autoComplete={isSetup ? "new-password" : "current-password"} required
            className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-red" />
          <button disabled={busy} className="w-full rounded-md bg-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink disabled:opacity-60">
            {busy ? "…" : isSetup ? "Create admin" : "Sign in"}
          </button>
          {msg && <p className="text-sm text-red">{msg}</p>}
        </form>
      </AuthCard>
    );
  }

  // editor
  const sections = content ? Object.keys(content) : [];
  return (
    <div className="min-h-screen bg-paper">
      {/* top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/90 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-red text-white">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
          </span>
          <span className="font-display text-sm font-extrabold uppercase tracking-tight text-ink">Power<span className="text-red">Moves</span> CMS</span>
        </div>
        <div className="flex items-center gap-3">
          {msg && <span className="tech-label text-red">{msg}</span>}
          <a href="/" target="_blank" className="tech-label text-steel hover:text-ink">View site ↗</a>
          <span className="tech-label text-steel">{user?.username}</span>
          <button onClick={save} disabled={busy || !dirty}
            className="rounded-md bg-ink px-4 py-2 tech-label text-paper hover:bg-red disabled:opacity-50">{dirty ? "Save changes" : "Saved"}</button>
          <button onClick={logout} className="tech-label text-steel hover:text-red">Sign out</button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[80rem] gap-6 px-5 py-6">
        {/* section nav */}
        <aside className="sticky top-[4.5rem] h-fit w-44 shrink-0">
          <nav className="space-y-0.5">
            {sections.map((s) => (
              <button key={s} onClick={() => setSection(s)}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm capitalize transition-colors ${section === s ? "bg-ink text-paper" : "text-graphite hover:bg-surface"}`}>
                {label(s)}
              </button>
            ))}
            <a href="#users" onClick={() => setSection("__users")}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${section === "__users" ? "bg-ink text-paper" : "text-graphite hover:bg-surface"}`}>
              Users
            </a>
          </nav>
        </aside>

        {/* editor pane */}
        <main className="min-w-0 flex-1">
          {section === "__users" ? (
            <UsersPanel />
          ) : content && section ? (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-extrabold uppercase text-ink">{label(section)}</h2>
              <div className="space-y-4">
                {typeof content[section] === "object" && !Array.isArray(content[section]) ? (
                  Object.entries(content[section] as Record<string, Json>).map(([k, v]) => (
                    <Field key={k} k={k} value={v} path={[section, k]} onChange={onChange} />
                  ))
                ) : (
                  <Field k={section} value={content[section]} path={[section]} onChange={onChange} />
                )}
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function UsersPanel() {
  const [users, setUsers] = useState<{ id: number; username: string; role: string }[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { fetch("/api/admin/users").then((r) => r.json()).then((j) => setUsers(j.users || [])); }, []);
  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg("");
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(f)) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) return setMsg(j.error || "Failed");
    setUsers((u) => [...u, j.user]); (e.target as HTMLFormElement).reset(); setMsg("Added ✓");
  }
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-extrabold uppercase text-ink">Users</h2>
      <ul className="divide-y divide-line rounded-md border border-line bg-surface">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-ink">{u.username}</span>
            <span className="tech-label text-steel">{u.role}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="flex flex-wrap items-end gap-3 rounded-md border border-line bg-surface p-4">
        <input name="username" placeholder="Username" required className="rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-red" />
        <input name="password" type="password" placeholder="Password (8+)" required className="rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-red" />
        <select name="role" className="rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-red">
          <option value="editor">editor</option>
          <option value="admin">admin</option>
        </select>
        <button disabled={busy} className="rounded-md bg-ink px-4 py-2 tech-label text-paper hover:bg-red disabled:opacity-60">Add user</button>
        {msg && <span className="tech-label text-red">{msg}</span>}
      </form>
    </div>
  );
}
