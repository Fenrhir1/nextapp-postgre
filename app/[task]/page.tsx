"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";

export default function TaskDetailsPage() {
  const [taskDetails, setTaskDetails] = useState<any>([]);
  const searchParams = useSearchParams();
  const task = searchParams.get("task");
  console.log("Task:", task);

  useEffect(() => {
    async function fetchTaskDetails() {
      try {
        const response = await fetch(`/api/view-task?taskName=${task}`);

        if (!response.ok) {
          throw new Error("Failed to fetch task details");
        }
        const data = await response.json();
        const findTask = data.rows.find((row: any) => row.task === task);
        setTaskDetails(findTask);
        console.log("Task details:", data.rows);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    }

    fetchTaskDetails();
  }, [task]);

  return (
    <div>
      {taskDetails ? (
        <div>
          <h1>Task: {taskDetails.task}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
