import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import loginSchema from "../../validations/LoginSchema.js";
import { useState } from "react";
import { setAccessToken } from "../../utils/tokenStore";
import { useDispatch } from "react-redux";
import { setLogin } from "../../states";
import api from "../../api";
import Alert from "../features/Alert";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMail, setIsMail] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setIsError(false);

      try {
        const res = await api.post(`/api/v1/auth/login`, values);

        setAccessToken(res.data.accessToken);
        dispatch(setLogin({ user: res.data.user }));
        navigate("/");
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV === "development") {
          console.log("Login error:", error);
        }

        if (error.response.status === 404 || error.response.status === 401) {
          setIsError(true);
        }

        if (error.response.status === 403) {
          setIsMail(true);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box flex="1">
      <img
        src="/white-logo.png"
        alt="logo"
        width="80"
        className="lockImage"
        style={{
          padding: "10px 20px",
          background: "linear-gradient(35deg, #0a291aff, #215d11ff)",
          borderRadius: "8px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <Box mb="20px">
        <Typography fontSize="23px" fontWeight="600">
          Welcome Back!
        </Typography>

        <Typography color="#888" fontSize="13px" fontWeight="bold">
          Log in to your account to continue
        </Typography>
      </Box>

      <Divider sx={{ mb: "20px" }} />

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap="10px">
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
        </Box>

        {isError && (
          <Typography color="red" fontSize="13px" mt="10px">
            Invalid email or password
          </Typography>
        )}

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
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      <Typography color="#888" fontSize="13px" mt="10px" fontWeight="bold">
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#0a2914" }}>
          Signup
        </Link>
      </Typography>

      {isMail && (
        <Alert setIsOpen={setIsMail} isOpen={isMail}>
          <img
            src="/sent-email.jpg"
            alt="Design"
            width="100px"
            className="lockImage"
          />
          <Typography fontWeight="bold" fontSize="26px" mt="-10px">
            We already sent you a verification email!
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

export default LoginForm;
