import axios from "axios";
import { errorHandler } from "@/utils/errorHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log interceptors, tratar erros
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = errorHandler.handle(error);
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      message: errorMessage
    });
    throw new Error(errorMessage);
  }
);

export const todoApi = {
  getAll: async () => {
    const { data } = await api.get("/todos");
    return data;
  },

  create: async (todo) => {
    const { data } = await api.post("/todos", todo);
    return data;
  },

  update: async (id, updates) => {
    const { data } = await api.put(`/todos/${id}`, updates);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/todos/${id}`);
    return data;
  },
};
