"use client";
import { ChangeEvent, useState, useEffect } from "react";

import { taskArray } from "../types/declaration";
import Link from "next/link";
import taskDetails from "../[task]/page";

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
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        style={{ color: "black" }}
      />
      <button onClick={handleButtonClick}>Aggiungi task</button>

      <div className="database">
        <h2>Task dal Database:</h2>
        <ul>
          {databaseTask &&
            databaseTask.map((item) => (
              <div key={item.id}>
                <Link href={{ pathname: "/task", query: { task: item.task } }}>
                  Task: {item.task}, ID: {item.id}
                </Link>
                <button onClick={() => handleDeleteTask(item.id)}>
                  Elimina
                </button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
