"use client";
import { useState, useEffect } from "react";

interface TaskDetailsPageProps {
  task: string;
}

export default function TaskDetailsPage({ task }: TaskDetailsPageProps) {
  const [taskDetails, setTaskDetails] = useState<any>({});

  useEffect(() => {
    async function fetchTaskDetails() {
      try {
        const response = await fetch(`/api/view-task?task=${task}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task details");
        }
        const data = await response.json();
        setTaskDetails(data);
        console.log("Task details:", taskDetails);
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
