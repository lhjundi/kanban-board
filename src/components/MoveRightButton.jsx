import React from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export const MoveRightButton = ({ status, taskId, onMove }) => {
  if (status === "done") return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onMove(taskId, status, 1)}
      title="Mover para direita"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};
