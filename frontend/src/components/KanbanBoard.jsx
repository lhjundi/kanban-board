import React from "react";
import { COLUMNS } from "../config/constants";
import { useKanbanTasks } from "../hooks/useKanbanTasks";
import { Column } from "./Column";
import { AddTaskForm } from "./AddTaskForm";
import { Alert } from "./ui/alert";
import { TitleKanban } from "./TitleKanban";
import { TitleMyTasks } from "./TitleMyTasks";

const KanbanBoard = () => {
  const { tasks, loading, error, addTask, editTask, moveTask, deleteTask } =
    useKanbanTasks();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <TitleKanban />

      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      <AddTaskForm onAddTask={addTask} disabled={loading} />

      <TitleMyTasks />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            title={column.title}
            tasks={tasks[column.id] || []}
            status={column.id}
            onMove={moveTask}
            onDelete={deleteTask}
            onEdit={editTask}
            disabled={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
