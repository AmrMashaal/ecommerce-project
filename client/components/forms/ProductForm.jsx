import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import { useState } from "react";
import ProductSchema from "../../validations/ProductSchema.js";
import { useEffect } from "react";
import api from "../../api.js";
import { useDropzone } from "react-dropzone";
import { Close, Delete } from "@mui/icons-material";
import Toast from "../features/Toast";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [formikRef, setFormikRef] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info", // "info", "success", "warning", "error"
  });

  const onDrop = (acceptedFiles) => {
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImagesPreview((prev) => [...prev, ...previews]);

    const currentFiles = [...imageFiles, ...acceptedFiles];
    setImageFiles(currentFiles);
    if (formikRef) {
      formikRef.setFieldValue("images", currentFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  const onSubmit = async (values, { resetForm }) => {
    if (imageFiles.length === 0) {
      setToast({
        open: true,
        message: "Please upload at least one product image.",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("slug", values.slug);
    formData.append("description", values.description);
    formData.append("brand", values.brand);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("stock", values.stock);
    formData.append("isFeatured", values.isFeatured);
    formData.append("status", values.status);

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    if (values.variants && values.variants.length > 0) {
      formData.append("variants", JSON.stringify(values.variants));
    }

    if (values.shipping) {
      formData.append("shipping", JSON.stringify(values.shipping));
    }

    setLoading(true);
    try {
      const response = await api.post("/api/v1/products/", formData);

      setToast({
        open: true,
        message: response.data.message || "Product created successfully!",
        severity: "success",
      });

      resetForm();
      setImagesPreview([]);
      setImageFiles([]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create product. Please try again.";

      setToast({
        open: true,
        message: errorMessage,
        severity: "error",
      });

      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error("Product creation error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/v1/categories/");

      const categoryList = [];

      res.data.forEach((category) => {
        categoryList.push({
          id: category._id,
          name: category.name,
        });
      });
      setCategories(categoryList);
    } catch (error) {
      setToast({
        open: true,
        message: "Failed to load categories",
        severity: "error",
      });

      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error("Error fetching categories:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Formik
      initialValues={{
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
            width: 0,
            height: 0,
          },
        },
        isFeatured: false,
        status: "active",
      }}
      validationSchema={ProductSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        // Store formik instance for use in onDrop callback
        if (!formikRef) {
          setFormikRef(formik);
        }

        return (
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
                helperText={
                  formik.touched.description && formik.errors.description
                }
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
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
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                required
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
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
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
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

              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed #215d11",
                  borderRadius: "10px",
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: isDragActive ? "#e8f5e9" : "transparent",
                  transition: "0.2s",
                  gridColumn: "span 2",
                }}
              >
                <input {...getInputProps()} />
                <Typography>
                  {isDragActive
                    ? "Drop images here..."
                    : "Drag & drop or click to browse"}
                </Typography>
              </Box>
            </Box>

            {/* Preview section */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                my: 2,
              }}
            >
              {imagesPreview.map((src, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 2,
                  }}
                >
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => {
                      const newPreviews = imagesPreview.filter(
                        (_, i) => i !== index
                      );
                      setImagesPreview(newPreviews);

                      const newFiles = imageFiles.filter((_, i) => i !== index);
                      setImageFiles(newFiles);
                      if (formikRef) {
                        formikRef.setFieldValue("images", newFiles);
                      }
                    }}
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "white",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {/* Variants */}
            <FieldArray
              name="variants"
              render={(arrayHelpers) => (
                <Box>
                  {formik.values.variants.map((variant, index) => (
                    <Box key={index}>
                      <Divider sx={{ my: 2 }} />
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr) auto",
                          gap: 2,
                          mb: 2,
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          label="Color"
                          name={`variants[${index}].color`}
                          value={variant.color}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.touched.variants?.[index]?.color &&
                            formik.errors.variants?.[index]?.color
                          }
                          error={
                            formik.touched.variants?.[index]?.color &&
                            Boolean(formik.errors.variants?.[index]?.color)
                          }
                        />

                        <TextField
                          label="Size"
                          name={`variants[${index}].size`}
                          value={variant.size}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.touched.variants?.[index]?.size &&
                            formik.errors.variants?.[index]?.size
                          }
                          error={
                            formik.touched.variants?.[index]?.size &&
                            Boolean(formik.errors.variants?.[index]?.size)
                          }
                        />

                        <TextField
                          label="Stock"
                          name={`variants[${index}].stock`}
                          type="number"
                          value={variant.stock}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.touched.variants?.[index]?.stock &&
                            formik.errors.variants?.[index]?.stock
                          }
                          error={
                            formik.touched.variants?.[index]?.stock &&
                            Boolean(formik.errors.variants?.[index]?.stock)
                          }
                        />

                        <TextField
                          label="Price"
                          name={`variants[${index}].price`}
                          type="number"
                          value={variant.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.touched.variants?.[index]?.price &&
                            formik.errors.variants?.[index]?.price
                          }
                          error={
                            formik.touched.variants?.[index]?.price &&
                            Boolean(formik.errors.variants?.[index]?.price)
                          }
                        />

                        <IconButton
                          color="error"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}

                  <Button
                    variant="outlined"
                    onClick={() =>
                      arrayHelpers.push({
                        color: "",
                        size: "",
                        stock: 0,
                        price: 0,
                      })
                    }
                  >
                    Add Variant
                  </Button>
                </Box>
              )}
            />

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

            <Toast
              open={toast.open}
              message={toast.message}
              severity={toast.severity}
              onClose={() => setToast({ ...toast, open: false })}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
