
import express from "express";
import  {faqData} from "../controller/navigation.controller.js" ;
const router = express.Router();

// CORE router - /api/navigation

router
     .route('/contact')
     .post()

router
     .route('/faqs')
     .get(faqData)





export default router ;
