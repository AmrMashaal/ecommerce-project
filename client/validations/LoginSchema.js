import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

export default loginSchema;
