import React from "react";
import { Card, CardContent } from "./ui/card";
import { EditableText } from "./EditableText";
import { MoveLeftButton } from "./MoveLeftButton";
import { MoveRightButton } from "./MoveRightButton";
import { DeleteButton } from "./DeleteButton";
import { TaskAlert } from "./TaskAlert";
import { useTask } from "../hooks/useTask";

export const Task = ({ task, status, onMove, onDelete, onEdit }) => {
  const {
    isEditing,
    showAlert,
    handleEdit,
    startEditing,
    stopEditing,
    handleInvalidEdit,
  } = useTask((newText) => {
    onEdit(task.id, status, newText);
  });

  const taskTextClasses = `
    flex-1 cursor-pointer
    ${
      status === "done"
        ? "line-through text-slate-500 italic"
        : "hover:text-blue-600"
    }
  `;

  return (
    <div className="space-y-2">
      <Card className="bg-white">
        <CardContent className="p-3 flex items-center gap-2">
          {isEditing ? (
            <EditableText
              text={task.text}
              onSave={(newText) => handleEdit(newText)}
              onCancel={stopEditing}
              onInvalid={handleInvalidEdit}
            />
          ) : (
            <span className={taskTextClasses} onClick={startEditing}>
              {task.text}
            </span>
          )}
          <div className="flex gap-1">
            <MoveLeftButton status={status} taskId={task.id} onMove={onMove} />
            <MoveRightButton status={status} taskId={task.id} onMove={onMove} />
            <DeleteButton
              taskId={task.id}
              status={status}
              onDelete={onDelete}
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
