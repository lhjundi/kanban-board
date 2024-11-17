import { Todo } from "../models/Todo.js";

export class TodoController {
  async getAll(request, reply) {
    try {
      const todos = await Todo.find().lean();

      const processedTodos = todos.map((todo) => ({
        ...todo,
        _id: todo._id.toString(),
        id: todo._id.toString(),
      }));

      const groupedTodos = {
        todo: processedTodos.filter((t) => t.status === "todo"),
        doing: processedTodos.filter((t) => t.status === "doing"),
        done: processedTodos.filter((t) => t.status === "done"),
      };

      console.log("Sending todos:", groupedTodos);
      return reply.send(groupedTodos);
    } catch (error) {
      console.error("Error getting todos:", error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  }

  async create(request, reply) {
    try {
      const todo = new Todo(request.body);
      await todo.save();

      const response = todo.toJSON();
      return reply.status(201).send(response);
    } catch (error) {
      console.error("Error creating todo:", error);
      return reply.status(400).send({ error: "Invalid todo data" });
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;
      const todo = await Todo.findByIdAndUpdate(id, request.body, {
        new: true,
        runValidators: true,
      });

      if (!todo) {
        return reply.status(404).send({ error: "Todo not found" });
      }

      const response = todo.toJSON();
      return reply.send(response);
    } catch (error) {
      console.error("Error updating todo:", error);
      if (error.name === "CastError") {
        return reply.status(400).send({ error: "Invalid ID format" });
      }
      return reply.status(500).send({ error: "Internal server error" });
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const todo = await Todo.findByIdAndDelete(id);

      if (!todo) {
        return reply.status(404).send({ error: "Todo not found" });
      }

      const response = todo.toJSON();
      return reply.send({
        message: "Todo deleted successfully",
        todo: response,
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      if (error.name === "CastError") {
        return reply.status(400).send({ error: "Invalid ID format" });
      }
      return reply.status(500).send({ error: "Internal server error" });
    }
  }
}
