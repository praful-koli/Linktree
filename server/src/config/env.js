import dotenv from "dotenv";
dotenv.config();

import z from "zod";
import appConstant from "../constant/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
  REFRESH_TOKEN: z.string().min(1, "REFRESH_TOKEN is required"),
  ACCESS_TOKEN: z.string().min(1, "ACCESS_TOKEN is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export default parsed.data;