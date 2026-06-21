import { NextResponse } from "next/server";
import { hasDb } from "@/app/lib/cms/db";
import { countUsers } from "@/app/lib/cms/store";
import { getSessionUser } from "@/app/lib/cms/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  let needsSetup = false;
  try {
    needsSetup = hasDb() ? (await countUsers()) === 0 : false;
  } catch {
    needsSetup = false;
  }
  return NextResponse.json({ user, dbConfigured: hasDb(), needsSetup });
}
