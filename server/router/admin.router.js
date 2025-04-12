import express from 'express';
import { validate } from '../middleware/validator.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';
import { adminBookingData, adminCategoryData, adminDashboardData, adminFeedbackData, adminProductData, adminUserData, adminVendorData } from '../controller/admin.controller.js';

const router = express.Router();

// Core router - /api/admin

router
     .route("/dashboard")
     .get(isLoggedIn , adminDashboardData)

router
     .route("/users")
     .get(isLoggedIn , adminUserData)

router
     .route("/vendors")
     .get(isLoggedIn , adminVendorData)

router
     .route("/categories")
     .get(isLoggedIn , adminCategoryData)

router
     .route("/products")
     .get(isLoggedIn , adminProductData)

router
     .route("/bookings")
     .get(isLoggedIn , adminBookingData)

router
     .route("/feedbacks")
     .get(isLoggedIn , adminFeedbackData)




export default router;
