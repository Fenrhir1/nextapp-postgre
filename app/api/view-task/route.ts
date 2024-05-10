import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const tasks = await sql`SELECT * FROM Tasks;`;
  return NextResponse.json(tasks, { status: 200 });
}
