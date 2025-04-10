import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Adjust the path as needed

const addProductController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      sizes,
      category,
      tag,
    } = req.body;

    // Check if category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category not found!",
      });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      // Upload each file to Cloudinary
      for (const file of req.files) {
        const cloudinaryResult = await uploadOnCloudinary(file.path);
        if (cloudinaryResult && cloudinaryResult.secure_url) {
          images.push(cloudinaryResult.secure_url);
        }
      }
    }

    const newProduct = new Product({
      title,
      description,
      price,
      images: images.length > 0 ? images : undefined,
      sizes,
      category,
      tag,

    });

    await newProduct.save();

    // Optionally push to category's product list
    existingCategory.products.push(newProduct._id);
    await existingCategory.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error in addProductController:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Could not add product.",
    });
  }
};

export { addProductController };
