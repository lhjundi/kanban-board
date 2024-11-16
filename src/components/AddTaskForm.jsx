import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AddTaskForm = ({ newTaskText, setNewTaskText, onSubmit }) => (
  <form onSubmit={onSubmit} className="flex gap-2 mb-8">
    <Input
      value={newTaskText}
      onChange={(e) => setNewTaskText(e.target.value)}
      placeholder="Adicionar nova tarefa"
      className="flex-1"
    />
    <Button type="submit">Adicionar</Button>
  </form>
);
