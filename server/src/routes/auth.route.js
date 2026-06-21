import express from "express";
let router = express.Router()
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import validate from "../middlewares/user.validate.js";

import {
  registerUser,
  loginUser,
  getMe,
} from "../module/auth/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

router.post("/register", registerValidator, validate, registerUser);

router.post("/login", loginValidator, validate, loginUser);

router.get("/me", authMiddleware, getMe);

export default router;
