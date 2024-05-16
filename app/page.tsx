"use client";
import InputComponent from "./component/Input";
import { NextUIProvider } from "@nextui-org/react";
import TaskTable from "./component/TaskTable";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = () => {
    const fetchTasksFromDatabase = async () => {
      try {
        const response = await fetch("/api/view-task", {
          cache: "no-store",
          next: { revalidate: 0 },
        });
        const data = await response.json();

        return data.rows;
      } catch (error) {
        console.error(
          "Errore durante il recupero delle task dal database:",
          error
        );
      }
    };
    fetchTasksFromDatabase().then((data) => setTasks(data.rows));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NextUIProvider>
        <main
          className="dark text-foreground bg-background"
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputComponent onTaskAdded={handleTaskAdded} />
          <TaskTable tasks={tasks} />
        </main>
      </NextUIProvider>
    </main>
  );
}
