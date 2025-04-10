import Joi from "joi";
import { Vendor } from "../models/vendor.model.js";

const vendorSchemaValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required!",
  }),

  username: Joi.string()
    .trim()
    .required()
    .custom(async (value, helper) => {
      const existingVendor = await Vendor.findOne({ username: value.toLowerCase() });
      if (existingVendor) {
        return helper.message("Username is already taken");
      }
      return value;
    })
    .messages({
      "string.empty": "Username is required!",
    }),

  email: Joi.string()
    .email()
    .required()
    .custom(async (value, helper) => {
      const existingEmail = await Vendor.findOne({ email: value.toLowerCase() });
      if (existingEmail) {
        return helper.message("Email is already registered");
      }
      return value;
    })
    .messages({
      "string.email": "Invalid email format.",
      "string.empty": "Email is required.",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .custom(async (value, helper) => {
      const existingPhone = await Vendor.findOne({ phone: value });
      if (existingPhone) {
        return helper.message("Phone number is already in use");
      }
      return value;
    })
    .messages({
      "string.pattern.base": "Phone number must be a 10-digit number.",
      "string.empty": "Phone number is required.",
    }),

  address: Joi.object({
    area: Joi.string().trim().required().messages({
      "string.empty": "Area is required!",
    }),
    city: Joi.string().trim().required().messages({
      "string.empty": "City is required!",
    }),
    pincode: Joi.string().trim().required().messages({
      "string.empty": "Pincode is required!",
    }),
    state: Joi.string().trim().required().messages({
      "string.empty": "State is required!",
    }),
    country: Joi.string().trim().required().messages({
      "string.empty": "Country is required!",
    }),
  }),
  image: Joi.string()
      .uri()
      .optional()
      .default("https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png")
      .messages({
        "string.uri": "Address image must be a valid URL.",
      })
.required(),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password is required.",
  }),

  role: Joi.string().valid("vendor").default("vendor").messages({
    "any.only": "Role must be 'vendor'.",
  }),

  products: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  categories: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  reviews: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  bookings: Joi.array()
    .items(
      Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        bookedAt: Joi.date().optional(), // Optional because it'll default in the model
      })
    )
    .optional(),
});

export { vendorSchemaValidation };
