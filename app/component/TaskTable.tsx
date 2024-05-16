"use client";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { taskArray } from "../types/declaration";

export default function TaskTable({ tasks }: { tasks: taskArray[] }) {
  const [databaseTask, setDatabaseTask] = useState<taskArray[]>([]);

  const fetchTasksFromDatabase = async () => {
    try {
      const response = await fetch("/api/view-task", {
        cache: "no-store",
        next: { revalidate: 3600 },
      });
      const data = await response.json();

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
  }, [tasks]);

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/delete-task?taskId=${id}`);
      const data = await response.json();
      console.log("Task eliminata dal database:", data);
      console.log("id:", id);
      await fetchTasksFromDatabase();
    } catch (error) {
      console.error(
        "Errore durante l'eliminazione della task dal database:",
        error
      );
    }
  };

  const handleTaskChange = async (id: number, newTask: string) => {
    try {
      const response = await fetch("/api/edit-task", {
        method: "PUT",
        body: JSON.stringify({ taskId: id, taskName: newTask }),
      });
      const data = await response.json();
      console.log("Task aggiornata nel database:", data);
      await fetchTasksFromDatabase();
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento della task nel database:",
        error
      );
    }
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
              <input
                type="text"
                defaultValue={item.task}
                onBlur={(e) => handleTaskChange(item.id, e.target.value)}
              />
              <Button onClick={() => handleDeleteTask(item.id)}>Elimina</Button>
            </div>
          ))}
      </ul>
    </div>
  );
}
