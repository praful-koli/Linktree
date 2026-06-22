import pino from "pino";
import env from "./env.js";

export default pino({
  level: env?.LOGGER_LEVEL || process.env.LOGGER_LEVEL || "info",
  transport: {
    target: "pino-pretty",
  },
});
