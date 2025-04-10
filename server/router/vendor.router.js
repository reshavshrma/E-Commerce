import express from 'express' ;
import { Vendor } from '../models/vendor.model.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {validate} from '../middleware/validator.js';
import {vendorSchemaValidation} from '../test/vendor.validator.js' ;

const router = express.Router();

//Core router - /api/vendor

router
     .route("/:id/account")
     .get()

router
     .route("/:id/categories")
     .get()

router
     .route("/:id/products")
     .get()

router
     .route("/:id/review")
     .post()

router
     .route("/:id/all-reviews")
     .get()

export default router;