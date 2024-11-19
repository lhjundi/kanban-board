import { useState } from "react";

export const useTask = (onEdit) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInvalidEdit = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEdit = (newText) => {
    if (!newText.trim()) {
      handleInvalidEdit();
      return;
    }
    onEdit(newText.trim());
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
    handleInvalidEdit,
  };
};
