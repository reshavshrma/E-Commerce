// import mongoose from "mongoose";
// const Schema  = mongoose.Schema; 

// const faqSchema = new Schema (
//     {
//         title : {
//             type:String,
//             required: true,
//         },
//         solution:{
//             type:String,
//             required: true,
//         },
//     } ,
//     { timestamps : true});

// const Faq = new mongoose.model ("Faq", faqSchema);

// export  {Faq} ;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the FAQ schema
const faqSchema = new Schema(
    {
        title: {
            type: String,
            required: true,  // The title of the FAQ is mandatory
        },
        solution: {
            type: String,
            required: true,  // The solution to the FAQ is mandatory
        },
    },
    { timestamps: true }  // Automatically adds createdAt and updatedAt
);

// Create the model based on the schema
const Faq = new mongoose.model("Faq", faqSchema);

export { Faq };  // Export the Faq model to be used in other files
