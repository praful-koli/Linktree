import dotenv, { parse } from "dotenv";
dotenv.config();
import z from "zod";
import appConstant from "../constant/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URI: z.string(),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
  RATELIMIT_WINDOWMS: z.coerce.number().default(appConstant.RATELIMIT_WINDOWMS),
  RATELIMIT: z.coerce.number().default(appConstant.RATELIMIT),
  REFRESH_TOKEN: z.string(),
  ACCESS_TOKEN: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success) {
  console.log("check your env's");
}

export default parsed.data;