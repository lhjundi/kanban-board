import { useState } from "react";

export const useTask = (onEdit) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleEdit = (taskId, status, newText) => {
    if (!newText.trim()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    onEdit(taskId, status, newText);
    setIsEditing(false);
  };

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  return {
    isEditing,
    showAlert,
    handleEdit,
    startEditing,
    stopEditing,
  };
};
