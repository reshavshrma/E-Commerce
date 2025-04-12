import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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
      vendor
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
      vendor
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

// GET /api/products/:productId
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("category", "title tag");

    if (!product) {
      return res.status(404).json(new ApiError(404, "Product not found"));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          sizes: product.sizes,
          tag: product.tag,
          category: product.category,
          vendor: product.vendor,
        },
        "Product fetched successfully"
      )
    );
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return res
      .status(500)
      .json(new ApiError(500, error.message, "Internal Server Error"));
  }
});

const updateProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, sizes, tag } = req.body;

  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(new ApiError(404, "Product not found"));
    }

    // Handle image uploads if new images are provided
    let images = product.images;
    if (req.files && req.files.length > 0) {
      images = [];
      for (const file of req.files) {
        const uploaded = await uploadOnCloudinary(file.path);
        if (uploaded?.secure_url) {
          images.push(uploaded.secure_url);
        }
      }
    }

    // Update fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.sizes = sizes || product.sizes;
    product.tag = tag || product.tag;
    product.images = images;

    await product.save();

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product updated successfully"));
  } catch (error) {
    console.error("❌ Error updating product:", error);
    return res
      .status(500)
      .json(new ApiError(500, error.message, "Failed to update product"));
  }
});

const deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(new ApiError(404, "Product not found"));
    }

    // Remove product from category's product list
    await Category.updateOne(
      { _id: product.category },
      { $pull: { products: product._id } }
    );

    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Product deleted successfully"));
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return res
      .status(500)
      .json(new ApiError(500, error.message, "Failed to delete product"));
  }
});



export { addProductController , getProductById , updateProductById , deleteProductById};
