import React from "react";
import { Card, CardContent } from "./ui/card";
import { EditableText } from "./EditableText";
import { MoveLeftButton } from "./MoveLeftButton";
import { MoveRightButton } from "./MoveRightButton";
import { DeleteButton } from "./DeleteButton";
import { TaskAlert } from "./TaskAlert";
import { useTask } from "../hooks/useTask";

export const Task = ({ task, status, onMove, onDelete, onEdit, disabled }) => {
  if (!task?._id) return null;

  const {
    isEditing,
    showAlert,
    handleEdit,
    startEditing,
    stopEditing,
    handleInvalidEdit,
  } = useTask((newText) => onEdit(task._id, status, newText));

  const handleMove = (direction) => {
    onMove(task._id, status, direction);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <div className="space-y-2">
      <Card className="bg-white">
        <CardContent className="p-3 flex items-center gap-2">
          {isEditing ? (
            <EditableText
              text={task.text}
              onSave={handleEdit}
              onCancel={stopEditing}
              onInvalid={handleInvalidEdit}
              disabled={disabled}
            />
          ) : (
            <span
              className={`flex-1 cursor-pointer ${
                disabled ? "opacity-50" : ""
              } ${
                status === "done"
                  ? "line-through text-slate-500 italic"
                  : "hover:text-blue-600"
              }`}
              onClick={disabled ? undefined : startEditing}
            >
              {task.text}
            </span>
          )}
          <div className="flex gap-1">
            <MoveLeftButton
              status={status}
              taskId={task._id}
              onMove={() => handleMove(-1)}
              disabled={disabled}
            />
            <MoveRightButton
              status={status}
              taskId={task._id}
              onMove={() => handleMove(1)}
              disabled={disabled}
            />
            <DeleteButton
              taskId={task._id}
              status={status}
              onDelete={handleDelete}
              disabled={disabled}
            />
          </div>
        </CardContent>
      </Card>
      {showAlert && (
        <TaskAlert message="O texto da tarefa não pode ficar em branco." />
      )}
    </div>
  );
};
