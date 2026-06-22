import pino from "pino";
import env from "./env.js";

const isProduction = env.NODE_ENV === "production";

export default pino({
  level: env.LOGGER_LEVEL || "info",
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
      },
});