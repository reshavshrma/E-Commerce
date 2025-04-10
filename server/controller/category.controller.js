import { Category } from "../models/category.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // assuming you use this for image upload
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Controller: Add New Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      tag,
      products,
      owner,
    } = req.body;

    // 🔍 Check if category with the same title already exists
    const existingCategory = await Category.findOne({ title: title.trim() });
    if (existingCategory) {
      return res.status(400).json(
        new ApiError(400, ["Category title already exists"], "Validation Error")
      );
    }

    // ☁️ Upload image if a file is provided (Cloudinary or any service)
    const imageUrl = req.file ? await uploadOnCloudinary(req.file.path) : null;

    // ✅ Create the new category
    const newCategory = new Category({
      title: title.trim(),
      description: description || "",
      tag,
      image: imageUrl?.url || image || "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png",
      products: products || [],
      owner: owner || [],
    });

    const savedCategory = await newCategory.save();

    return res.status(201).json(
      new ApiResponse(201, { category: savedCategory }, "Category added successfully!")
    );
  } catch (error) {
    console.error("❌ Error while creating category:", error);
    return res.status(500).json(
      new ApiError(500, error.message, "Failed to create category")
    );
  }
});

// Controller: Get All Categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
      const categories = await Category.find({})
        .populate("products") // optional: remove if not needed
        .populate("owner")    // optional: remove if not needed
        .sort({ createdAt: -1 }); // newest first
  
      if (!categories || categories.length === 0) {
        return res
          .status(404)
          .json(new ApiError(404, "No categories found."));
      }
  
      return res
        .status(200)
        .json(new ApiResponse(200, { categories }, "Categories fetched successfully!"));
    } catch (error) {
      console.error("❌ Error while fetching categories:", error);
      return res
        .status(500)
        .json(new ApiError(500, error.message, "Failed to fetch categories"));
    }
  });


  const editCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
  
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
  
    // If title is being updated, check if it's already used by another category
    if (title && title !== category.title) {
      const existingTitle = await Category.findOne({ title: title.trim() });
      if (existingTitle) {
        throw new ApiError(409, "Title already exists. Please use a different one.");
      }
      category.title = title.trim();
    }
  
    if (description !== undefined) {
      category.description = description.trim();
    }
  
    if (image !== undefined) {
      category.image = image;
    }
  
    await category.save();
  
    return res
      .status(200)
      .json(new ApiResponse(200, { category }, "Category updated successfully"));
  });

  const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
  
    // Optional: Clean-up product/category relations here if needed
    // e.g. remove category reference from related products
  
    await Category.findByIdAndDelete(id);
  
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Category deleted successfully"));
  });
export { createCategory , getAllCategories , editCategory , deleteCategory };
