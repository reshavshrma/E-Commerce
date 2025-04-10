import express from 'express' ;
import { User } from '../models/user.model.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {validate} from '../middleware/validator.js';
import {userSchemaValidation} from '../test/user.validator.js' ;
import { loginUserValidation } from '../test/login.validator.js';
import { createNewUser , loginUser , logOutUser , checkAuthentication } from '../controller/userAuth.controller.js';
const router = express.Router();


// core router : /api/user

// Register a New user Route
router
     .route('/register')
     .post(validate(userSchemaValidation) , createNewUser);


// Login of the registered user Route
router
     .route('/login')
     .post(validate(loginUserValidation) , loginUser);


// Logout of the registered user Route
router
     .route('/logout')
     .post(isLoggedIn , logOutUser);


// Check for the user authentication Route
router
     .route('/auth')
     .get(checkAuthentication)

router
     .route('/:id/account')
     .get();

router
     .route('/:id/account/wishlists')
     .get();

router
     .route('/:id/account/bookings')
     .get();

router
     .route('/:id/account/edit')
     .put();

router
     .route('/:id/account/delete')
     .delete();


export default router;