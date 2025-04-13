import express from 'express';
import { validate } from '../middleware/validator.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {upload} from "../multer.js";
import { isAdmin } from '../middleware/admin.middleware.js';
import { adminBookingData, adminCategoryData, adminDashboardData, adminFeedbackData, adminProductData, adminUserData, adminVendorData , addCategoryToVendor} from '../controller/admin.controller.js';
import { createCategory ,  editCategory, deleteCategory } from '../controller/category.controller.js';
import {addProductController  , updateProductById , deleteProductById} from "../controller/product.controller.js";
import {   addNewVendor  , deleteVendorById} from "../controller/vendor.controller.js";
import { categorySchemaValidation } from "../test/category.validator.js";
import { updateCategorySchemaValidation } from "../test/categoryEdit.validator.js";
import {productSchemaValidation} from "../test/product.validator.js";
import { editProductSchemaValidation } from '../test/productEdit.validator.js';
import {vendorSchemaValidation} from '../test/vendor.validator.js' ;
const router = express.Router();

// Core router - /api/admin

router
     .route("/dashboard")
     .get(isLoggedIn , isAdmin, adminDashboardData)

router
     .route("/users")
     .get(isLoggedIn , isAdmin ,adminUserData)

router
     .route("/vendors")
     .get(isLoggedIn , isAdmin , adminVendorData)

router
     .route("/categories")
     .get(isLoggedIn , isAdmin , adminCategoryData)

router
     .route("/products")
     .get(isLoggedIn , isAdmin , adminProductData)

router
     .route("/bookings")
     .get(isLoggedIn , isAdmin ,  adminBookingData)

router
     .route("/feedbacks")
     .get(isLoggedIn , isAdmin , adminFeedbackData)


router
     .route("/add-category")
     .post(isLoggedIn , isAdmin , upload.single('image') , validate(categorySchemaValidation) , createCategory)

router
     .route("category/:id/edit")
     .put(isLoggedIn , isAdmin , upload.single('image') , validate(updateCategorySchemaValidation) , editCategory)

router
     .route("category/:id/delete")
     .delete(isLoggedIn ,  isAdmin , deleteCategory)


router
     .route("/add-product")
     .post(isLoggedIn , isAdmin , upload.single("image") ,
         validate(productSchemaValidation) , addProductController)

router
     .route("product/:id/edit")
     .put(isLoggedIn , isAdmin , upload.array("images", 7) , validate(editProductSchemaValidation) , updateProductById )

router
     .route("product/:id/delete")
     .delete(isLoggedIn , isAdmin , deleteProductById)


router
     .route("/add-vendor")
     .post(isLoggedIn , upload.single("image") ,  validate(vendorSchemaValidation) , addNewVendor)

// Admin adds a category to a specific vendor
router
      .route("/add-category-to-vendor/:vendorId")
      .post( isAdmin, addCategoryToVendor);

router
     .route("/:id/account/delete")
     .delete(isLoggedIn, deleteVendorById);


export default router;
