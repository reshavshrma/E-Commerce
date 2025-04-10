import express from 'express';
import { validate } from '../middleware/validator.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Core router - /api/admin

router
     .route("/dashboard")
     .get()

router
     .route("/users")
     .get()

router
     .route("/vendors")
     .get()

router
     .route("/categories")
     .get()

router
     .route("/products")
     .get()

router
     .route("/bookings")
     .get()

router
     .route("/feedbacks")
     .get()




export default router;
