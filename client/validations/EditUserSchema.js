import * as Yup from "yup";

const EditUserSchema = Yup.object().shape({
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

  governorate: Yup.string().max(200, "Too long").nullable(),

  city: Yup.string().max(200, "Too long").nullable(),

  street: Yup.string().max(200, "Too long").nullable(),

  isVerified: Yup.boolean().required("Verification status is required"),

  role: Yup.string()
    .oneOf(["customer", "admin"], "Invalid role")
    .required("Role is required"),

  avatar: Yup.string().url("Invalid URL").nullable(),
});

export default EditUserSchema;
