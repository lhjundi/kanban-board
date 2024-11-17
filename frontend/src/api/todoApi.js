import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log interceptors
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
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
