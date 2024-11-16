import React from "react";
import { COLUMNS } from "../config/constants";
import { useKanbanTasks } from "../hooks/useKanbanTasks";
import { Column } from "./Column";
import { AddTaskForm } from "./AddTaskForm";

const KanbanBoard = () => {
  const { tasks, addTask, editTask, moveTask, deleteTask } = useKanbanTasks();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Kanban TodoList
      </h1>

      <AddTaskForm onAddTask={addTask} />

      <div className="flex gap-4">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            title={column.title}
            tasks={tasks[column.id]}
            status={column.id}
            onMove={moveTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
