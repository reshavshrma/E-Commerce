// validators/editVendorValidation.js
import Joi from "joi";

export const editVendorValidation = Joi.object({
  name: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  image: Joi.string().uri().optional(),

  address: Joi.object({
    area: Joi.string().optional(),
    city: Joi.string().optional(),
    pincode: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
});
