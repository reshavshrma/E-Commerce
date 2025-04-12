import express from 'express' ;
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {upload} from "../multer.js";
import {validate} from '../middleware/validator.js';

import {editVendorValidation} from '../test/vendorEdit.validator.js' ;
import { getAllVendors,vendorAccountDetails ,   updateVendorById , getVendorProductsByCategoryAndTag , getVendorCounts , getVendorDashboardData} from "../controller/vendor.controller.js";
import { reviewSchemaValidation } from '../test/review.validator.js';
import { addReviewToVendor, getVendorReviews } from '../controller/review.controller.js';

const router = express.Router();

//Core router - /api/vendor

router
     .route('/all-vendors')
     .get(getAllVendors)

router
     .route("/:id/account")
     .get(isLoggedIn , vendorAccountDetails)

// Fetch all products by vendor + category + tag
router
      .route("/:vendorId/products")
      .get( getVendorProductsByCategoryAndTag);

// 1. Count route
router.get("/:vendorId/dashboard-counts", getVendorCounts);

// 2. Full dashboard data
router.get("/:vendorId/dashboard-data", getVendorDashboardData);

router
     .route("/:id/review")
     .post(isLoggedIn , validate(reviewSchemaValidation), addReviewToVendor)

router
     .route("/:id/all-reviews")
     .get(isLoggedIn , getVendorReviews)

router
     .route("/:id/account/edit")
     .put( isLoggedIn, upload.single("image"), validate(editVendorValidation),updateVendorById);



export default router;