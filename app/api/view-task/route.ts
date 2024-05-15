import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const tasks = await sql`SELECT * FROM Tasks;`;

  // Create a new NextResponse object with Cache-Control headers
  const response = NextResponse.json(tasks, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });

  return response;
}
