import { config } from "dotenv";
config();

export const env = {
  mongoUri: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME || "kanban",
  port: parseInt(process.env.PORT || "3001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};
