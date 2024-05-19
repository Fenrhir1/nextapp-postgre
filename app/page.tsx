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
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{ height: "100vh" }}
    >
      <NextUIProvider>
        <h1
          className="text-10xl font-bold text-center text-foreground"
          style={{ height: "100%", fontSize: "10rem", color: "#E0E0E0" }}
        >
          Tasks!
        </h1>
        <main
          className="dark text-foreground bg-background"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
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
