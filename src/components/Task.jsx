import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { EditableText } from "./EditableText";
import { MoveLeftButton } from "./MoveLeftButton";
import { MoveRightButton } from "./MoveRightButton";
import { DeleteButton } from "./DeleteButton";
import { TaskAlert } from "./TaskAlert";

export const Task = ({ task, status, onMove, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleEdit = (newText) => {
    if (!newText.trim()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    onEdit(task.id, status, newText);
    setIsEditing(false);
  };

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
              onSave={handleEdit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <span
              className={taskTextClasses}
              onClick={() => setIsEditing(true)}
            >
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
