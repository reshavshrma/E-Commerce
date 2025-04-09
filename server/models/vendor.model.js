import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required!"],
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required!"],
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone number is required!"],
      validate: {
        validator: (v) => /^[0-9]{10}$/.test(v),
        message: "Phone number must be a 10-digit number.",
      },
    },
    address: {
      area: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      image: {
        type: String,
        default:
          "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png",
      },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    role: {
      type: String,
      enum: ["vendor"],
      default: "vendor",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    bookings: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        bookedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Normalize email and username
vendorSchema.pre("save", function (next) {
  if (this.isModified("email")) this.email = this.email.toLowerCase();
  if (this.isModified("username")) this.username = this.username.toLowerCase();
  next();
});

// Clean up associated data on delete (optional, depending on your logic)
// vendorSchema.pre("findOneAndDelete", async function (next) {
//   const vendor = await this.model.findOne(this.getFilter());
//   if (!vendor) return next();
//   await mongoose.model("Product").deleteMany({ _id: { $in: vendor.products } });
//   next();
// });

// Add username/password auth via passport-local-mongoose
vendorSchema.plugin(passportLocalMongoose); // defaults to username+password

const Vendor = mongoose.model("Vendor", vendorSchema);
export { Vendor };
