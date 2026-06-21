import type { Metadata } from "next";
import AdminApp from "./AdminApp";

export const metadata: Metadata = {
  title: "Power Moves — CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminApp />;
}
