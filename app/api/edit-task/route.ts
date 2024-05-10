import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const tasks = await sql`SELECT * FROM Tasks;`;
  return NextResponse.json(tasks, { status: 200 });
}

export async function PUT(request: Request) {
  const { taskId, taskName } = await request.json();
  await sql`UPDATE Tasks SET task = ${taskName} WHERE id = ${taskId};`;

  const tasks = await sql`SELECT * FROM Tasks;`;
  return NextResponse.json(tasks, { status: 200 });
}
