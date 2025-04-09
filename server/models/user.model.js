import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required!"],
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
    image: {
      type: String,
      default:
        "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png",
    },
    role: {
      type: String,
      enum: ["admin", "user", "vendor"],
      default: "user",
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product", // or Booking
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    wishlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Convert email to lowercase before saving
userSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Cleanup on user deletion
userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getFilter());
  if (!user) return next();

  await mongoose.model("Review").deleteMany({ _id: { $in: user.reviews } });
  await mongoose.model("Product").updateMany(
    { _id: { $in: user.wishlists } },
    { $pull: { wishlists: user._id } }
  );
  await mongoose.model("Product").updateMany(
    { _id: { $in: user.bookings } },
    { $pull: { bookings: user._id } }
  );

  next();
});

// 🔐 Use email as the login field instead of username
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // tells the plugin to use email as username
});

const User = mongoose.model("User", userSchema);
export { User };
