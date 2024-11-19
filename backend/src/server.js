import Fastify from "fastify";
import cors from "@fastify/cors";
import { todoRoutes } from "./routes/todos.js";
import { connectDB } from "./config/database.js";
import { env } from "./config/env.js";

const fastify = Fastify({
  logger: {
    level: env.nodeEnv === "development" ? "debug" : "info",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// Configurar CORS
await fastify.register(cors, {
  origin: env.corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
});

// Conectar ao MongoDB
await connectDB();

// Registrar rotas
await fastify.register(todoRoutes);

// Health check
fastify.get("/health", async () => ({ status: "ok" }));

// Iniciar servidor
try {
  await fastify.listen({
    port: env.port,
    host: "0.0.0.0",
  });
  console.log(`🚀 Server running at http://localhost:${env.port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  await fastify.close();
  process.exit(0);
});
