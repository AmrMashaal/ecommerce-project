import * as Yup from "yup";

export const ProductSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(150, "Name cannot exceed 150 characters")
    .required("Product name is required"),

  slug: Yup.string()
    .trim()
    .matches(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    )
    .required("Slug is required"),

  description: Yup.string()
    .max(5000, "Description cannot exceed 5000 characters")
    .required("Description is required"),

  brand: Yup.string().trim().required("Brand is required"),

  category: Yup.string().required("Category is required"),

  price: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Price is required"),

  discount: Yup.number()
    .min(0, "Discount cannot be less than 0")
    .max(100, "Discount cannot exceed 100%")
    .default(0),

  stock: Yup.number()
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),

  sold: Yup.number().min(0, "Sold quantity cannot be negative").default(0),

  images: Yup.array().optional(), 

  variants: Yup.array()
    .of(
      Yup.object({
        color: Yup.string().optional(),
        size: Yup.string().optional(),
        stock: Yup.number()
          .min(0, "Variant stock cannot be negative")
          .default(0),
        price: Yup.number()
          .min(0, "Variant price cannot be negative")
          .optional(),
      })
    )
    .optional(),

  shipping: Yup.object({
    weight: Yup.number().min(0, "Weight cannot be negative").optional(),
    dimensions: Yup.object({
      width: Yup.number().min(0, "Width cannot be negative").optional(),
      height: Yup.number().min(0, "Height cannot be negative").optional(),
    }).optional(),
  }).optional(),

  isFeatured: Yup.boolean().default(false),

  status: Yup.string()
    .oneOf(["active", "inactive", "draft"], "Invalid status")
    .default("active"),
});

export default ProductSchema;
