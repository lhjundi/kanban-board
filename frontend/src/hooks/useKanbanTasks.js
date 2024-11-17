import { useState, useEffect } from "react";
import { todoApi } from "../api/todoApi";

export function useKanbanTasks() {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função auxiliar para extrair números de um texto
  const extractNumber = (text) => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  };

  // Função de ordenação
  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      const textA = a.text.toLowerCase();
      const textB = b.text.toLowerCase();

      const numA = extractNumber(textA);
      const numB = extractNumber(textB);

      // Se ambos têm números, compara numericamente primeiro
      if (numA !== null && numB !== null) {
        if (numA !== numB) {
          return numA - numB;
        }
      }
      // Se apenas um tem número ou se os números são iguais
      return textA.localeCompare(textB, "pt-BR");
    });
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      console.log("Raw data from API:", data);

      // Processar e ordenar os dados
      const processedData = {
        todo: sortTasks(
          (data.todo || []).map((task) => ({
            ...task,
            id: task._id || task.id,
            _id: task._id || task.id,
          }))
        ),
        doing: sortTasks(
          (data.doing || []).map((task) => ({
            ...task,
            id: task._id || task.id,
            _id: task._id || task.id,
          }))
        ),
        done: sortTasks(
          (data.done || []).map((task) => ({
            ...task,
            id: task._id || task.id,
            _id: task._id || task.id,
          }))
        ),
      };

      console.log("Processed and sorted data:", processedData);
      setTasks(processedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text) => {
    if (!text.trim()) return;
    try {
      setLoading(true);
      const newTask = await todoApi.create({
        text: text.trim(),
        status: "todo",
      });
      console.log("New task created:", newTask);
      await fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (taskId, status, newText) => {
    if (!taskId || !newText.trim()) return;
    try {
      setLoading(true);
      await todoApi.update(taskId, {
        text: newText.trim(),
        status,
      });
      await fetchTasks();
    } catch (err) {
      console.error("Error editing task:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const moveTask = async (taskId, fromStatus, direction) => {
    if (!taskId) return;

    const statusMap = {
      todo: 0,
      doing: 1,
      done: 2,
    };

    const statuses = ["todo", "doing", "done"];
    const newStatusIndex = statusMap[fromStatus] + direction;

    if (newStatusIndex >= 0 && newStatusIndex < statuses.length) {
      try {
        setLoading(true);
        const newStatus = statuses[newStatusIndex];
        await todoApi.update(taskId, {
          status: newStatus,
        });
        await fetchTasks();
      } catch (err) {
        console.error("Error moving task:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteTask = async (taskId) => {
    if (!taskId) return;
    try {
      setLoading(true);
      await todoApi.delete(taskId);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    moveTask,
    deleteTask,
  };
}
