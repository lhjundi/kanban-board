import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export const MoveLeftButton = ({ status, taskId, onMove }) => {
  if (status === "todo") return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onMove(taskId, status, -1)}
      title="Mover para esquerda"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};
