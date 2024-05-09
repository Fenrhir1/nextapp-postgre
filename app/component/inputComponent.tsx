"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { taskArray } from "../types/declaration";
import Link from "next/link";

export default function InputComponent() {
  const [inputText, setInputText] = useState("");
  const [task, setTask] = useState<taskArray[]>([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const randomId = () => Math.random();

  const handleButtonClick = () => {
    setTask([...task, { id: randomId(), task: inputText }]);
    setInputText("");
  };

  const handleDeleteTask = (taskId: number) => {
    setTask(task.filter((item) => item.id !== taskId));
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Aggiungi task</button>
      {task.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
            margin: "10px",
          }}
        >
          <Link href={`/task/${item.task}`}>{item.task}</Link>
          <button onClick={() => handleDeleteTask(item.id)}>Elimina</button>
          <button>Modifica</button>
        </div>
      ))}
    </div>
  );
}
