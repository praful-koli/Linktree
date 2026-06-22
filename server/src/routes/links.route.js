import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createLinkValidator } from "../validators/link.validator.js";
import validate from "../middlewares/user.validate.js";
import linksController from "../module/links/links.controller.js";
let router = Router();


/**
 * @route /
 * @description create link
 */
router.post(
  "/",
  authMiddleware,
  createLinkValidator,
  validate,
  linksController.createLink.bind(linksController),
);


export default router