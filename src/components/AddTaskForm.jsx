import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TaskAlert } from "./TaskAlert";

export const AddTaskForm = ({
  newTaskText,
  setNewTaskText,
  onSubmit,
  showAlert,
}) => (
  <div>
    <div className="space-y-2 mb-8">
      <form onSubmit={onSubmit} className="flex gap-2">
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
