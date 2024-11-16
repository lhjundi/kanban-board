import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { EditableText } from "./EditableText";
import { MoveLeftButton } from "./MoveLeftButton";
import { MoveRightButton } from "./MoveRightButton";
import { DeleteButton } from "./DeleteButton";

export const Task = ({ task, status, onMove, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (newText) => {
    onEdit(task.id, status, newText);
    setIsEditing(false);
  };

  return (
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
            className="flex-1 cursor-pointer hover:text-blue-600"
            onClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
        <div className="flex gap-1">
          <MoveLeftButton status={status} taskId={task.id} onMove={onMove} />
          <MoveRightButton status={status} taskId={task.id} onMove={onMove} />
          <DeleteButton taskId={task.id} status={status} onDelete={onDelete} />
        </div>
      </CardContent>
    </Card>
  );
};