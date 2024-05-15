import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");

  if (!taskId) throw new Error("Task Id required");
  await sql`DELETE FROM Tasks WHERE Id = ${taskId};`;

  const tasks = await sql`SELECT * FROM Tasks;`;
  return NextResponse.json(
    { tasks },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
