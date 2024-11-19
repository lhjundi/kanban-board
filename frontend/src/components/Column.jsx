import React from "react";
import { Task } from "./Task";

export const Column = ({
  title,
  tasks = [],
  status,
  onMove,
  onDelete,
  onEdit,
  disabled,
}) => {
  return (
    <div className="flex-1">
      <h2 className="font-medium mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            status={status}
            onMove={onMove}
            onDelete={onDelete}
            onEdit={onEdit}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
