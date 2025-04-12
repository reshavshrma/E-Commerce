import {Faq} from "../models/faq.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const faqData = asyncHandler( async ( req , res) => {
    try {
      const faq = await Faq.find({});
  
      if(!faq){
        return res.status(404).json({
          status:404,
          message:"Service not found ",
          details :["Unable to find FAQs"]
        })
      }
  
      return res.status(200).json(
        new ApiResponse(200 , {faq} , "FAQS fetched successfully!")
      )
    }
     catch (error) {
      return res.status(400).json(
        new ApiError(400 , error , "Unable to fetch FAQs !")
      )
    }
  });

export {faqData}