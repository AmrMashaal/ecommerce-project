import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import ProductSchema from "../../validations/ProductSchema.js";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (values) => {
    console.log("Form Values:", values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
      brand: "",
      category: "",
      price: 0,
      discount: 0,
      stock: 0,
      sold: 0,
      images: [],
      variants: [],
      shipping: {
        weight: 0,
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
        },
      },
      averageRating: 0,
      isFeatured: false,
      status: "active",
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => onSubmit(values, setLoading),
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "grid",
            gap: "15px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {/* Product Name */}
          <TextField
            label="Product Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            required
          />

          {/* Slug */}
          <TextField
            label="Slug"
            name="slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.slug && formik.errors.slug}
            error={formik.touched.slug && Boolean(formik.errors.slug)}
            required
          />

          {/* Description */}
          <TextField
            label="Description"
            name="description"
            multiline
            minRows={3}
            sx={{ gridColumn: "span 2" }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.description && formik.errors.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            required
          />

          {/* Brand */}
          <TextField
            label="Brand"
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.brand && formik.errors.brand}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            required
          />

          {/* Category */}
          <TextField
            select
            label="Category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.category && formik.errors.category}
            error={formik.touched.category && Boolean(formik.errors.category)}
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            []
          </TextField>

          {/* Price */}
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.price && formik.errors.price}
            error={formik.touched.price && Boolean(formik.errors.price)}
            required
          />

          {/* Discount */}
          <TextField
            label="Discount (%)"
            name="discount"
            type="number"
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.discount && formik.errors.discount}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
          />

          {/* Stock */}
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.stock && formik.errors.stock}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            required
          />

          {/* Is Featured */}
          <FormControlLabel
            control={
              <Checkbox
                name="isFeatured"
                checked={formik.values.isFeatured}
                onChange={formik.handleChange}
              />
            }
            label="Featured Product"
            sx={{ gridColumn: "span 2" }}
          />

          {/* Status */}
          <TextField
            select
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.status && formik.errors.status}
            error={formik.touched.status && Boolean(formik.errors.status)}
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </TextField>

          {/* Image Upload (Cloudinary later) */}
          <Box sx={{ gridColumn: "span 2" }}>
            <Typography fontSize="14px" mb={1}>
              Product Images
            </Typography>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={(e) => formik.setFieldValue("images", e.target.files)}
            />
            {formik.touched.images && formik.errors.images && (
              <Typography color="error" fontSize="13px">
                {formik.errors.images}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            background: "linear-gradient(35deg, #0a291aff, #215d11ff)",
            mt: 3,
            p: 1.2,
          }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
