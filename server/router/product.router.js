import express from 'express' ;
import { Product } from '../models/product.model.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {validate} from '../middleware/validator.js';

const router = express.Router();

// CORE router - /api/product

router
     .route("/add-product")
     .post()

router
     .route("/:id/edit")
     .put()

router
     .route("/:id/delete")
     .delete()


export default router ;