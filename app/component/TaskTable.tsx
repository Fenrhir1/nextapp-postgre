"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import EditModal from "./editModal";
import { useEffect, useState } from "react";
import { taskArray } from "../types/declaration";

export default function TaskTable() {
  const [task, setTask] = useState<taskArray[]>([]);
  const [databaseTask, setDatabaseTask] = useState<taskArray[]>([]);

  const fetchTasksFromDatabase = async () => {
    try {
      const response = await fetch("/api/view-task", { cache: "no-cache" });
      const data = await response.json();
      console.log("data:", data.rows);
      await setDatabaseTask(data.rows);
    } catch (error) {
      console.error(
        "Errore durante il recupero delle task dal database:",
        error
      );
    }
  };

  useEffect(() => {
    fetchTasksFromDatabase();
  }, []);

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/delete-task?taskId=${id}`);
      const data = await response.json();
      console.log("Task eliminata dal database:", data);
      console.log("id:", id);
      fetchTasksFromDatabase();
    } catch (error) {
      console.error(
        "Errore durante l'eliminazione della task dal database:",
        error
      );
    }
    fetchTasksFromDatabase();
  };
  return (
    <div>
      <h2>Task:</h2>
      <ul>
        {databaseTask &&
          databaseTask.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Link href={{ pathname: "/task", query: { task: item.task } }}>
                Task: {item.task}
              </Link>
              <Button onClick={() => handleDeleteTask(item.id)}>Elimina</Button>
              <EditModal
                taskId={item.id}
                initialTask={item.task}
                onTaskEdited={fetchTasksFromDatabase}
              />
            </div>
          ))}
      </ul>
    </div>
  );
}
