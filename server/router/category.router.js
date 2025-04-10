import express from 'express' ;
import { Category } from '../models/category.model.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {validate} from '../middleware/validator.js';

const router = express.Router();

// Core router - /api/category

router
     .route("/")
     .get()

router
     .route("/:id/products")
     .get()

router
     .route("/category")
     .post()

router
     .route("/category/:id/edit")
     .put()

router
     .route("/category/:id/delete")
     .delete()


export default router ;