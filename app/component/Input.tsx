"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { taskArray } from "../types/declaration";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import EditModal from "./editModal";
import TaskTable from "./TaskTable";

export default function InputComponent() {
  const [inputText, setInputText] = useState("");
  const [task, setTask] = useState<taskArray[]>([]);
  const [databaseTask, setDatabaseTask] = useState<taskArray[]>([]);

  const fetchTasksFromDatabase = async () => {
    try {
      const response = await fetch("/api/view-task", { cache: "no-cache" });
      const data = await response.json();
    } catch (error) {
      console.error(
        "Errore durante il recupero delle task dal database:",
        error
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const randomId = () => Math.random();

  const handleButtonClick = async () => {
    const newTask = {
      task: inputText,
      id: randomId(),
    };

    setTask([...task, newTask]); // Optimistic update (optional)
    setInputText("");

    try {
      const response = await fetch(
        `/api/add-task?taskName=${newTask.task}&taskId=${newTask.id}`
      );
      const data = await response.json();
      console.log("Task aggiunta al database:", data);

      // Update databaseTask state after successful API call
      await fetchTasksFromDatabase(); // Essential to reflect changes
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
