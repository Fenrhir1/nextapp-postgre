"use client";
import { ChangeEvent, useState, useEffect } from "react";

import { taskArray } from "../types/declaration";
import Link from "next/link";
import taskDetails from "../[task]/page";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import EditModal from "./editModal";

export default function InputComponent() {
  const [inputText, setInputText] = useState("");
  const [task, setTask] = useState<taskArray[]>([]);
  const [databaseTask, setDatabaseTask] = useState<taskArray[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }

    fetchTasksFromDatabase();
  }, []);

  const fetchTasksFromDatabase = async () => {
    try {
      const response = await fetch("/api/view-task");
      const data = await response.json();
      setDatabaseTask(data.rows);
      console.log("Task dal database:", data.rows);
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

    setTask([...task, newTask]);
    setInputText("");

    try {
      const response = await fetch(
        `/api/add-task?taskName=${newTask.task}&taskId=${newTask.id}`
      );
      const data = await response.json();
      console.log("Task aggiunta al database:", data);
      fetchTasksFromDatabase();
    } catch (error) {
      console.error("Errore durante l'aggiunta della task al database:", error);
    }
  };

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

      <div className="database">
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
                  Task: {item.task}, Id: {item.id}
                </Link>
                <Button onClick={() => handleDeleteTask(item.id)}>
                  Elimina
                </Button>
                <EditModal
                  taskId={item.id}
                  initialTask={item.task}
                  onTaskEdited={fetchTasksFromDatabase}
                />
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
