import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const tasks = await sql`SELECT * FROM Tasks;`;
  return NextResponse.json(tasks, { status: 200 });
}

export async function PUT(request: Request) {
  if (request.method === "OPTIONS") {
    // Gestione della richiesta di preflight
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, OPTIONS, PATCH, DELETE, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const { taskId, taskName } = await request.json();
  await sql`UPDATE Tasks SET task = ${taskName} WHERE id = ${taskId};`;

  const updatedTasks = await sql`SELECT * FROM Tasks;`;

  const headers = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  return NextResponse.json(updatedTasks, { status: 200, headers });
}
