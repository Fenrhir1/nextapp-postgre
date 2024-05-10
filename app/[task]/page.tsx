"use client";
import { useState, useEffect } from "react";

export default function TaskPage({
  params,
}: {
  params: { taskName: string; taskId: string };
}) {
  const [taskDetails, setTaskDetails] = useState();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`/api/view-task?task=${params.taskName}`);
        const data = await response.json();
        setTaskDetails(data.rows);
        console.log("Dettagli della task:", data);
      } catch (error) {
        console.error(
          "Errore durante il recupero dei dettagli della task:",
          error
        );
      }
    };

    if (params.taskName) {
      fetchTaskDetails();
    }
  }, [params.taskName]);

  return (
    <div>
      <h1>Dettagli della Task: {params.taskName}</h1>
    </div>
  );
}
