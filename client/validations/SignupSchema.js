import * as Yup from "yup";
 
const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Min 2 chars")
    .max(30, "Max 30 chars")
    .matches(
      /^(?!.*\.\.)(?!.*\.$)(?=.*[a-zA-Z])(?![_.])[a-zA-Z0-9._]+$/,
      "Invalid username"
    )
    .required("Username is required"),

  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Min 8 chars")
    .max(64, "Max 64 chars")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Confirm password"),

  governorate: Yup.string().max(200, "Too long").nullable(),
  city: Yup.string().max(200, "Too long").nullable(),
  street: Yup.string().max(200, "Too long").nullable(),
 });

export default signupSchema;
