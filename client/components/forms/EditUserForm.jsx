import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import EditUserSchema from "../../validations/EditUserSchema";
import egyptGovernorates from "../../utils/EgGovr";
import { useState } from "react";

const EditUserForm = ({ initialValues, onSubmit, setIsEdit }) => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditUserSchema,
    onSubmit: (values) =>
      onSubmit(values, setLoading, setAlertMessage, setIsEdit),
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Box display="flex" flexDirection="column" gap="5px">
            <TextField
              label="Username"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              helperText={formik.touched.username && formik.errors.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />

            {alertMessage === "Username already exists" && (
              <Typography color="red" fontSize="12px" textAlign="left">
                {alertMessage}
              </Typography>
            )}
          </Box>

          <Box display="flex" flexDirection="column" gap="5px">
            <TextField
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />

            {alertMessage === "Email already exists" && (
              <Typography color="red" fontSize="12px" textAlign="left">
                {alertMessage}
              </Typography>
            )}
          </Box>

          <TextField
            select
            label="Governorate"
            name="governorate"
            sx={{ gridColumn: "span 2" }}
            value={formik.values.governorate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.governorate && formik.errors.governorate}
            error={
              formik.touched.governorate && Boolean(formik.errors.governorate)
            }
          >
            <MenuItem
              value=""
              onClick={() => {
                formik.setFieldValue("city", "");
                formik.setFieldValue("street", "");
              }}
            >
              Choose Governorate
            </MenuItem>

            {egyptGovernorates.map((gov) => (
              <MenuItem key={gov} value={gov}>
                {gov}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="City"
            type="text"
            name="city"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.city && formik.errors.city}
            error={formik.touched.city && Boolean(formik.errors.city)}
          />

          <TextField
            label="Street"
            type="text"
            name="street"
            placeholder="Street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.street && formik.errors.street}
            error={formik.touched.street && Boolean(formik.errors.street)}
          />

          <Box display="flex" alignItems="center">
            <Checkbox
              name="isVerified"
              checked={formik.values.isVerified}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Typography fontSize="14px" sx={{ userSelect: "none" }}>
              Is Verified
            </Typography>
          </Box>

          <TextField
            select
            label="Role"
            name="role"
            sx={{ gridColumn: "span 2" }}
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.role && formik.errors.role}
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </TextField>
        </Box>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            background: "linear-gradient(35deg, #0a291aff, #215d11ff)",
            transition: "0.1s",
            p: "10px",
            mt: "20px",
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;
