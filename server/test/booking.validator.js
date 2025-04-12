import Joi from "joi";

// Define objectId custom validation
const objectId = (value, helpers) => {
  const isValid = /^[0-9a-fA-F]{24}$/.test(value);
  if (!isValid) {
    return helpers.error("any.invalid");
  }
  return value;
};

const bookingValidationSchema = Joi.object({
  user: Joi.string().custom(objectId).required().messages({
    "any.required": "User ID is required",
    "any.invalid": "Invalid user ID",
  }),

  vendor: Joi.string().custom(objectId).required().messages({
    "any.required": "Vendor ID is required",
    "any.invalid": "Invalid vendor ID",
  }),

  product: Joi.string().custom(objectId).required().messages({
    "any.required": "Product ID is required",
    "any.invalid": "Invalid product ID",
  }),

  category: Joi.string().custom(objectId).required().messages({
    "any.required": "Category ID is required",
    "any.invalid": "Invalid category ID",
  }),

  quantity: Joi.number().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),

  totalPrice: Joi.number().min(0).required().messages({
    "number.base": "Total price must be a number",
    "number.min": "Total price must be 0 or more",
    "any.required": "Total price is required",
  }),

  status: Joi.string()
    .valid("pending", "confirmed", "cancelled", "completed")
    .optional()
    .messages({
      "any.only": "Invalid booking status",
    }),

  bookingDate: Joi.date().optional(),
});

export { bookingValidationSchema };
