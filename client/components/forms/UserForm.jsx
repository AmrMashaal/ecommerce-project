import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import SignupSchema from "../../validations/SignupSchema.js";
import egyptGovernorates from "../../utils/EgGovr";
import { useState } from "react";
import Alert from "../features/Alert";
import api from "../../api";

const UserForm = () => {
  const [isAddress, setIsAddress] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      governorate: "",
      city: "",
      street: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const data = await api.post(`/api/v1/auth/signup`, values);

        if (data.status === 200 || data.status === 201) {
          setMessageSent(true);
          setAlertMessage(data.data.message);
        }
      } catch (error) {
        if (error.status === 400) {
          setMessageSent(true);
          setAlertMessage(error.response.data.message);
        } else if (error.status === 409) {
          setAlertMessage(error.response.data.message);
          setMessageSent(false);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box flex="1">
      <Typography variant="h5" fontWeight="bold" textAlign="left" mb="20px">
        Add New User
      </Typography>

      <Divider sx={{ mb: "20px" }} />

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
              <Typography color="red" fontSize="12px" gridColumn="span 2">
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
              <Typography color="red" fontSize="12px" gridColumn="span 2">
                {alertMessage}
              </Typography>
            )}
          </Box>

          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />

          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          />

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
                setIsAddress(false);
                formik.setFieldValue("city", "");
                formik.setFieldValue("street", "");
              }}
            >
              Choose Governorate
            </MenuItem>

            {egyptGovernorates.map((gov) => (
              <MenuItem
                key={gov}
                value={gov}
                onClick={() => setIsAddress(true)}
              >
                {gov}
              </MenuItem>
            ))}
          </TextField>

          {isAddress && (
            <>
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
            </>
          )}
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
          {loading ? "Loading..." : "Add User"}
        </Button>
      </form>

      {messageSent && (
        <Alert setIsOpen={setMessageSent} isOpen={messageSent}>
          <img
            src="/sent-email.jpg"
            alt="Design"
            width="100px"
            className="lockImage"
          />
          <Typography fontWeight="bold" fontSize="26px" mt="-10px">
            {alertMessage}
          </Typography>

          <Typography fontSize="14px" color="#555" mt="10px">
            You're almost there! We've sent an email to{" "}
          </Typography>

          <Typography fontWeight="bold" fontSize="17px" color="#555">
            {formik.values.email}
          </Typography>

          <Typography fontSize="14px" color="#555" mt="15px">
            Just click on the link in that email to complete your signup. <br />{" "}
            if you don't see it, please <strong>check your spam</strong> folder
          </Typography>

          <a href="https://mail.google.com" target="_blank">
            <Button
              variant="outlined"
              sx={{ gap: "6px", fontWeight: "normal", mt: "20px" }}
              fullWidth
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4caf50"
                  d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
                ></path>
                <path
                  fill="#1e88e5"
                  d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
                ></path>
                <polygon
                  fill="#e53935"
                  points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
                ></polygon>
                <path
                  fill="#c62828"
                  d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
                ></path>
                <path
                  fill="#fbc02d"
                  d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
                ></path>
              </svg>
              Open Gmail
            </Button>
          </a>
        </Alert>
      )}
    </Box>
  );
};

export default UserForm;
