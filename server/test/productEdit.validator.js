import Joi from "joi";

const editProductSchemaValidation = Joi.object({
  title: Joi.string().trim().optional().messages({
    "string.empty": "Product title cannot be empty.",
  }),

  description: Joi.string().trim().optional().messages({
    "string.empty": "Product description cannot be empty.",
  }),

  price: Joi.number().min(0).optional().messages({
    "number.base": "Product price must be a number.",
    "number.min": "Price must be a positive number.",
  }),

  images: Joi.array()
    .items(Joi.string().uri().messages({ "string.uri": "Each image must be a valid URL." }))
    .max(7)
    .optional()
    .messages({
      "array.max": "A maximum of 7 images are allowed per product.",
    }),

  sizes: Joi.array()
    .items(Joi.string().valid("xs", "s", "m", "l", "xl", "xxl", "xxxl"))
    .optional()
    .messages({
      "any.only": "Invalid size. Allowed values: xs, s, m, l, xl, xxl, xxxl.",
    }),

  tag: Joi.string()
    .valid("male", "female")
    .optional()
    .messages({
      "any.only": "Tag must be either 'male' or 'female'.",
    }),
});

export { editProductSchemaValidation };
