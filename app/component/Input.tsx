"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { taskArray } from "../types/declaration";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import EditModal from "./editModal";
import TaskTable from "./TaskTable";

export default function InputComponent({
  onTaskAdded,
}: {
  onTaskAdded: () => void;
}) {
  const [inputText, setInputText] = useState("");
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
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const randomId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const handleButtonClick = async () => {
    const newTask = {
      task: inputText,
      id: Math.random(),
    };

    // Optimistic update (optional)

    setInputText("");

    try {
      const response = await fetch(
        `/api/add-task?taskName=${newTask.task}&taskId=${newTask.id}`
      );
      const data = await response.json();
      console.log("Task aggiunta al database:", data);

      // Update databaseTask state after successful API call (optional)
      await fetchTasksFromDatabase(); // Essential to reflect changes

      // Trigger re-render in TaskTable (using a callback)
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta della task al database:", error);

      // Revert optimistic update if necessary (optional)
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          style={{ color: "black" }}
        />
        <Button onClick={handleButtonClick}>Aggiungi task</Button>
      </div>
    </div>
  );
}
