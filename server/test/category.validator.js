import Joi from "joi";

const categorySchemaValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Category title is required!",
  }),

  description: Joi.string().trim().optional(),

  image: Joi.string()
    .uri()
    .default("https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png")
    .messages({
      "string.uri": "Image must be a valid URL.",
    }),

  tag: Joi.string()
    .valid("male", "female")
    .required()
    .messages({
      "any.only": "Tag must be either 'male' or 'female'.",
      "any.required": "Tag (male or female) is required.",
    }),

  products: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      "string.pattern.base": "Each product ID must be a valid ObjectId.",
    }),

  owner: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      "string.pattern.base": "Each owner ID must be a valid ObjectId.",
    }),
});

export { categorySchemaValidation };
