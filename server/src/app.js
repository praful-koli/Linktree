import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import logger from "./config/logger.js";
import authRouter from "./routes/auth.route.js";
import cokieParser from "cookie-parser"
export default function createApp() {
  const app = express();
  
  app.use(express.json());
  app.use(cokieParser())

  if (env.NODE_ENV === "development") app.use(morgan("dev"));

  app.use("/api/auth", authRouter);

  return app;
}
