import { body } from "express-validator";

export const createLinkValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must be between 2 and 50 characters"),

  body("url")
    .trim()
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("Please provide a valid URL"),
];

export const updateLinkValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must be between 2 and 50 characters"),

  body("url")
    .optional()
    .trim()
    .isURL()
    .withMessage("Please provide a valid URL"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];