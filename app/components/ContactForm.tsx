"use client";

import { useState } from "react";

const OPTIONS = ["General Question", "Sales / Quotation", "Showroom Visit", "Technical Support", "After-Sale Service", "Careers", "Other"];

export default function ContactForm({ to }: { to: string }) {
  const [sent, setSent] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const phone = String(f.get("phone") || "");
    const regarding = String(f.get("regarding") || "");
    const message = String(f.get("message") || "");
    const subject = encodeURIComponent(`[${regarding}] enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nRegarding: ${regarding}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }
  const field = "w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-red";
  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-line bg-surface p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-1 block tech-label text-steel">Your name</span><input name="name" required className={field} /></label>
        <label className="block"><span className="mb-1 block tech-label text-steel">Your email</span><input name="email" type="email" required className={field} /></label>
        <label className="block"><span className="mb-1 block tech-label text-steel">Phone</span><input name="phone" className={field} /></label>
        <label className="block"><span className="mb-1 block tech-label text-steel">Regarding</span>
          <select name="regarding" className={field}>{OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
        </label>
      </div>
      <label className="mt-4 block"><span className="mb-1 block tech-label text-steel">Your message</span><textarea name="message" rows={4} className={`${field} resize-y`} /></label>
      <button className="mt-5 rounded-md bg-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink">Send message</button>
      {sent && <p className="mt-3 text-sm text-graphite">Opening your email app… if nothing happens, write to <span className="font-semibold text-ink">{to}</span>.</p>}
    </form>
  );
}
