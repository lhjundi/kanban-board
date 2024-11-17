import { TodoController } from "../controllers/TodoController.js";

const controller = new TodoController();

export async function todoRoutes(fastify) {
  fastify.get("/todos", controller.getAll.bind(controller));
  fastify.post("/todos", controller.create.bind(controller));
  fastify.put("/todos/:id", controller.update.bind(controller));
  fastify.delete("/todos/:id", controller.delete.bind(controller));
}
