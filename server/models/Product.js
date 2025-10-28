import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number, // percentage (0–100)
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    variants: [
      {
        color: String,
        size: String,
        stock: { type: Number, default: 0 },
        price: Number,
      },
    ],
    shipping: {
      weight: Number, // in grams
      dimensions: {
        width: Number,
        height: Number,
      },
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
