import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { INITIAL_TASKS, COLUMNS } from "../config/constants";

export const useKanbanTasks = () => {
  const [tasks, setTasks] = useLocalStorage("kanbanTasks", INITIAL_TASKS);
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = (text) => {
    if (!text.trim()) return;
    setTasks({
      ...tasks,
      todo: [...tasks.todo, { id: Date.now().toString(), text: text.trim() }],
    });
    setNewTaskText("");
  };

  const editTask = (taskId, status, newText) => {
    setTasks({
      ...tasks,
      [status]: tasks[status].map((task) =>
        task.id === taskId ? { ...task, text: newText.trim() } : task
      ),
    });
  };

  const moveTask = (taskId, fromStatus, direction) => {
    const newStatus =
      COLUMNS[COLUMNS.findIndex((col) => col.id === fromStatus) + direction]
        ?.id;
    if (!newStatus) return;

    const task = tasks[fromStatus].find((t) => t.id === taskId);
    if (!task) return;

    setTasks({
      ...tasks,
      [fromStatus]: tasks[fromStatus].filter((t) => t.id !== taskId),
      [newStatus]: [...tasks[newStatus], task],
    });
  };

  const deleteTask = (taskId, status) => {
    setTasks({
      ...tasks,
      [status]: tasks[status].filter((task) => task.id !== taskId),
    });
  };

  return {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    editTask,
    moveTask,
    deleteTask,
  };
};
