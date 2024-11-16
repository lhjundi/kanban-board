import React from "react";
import { Task } from "./Task";

export const Column = ({ title, tasks, status, onMove, onDelete, onEdit }) => {
  const sortedTasks = [...tasks].sort((a, b) =>
    a.text.localeCompare(b.text, "pt-BR")
  );

  return (
    <div className="flex-1">
      <h2 className="font-medium mb-4">{title}</h2>
      <div className="space-y-2">
        {sortedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            status={status}
            onMove={onMove}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};
