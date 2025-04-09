import Joi from "joi";
import {User} from "../model/user.model.js"; // Assuming you have a User model

const loginUserValidation = Joi.object({

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),

    password: Joi.string().min(6).required().messages({
         "string.empty": "password field is required !",
        "string.min": "Password must be at least 6 characters long.",
    }),

});

export { loginUserValidation };