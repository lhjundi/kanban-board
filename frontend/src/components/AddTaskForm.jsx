import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TaskAlert } from "./TaskAlert";
import { useAddTaskForm } from "../hooks/useAddTaskForm";

export const AddTaskForm = ({ onAddTask }) => {
  const { newTaskText, setNewTaskText, showAlert, handleSubmit } =
    useAddTaskForm(onAddTask);

  return (
    <div>
      <div className="space-y-2 mb-8">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Adicionar nova tarefa"
            className="flex-1"
          />
          <Button type="submit">Adicionar</Button>
        </form>
        {showAlert && (
          <TaskAlert message="O texto da tarefa não pode ficar em branco." />
        )}
      </div>
    </div>
  );
};
