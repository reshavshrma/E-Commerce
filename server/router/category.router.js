import express from 'express' ;

import {  getAllCategories , getCategoryById, getProductsByCategoryAndTag } from '../controller/category.controller.js';
const router = express.Router();

// Core router - /api/category

router
     .route("/")
     .get(  getAllCategories)

router
     .route("/:id")
     .get( getCategoryById )


router
     .route("/:id/:tag/products")
     .get(getProductsByCategoryAndTag)




export default router ;