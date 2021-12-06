import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(6, "Password should contain atleast 6 characters")
    .required("Enter your password"),
});

export const SingupValidationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(6, "Password should contain atleast 6 characters")
    .required("Enter your password"),
});
