import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required!"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png",
    },
    tag: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Tag (male or female) is required"],
    },
    products: [
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

// Optional: Clean-up hook on deletion
// categorySchema.pre("findOneAndDelete", async function (next) {
//   const category = await this.model.findOne(this.getFilter());
//   if (!category) return next();
//   await mongoose.model("Product").updateMany(
//     { _id: { $in: category.products } },
//     { $unset: { category: "" } }
//   );
//   next();
// });

const Category = mongoose.model("Category", categorySchema);
export { Category };
