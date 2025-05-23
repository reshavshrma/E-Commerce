import { Vendor } from "../models/vendor.model.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Booking } from "../models/booking.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


const getAllVendors = asyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find({}).select("-password -__v");

    if (!vendors || vendors.length === 0) {
      throw new ApiError(404, "No vendors found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, vendors, "Fetched all vendors successfully"));
  } catch (error) {
    console.error("❌ Error fetching vendors:", error);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiError(
          error.statusCode || 500,
          error.message || "Failed to fetch vendors"
        )
      );
  }
});


// 📦 Get Vendor Account Details Controller
const vendorAccountDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // 🛑 Validate presence of ID
    if (!id) {
      return res.status(400).json(
        new ApiError(400, "Vendor ID is required!")
      );
    }

    // 🛑 Validate proper MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(
        new ApiError(400, "Invalid ID", "Invalid Vendor ID format!")
      );
    }

    // 🔍 Fetch vendor by ID and populate related references
    const vendorInfo = await Vendor.findById(id)
      .select("-salt -hash -__v") // exclude sensitive fields added by passport-local-mongoose
      .populate("products")
      .populate("categories")
      .populate({
        path: "bookings.user",
        select: "name email"
      })

    if (!vendorInfo) {
      return res.status(404).json(
        new ApiError(404, null, "Vendor not found!")
      );
    }

    console.log("✅ Vendor Info =>", vendorInfo);

    return res.status(200).json(
      new ApiResponse(200, { vendorInfo }, "Vendor details fetched successfully!")
    );
  } catch (error) {
    console.error("❌ Error fetching vendor details:", error);
    return res.status(500).json(
      new ApiError(500, error?.message, "Failed to fetch vendor details.")
    );
  }
});

const addNewVendor = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    email,
    phone,
    password,
    role,
    products,
    categories,
    reviews,
    bookings,

    // Destructure address parts
    address: {
      area,
      city,
      pincode,
      state,
      country,
    } = {}, // Default to empty object if not provided
  } = req.body;

  // Handle image (uploaded or fallback URL)
  const image = req.file?.path || req.body.image;

  try {
    const newVendor = new Vendor({
      name,
      username,
      email,
      phone,
      address: {
        area,
        city,
        pincode,
        state,
        country,
      },
      image,
      role: role || "vendor",
      products: products || [],
      categories: categories || [],
      reviews: reviews || [],
      bookings: bookings || [],
    });

    const registeredVendor = await Vendor.register(newVendor, password);

    return res.status(201).json(
      new ApiResponse(201, registeredVendor, "Vendor registered successfully")
    );
  } catch (error) {
    console.error("❌ Error in vendor registration:", error);
    return res.status(500).json(
      new ApiError(500, error.message, "Vendor registration failed")
    );
  }
});

const updateVendorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    username,
    email,
    phone,
    address, // Full address object
  } = req.body;

  let vendor = await Vendor.findById(id);
  if (!vendor) {
    return res.status(404).json(new ApiError(404, "Vendor not found"));
  }

  // Check for unique email/phone if changed
  if (email && email.toLowerCase() !== vendor.email) {
    const existingEmail = await Vendor.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json(new ApiError(400, "Email already exists"));
    }
  }

  if (phone && phone !== vendor.phone) {
    const existingPhone = await Vendor.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json(new ApiError(400, "Phone already exists"));
    }
  }

  // Upload new image if provided
  let image = vendor.image;
  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (uploaded?.secure_url) {
      image = uploaded.secure_url;
    }
  }

  // Update fields
  vendor.name = name || vendor.name;
  vendor.username = username?.toLowerCase() || vendor.username;
  vendor.email = email?.toLowerCase() || vendor.email;
  vendor.phone = phone || vendor.phone;
  vendor.image = image;

  // Full nested address
  if (address) {
    vendor.address = {
      area: address.area || vendor.address.area,
      city: address.city || vendor.address.city,
      pincode: address.pincode || vendor.address.pincode,
      state: address.state || vendor.address.state,
      country: address.country || vendor.address.country,
    };
  }

  await vendor.save();

  return res.status(200).json(new ApiResponse(200, vendor, "Vendor updated successfully"));
});

const deleteVendorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const vendor = await Vendor.findById(id);
  if (!vendor) {
    return res.status(404).json(new ApiError(404, "Vendor not found"));
  }

  await Vendor.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, {}, "Vendor deleted successfully"));
});

// 2️⃣ Fetch products by vendor, category, and tag
const getVendorProductsByCategoryAndTag = async (req, res) => {
  const { vendorId } = req.params;
  const { categoryTitle, tag } = req.query; // Ex: ?categoryTitle=hoodies&tag=male

  try {
    // Find the correct category
    const category = await Category.findOne({ title: categoryTitle, tag });
    if (!category) return res.status(404).json({ success: false, message: "Category not found." });

    // Fetch products based on vendor + category + tag
    const products = await Product.find({
      vendor: vendorId,
      category: category._id,
      tag: tag,
    }).populate("category").populate("vendor");

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching vendor's products by category and tag:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getVendorCounts = async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const productCount = await Product.countDocuments({ vendor: vendorId });
    const categoryCount = await Category.countDocuments({
      _id: { $in: (await Product.find({ vendor: vendorId }).distinct("category")) }
    });
    const bookingCount = await Booking.countDocuments({ vendor: vendorId });

    return res.status(200).json({
      success: true,
      data: {
        productCount,
        categoryCount,
        bookingCount,
      },
    });
  } catch (err) {
    console.error("Error getting vendor counts", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendor counts.",
    });
  }
};

const getVendorDashboardData = async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const products = await Product.find({ vendor: vendorId }).populate("category");
    const bookings = await Booking.find({ vendor: vendorId }).populate("product user");

    const categoryIds = await Product.find({ vendor: vendorId }).distinct("category");
    const categories = await Category.find({ _id: { $in: categoryIds } });

    return res.status(200).json({
      success: true,
      data: {
        products,
        categories,
        bookings,
      },
    });
  } catch (err) {
    console.error("Error fetching vendor data", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendor dashboard data.",
    });
  }
};
export {getAllVendors,  vendorAccountDetails , addNewVendor , updateVendorById , deleteVendorById ,getVendorProductsByCategoryAndTag , getVendorCounts , getVendorDashboardData };
