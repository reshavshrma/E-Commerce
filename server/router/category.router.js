import express from 'express' ;
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {validate} from '../middleware/validator.js';
import {upload} from "../multer.js";
import { categorySchemaValidation } from "../test/category.validator.js";
import { updateCategorySchemaValidation } from "../test/categoryEdit.validator.js";
import { createCategory , getAllCategories , getProductsByCategoryAndTag, editCategory, deleteCategory } from '../controller/category.controller.js';
const router = express.Router();

// Core router - /api/category

router
     .route("/")
     .get(  getAllCategories)

router
     .route("/add-category")
     .post(isLoggedIn , upload.single('image') , validate(categorySchemaValidation) , createCategory)

router
     .route("/:categoryId/:tag/products")
     .get(getProductsByCategoryAndTag)


router
     .route("/:id/edit")
     .put(isLoggedIn , upload.single('image') , validate(updateCategorySchemaValidation) , editCategory)

router
     .route("/:id/delete")
     .delete(isLoggedIn , deleteCategory)


export default router ;