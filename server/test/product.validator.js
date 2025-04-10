import Joi from "joi";

const productSchemaValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Product title is required!",
  }),

  description: Joi.string().trim().required().messages({
    "string.empty": "Product description is required!",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Product price must be a number.",
    "number.min": "Price must be a positive number.",
    "any.required": "Product price is required!",
  }),

  images: Joi.array()
    .items(Joi.string().uri().messages({ "string.uri": "Each image must be a valid URL." }))
    .max(7)
    .default([
      "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png",
    ])
    .messages({
      "array.max": "A maximum of 7 images are allowed per product.",
    }),

  sizes: Joi.array()
    .items(Joi.string().valid("xs", "s", "m", "l", "xl", "xxl", "xxxl"))
    .default(["m"])
    .messages({
      "any.only": "Invalid size. Allowed: xs, s, m, l, xl, xxl, xxxl.",
    }),

  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid category ID format.",
      "any.required": "Product must belong to a category.",
    }),

  tag: Joi.string()
    .valid("male", "female")
    .required()
    .messages({
      "any.only": "Tag must be either 'male' or 'female'.",
      "any.required": "Tag (male or female) is required.",
    }),

  wishlists: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  bookings: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

export { productSchemaValidation };
