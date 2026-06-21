# Power Moves CMS

Edit every section of the site from `/admin`. Content is stored in **Neon
Postgres**; the public site reads from it at request time and falls back to
built-in defaults (`app/lib/cms/schema.ts`) when no database is connected — so
the site never breaks, even before setup.

## What's editable
The entire content document — `brand`, `contact`, `nav` (dropdowns), `hero`,
`marquee`, `capabilities`, `epc` (3D panel layers), `specs`, `products`,
`process`, `industries`, `standards`, `faq`, `cta`, `footer`. Icons and 3D
geometry stay in code; all text, lists and links are editable.

## One-time setup
1. **Create a Neon database** (free tier): https://neon.tech → new project →
   copy the **pooled** connection string.
2. **Set environment variables** (local `.env.local`, and Vercel → Settings →
   Environment Variables):
   - `DATABASE_URL` — the Neon connection string
   - `AUTH_SECRET` — any long random string (signs admin sessions)
   Redeploy after adding them on Vercel.
3. Visit **`/admin`**. With the DB connected and no users yet, you'll be asked
   to **create the first admin** (username + 8+ char password). Tables are
   created automatically on first use (`pm_content`, `pm_users`).
4. Sign in → edit any section → **Save changes**. Add more editors/admins from
   the **Users** tab.

## How it works
- `app/lib/cms/schema.ts` — typed content model + default seed.
- `app/lib/cms/db.ts` — Neon client + `ensureSchema()`.
- `app/lib/cms/auth.ts` — scrypt password hashing + HMAC-signed session cookies.
- `app/lib/cms/store.ts` — `getContent` / `saveContent`, user create/list/auth.
- `app/api/admin/*` — session, setup, login, logout, content (GET/PUT), users.
- `app/admin` — login/setup + a structured editor that maps over the whole
  content document (text, lists, repeatable items).
- Pages (`/`, `/process`, `/industries`, `/specifications`, `/faq`) are
  `force-dynamic` and read live content via `getContent()`.

## Security notes
- Passwords are hashed with scrypt (salted); never stored in plain text.
- Sessions are httpOnly, signed cookies (7-day expiry).
- `AUTH_SECRET` must be set in production — without it sessions use an insecure
  dev default.
- `/admin` and `/api/admin/*` require a valid session; `/admin` is `noindex`.
