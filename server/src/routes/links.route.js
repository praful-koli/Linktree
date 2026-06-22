import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createLinkValidator } from "../validators/link.validator.js";
import validate from "../middlewares/user.validate.js";
import linksController from "../module/links/links.controller.js";
let router = Router();

/**
 * @route POST /
 * @access Protected
 * @description create link
 */
router.post(
  "/",
  authMiddleware,
  createLinkValidator,
  validate,
  linksController.createLink.bind(linksController),
);

/**
 * @route GET /
 * @access Protected
 * @description get all links
 */

router.get(
  "/",
  authMiddleware,
  linksController.getMyLinks.bind(linksController),
);


/**
 * @route PATCH /:id 
 * @access Protected
 * @description updat link uing link id 
 */

router.patch("/:id", authMiddleware, linksController.updateLink.bind(linksController));
export default router;
