import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required!"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required!"],
      min: [0, "Price must be a positive number"],
    },
    images: {
      type: [String],
      validate: [
        {
          validator: function (arr) {
            return arr.length <= 7;
          },
          message: "A maximum of 7 images are allowed per product.",
        },
      ],
      default: [
        "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png",
      ],
    },
    sizes: {
      type: [String],
      enum: ["xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      default: ["m"], // optional default
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    tag: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Tag (male or female) is required"],
    },

    wishlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Optional cleanup logic on deletion (if needed)
// productSchema.pre("findOneAndDelete", async function (next) {
//   const product = await this.model.findOne(this.getFilter());
//   if (!product) return next();
//   await mongoose.model("User").updateMany({}, { $pull: { wishlists: product._id, bookings: product._id } });
//   next();
// });

const Product = mongoose.model("Product", productSchema);
export { Product };
