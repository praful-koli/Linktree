import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import logger from "./config/logger.js";

export default function createApp() {
  const app = express();

  if (env.NODE_ENV === "development") app.use(morgan("dev"));
 
  return app;
}
