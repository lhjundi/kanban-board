import React from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export const DeleteButton = ({ taskId, status, onDelete }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDelete(taskId, status)}
      className="hover:text-red-500"
      title="Excluir tarefa"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
