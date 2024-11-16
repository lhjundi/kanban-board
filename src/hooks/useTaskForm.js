import { useState } from "react";

export const useAddTaskForm = (onAddTask) => {
  const [newTaskText, setNewTaskText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    onAddTask(newTaskText);
    setNewTaskText("");
  };

  return {
    newTaskText,
    setNewTaskText,
    showAlert,
    handleSubmit,
  };
};
