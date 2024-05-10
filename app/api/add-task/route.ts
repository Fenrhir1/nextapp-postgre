import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskName = searchParams.get("taskName");
  const taskId = searchParams.get("taskId");

  try {
    if (!taskName || !taskId) throw new Error("Pet and owner names required");
    await sql`INSERT INTO Tasks (Task, Id) VALUES (${taskName}, ${taskId} );`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM Tasks;`;
  return NextResponse.json({ tasks }, { status: 200 });
}
