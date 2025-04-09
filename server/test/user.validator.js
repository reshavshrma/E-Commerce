import Joi from "joi";
import { User } from "../model/user.model.js";

// Validation Schema for User Creation
const userSchemaValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required!",
  }),

  email: Joi.string().email().required().custom(async (value, helper) => {
    const existingEmail = await User.findOne({ email: value });
    if (existingEmail) {
      return helper.message("Email is already registered");
    }
    return value;
  }).messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .custom(async (value, helper) => {
      const existingPhone = await User.findOne({ phone: value });
      if (existingPhone) {
        return helper.message("Phone number is already in use");
      }
      return value;
    })
    .messages({
      "string.pattern.base": "Phone number must be a 10-digit number.",
      "string.empty": "Phone number is required.",
      "any.required": "Phone number is required.",
    }),

  image: Joi.string()
    .uri()
    .optional()
    .default("https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png")
    .messages({
      "string.uri": "Image must be a valid URL.",
    }),

  role: Joi.string().valid("admin", "user", "vendor").default("user").messages({
    "any.only": "Role must be either 'admin', 'user', or 'vendor'.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password is required.",
  }),

  bookings: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  reviews: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  wishlists: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

export { userSchemaValidation };
