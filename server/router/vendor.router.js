import express from 'express' ;
import { Vendor } from '../models/vendor.model.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {upload} from "../multer.js";
import {validate} from '../middleware/validator.js';
import {vendorSchemaValidation} from '../test/vendor.validator.js' ;
import {editVendorValidation} from '../test/vendorEdit.validator.js' ;
import { getAllVendors,vendorAccountDetails , addNewVendor , updateVendorById , deleteVendorById} from "../controller/vendor.controller.js";

const router = express.Router();

//Core router - /api/vendor

router
     .route('/all-vendors')
     .get(getAllVendors)

router
     .route("/:id/account")
     .get(isLoggedIn , vendorAccountDetails)

router
     .route("/add-vendor")
     .post(isLoggedIn , upload.single("image") ,  validate(vendorSchemaValidation) , addNewVendor)

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

router
     .route("/:id/account/edit")
     .put( isLoggedIn, upload.single("image"), validate(editVendorValidation),updateVendorById);

router
     .route("/:id/account/delete")
     .delete(isLoggedIn, deleteVendorById);
   
export default router;