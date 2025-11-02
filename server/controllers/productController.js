import Product from "../models/Product.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";
 
export const createProduct = async (req, res) => {
  try {
    const { slug, category, price, stock, discount, name, description, brand } =
      req.body;

    if (
      !name ||
      !slug ||
      !description ||
      !brand ||
      !category ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide name, slug, description, brand, category, price, and stock.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID format." });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found." });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price cannot be negative." });
    }

    if (stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative." });
    }

    if (discount !== undefined && (discount < 0 || discount > 100)) {
      return res
        .status(400)
        .json({ message: "Discount must be between 0 and 100." });
    }

    const existingProduct = await Product.findOne({ slug: slug.toLowerCase() });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product with this slug already exists.",
        existingSlug: slug,
      });
    }

    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        uploadedImages.push({
          url: file.path,
          alt: name || "Product image",
          publicId: file.filename,
        });
      });
    }

    if (uploadedImages.length === 0) {
      return res.status(400).json({
        message: "At least one product image is required.",
      });
    }

    let variants = req.body.variants;
    let shipping = req.body.shipping;

    if (typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch (e) {
        variants = [];
      }
    }

    if (typeof shipping === "string") {
      try {
        shipping = JSON.parse(shipping);
      } catch (e) {
        shipping = {};
      }
    }

    const productData = {
      name,
      slug: slug.toLowerCase(),
      description,
      brand,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      discount: discount ? parseFloat(discount) : 0,
      images: uploadedImages,
      variants: variants || [],
      shipping: shipping || {},
      isFeatured:
        req.body.isFeatured === "true" || req.body.isFeatured === true,
      status: req.body.status || "active",
    };

    const product = await Product.create(productData);

     await product.populate("category", "name slug");

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
