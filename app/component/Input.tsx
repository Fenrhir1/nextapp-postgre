"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function InputComponent({
  onTaskAdded,
}: {
  onTaskAdded: () => void;
}) {
  const [inputText, setInputText] = useState("");

  const fetchTasksFromDatabase = async () => {
    try {
      const response = await fetch("/api/view-task", {
        cache: "no-store",
        next: { revalidate: 3600 },
      });
      const data = await response.json();
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

  const handleButtonClick = async () => {
    const newTask = {
      task: inputText,
      id: Math.floor(Math.random() * 1000),
    };

    setInputText("");

    try {
      const response = await fetch(
        `/api/add-task?taskName=${newTask.task}&taskId=${newTask.id}`
      );
      const data = await response.json();
      console.log("Task aggiunta al database:", data);
      await fetchTasksFromDatabase();
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta della task al database:", error);
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
