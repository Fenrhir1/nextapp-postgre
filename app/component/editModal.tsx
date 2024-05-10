import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

export default function EditModal({
  taskId,
  initialTask,
  onTaskEdited,
}: {
  taskId: number;
  initialTask: string;
  onTaskEdited: () => void;
}) {
  const [editedTask, setEditedTask] = useState(initialTask);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const editTask = async () => {
    try {
      const response = await fetch(`/api/edit-task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
          taskName: editedTask,
        }),
      });
      const data = await response.json();
      console.log("Task modificata:", data);
      onTaskEdited();
      onClose();
    } catch (error) {
      console.error("Errore durante la modifica della task:", error);
    }
  };

  const handleOpen = () => {
    setEditedTask(initialTask);
    onOpen();
  };

  return (
    <>
      <Button
        variant="flat"
        color="warning"
        onClick={handleOpen}
        className="capitalize"
      >
        Modifica
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Modifica Task</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              label="Nuovo nome della task"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={editTask}>
              Modifica
            </Button>
            <Button color="secondary" onClick={onClose}>
              Annulla
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
