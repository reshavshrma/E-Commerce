import express from 'express' ;
import { Product } from '../models/product.model.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {validate} from '../middleware/validator.js';
import {productSchemaValidation} from "../test/product.validator.js";
import { editProductSchemaValidation } from '../test/productEdit.validator.js';
import {addProductController , getProductById , updateProductById , deleteProductById} from "../controller/product.controller.js";
import { upload } from '../multer.js';

const router = express.Router();

// CORE router - /api/product

router
     .route("/add-product")
     .post(isLoggedIn ,  upload.array("images", 7) , validate(productSchemaValidation) , addProductController)

router
     .route("/:id")
     .get(getProductById)

router
     .route("/:id/edit")
     .put(isLoggedIn , upload.array("images", 7) , validate(editProductSchemaValidation) , updateProductById )

router
     .route("/:id/delete")
     .delete(isLoggedIn , deleteProductById)


export default router ;