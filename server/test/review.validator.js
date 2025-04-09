import Joi from "joi";
import { Review } from "../model/review.model.js";

const reviewSchemaValidation = Joi.object({
  userDetails: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid ObjectId.",
      "any.required": "User details are required!",
    }),

  rating: Joi.number()
    .min(1)
    .max(5)
    .required()
    .messages({
      "number.base": "Rating must be a number.",
      "number.min": "Rating must be at least 1.",
      "number.max": "Rating cannot exceed 5.",
      "any.required": "Rating is required!",
    }),

  comment: Joi.string()
    .trim()
    .max(200)
    .allow("") // Optional comment
    .messages({
      "string.max": "Comment can't exceed 200 characters.",
    }),
});

export { reviewSchemaValidation };
