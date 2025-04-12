import { Booking } from "../models/booking.model.js";
import { Product } from "../models/product.model.js";

const createBooking = async (req, res) => {
    try {
      const { user, vendor, product, category, quantity } = req.body;
  
      // Find product to get the price
      const foundProduct = await Product.findById(product);
      if (!foundProduct) {
        return res.status(404).json({ success: false, message: "Product not found." });
      }
  
      const totalPrice = quantity * foundProduct.price;
  
      const newBooking = new Booking({
        user,
        vendor,
        product,
        category,
        quantity,
        totalPrice,
      });
  
      const savedBooking = await newBooking.save();
  
      return res.status(201).json({
        success: true,
        message: "Booking created successfully.",
        data: savedBooking,
      });
  
    } catch (err) {
      console.error("Booking error:", err);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  };

  const getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("user", "name email")
        .populate("vendor", "name phone")
        .populate("product", "title price")
        .populate("category", "title tag");
  
      res.status(200).json({
        success: true,
        message: "All bookings fetched successfully.",
        data: bookings,
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch bookings.",
      });
    }
  };
  
  const deleteBooking = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await Booking.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Booking not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Booking deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
  
  export {createBooking , getAllBookings , deleteBooking}