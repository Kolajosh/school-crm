import * as Yup from "yup";

export const studentValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+\d{10,15}$/, "Enter a valid phone number with country code"),

  date_of_birth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),

  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Select a valid gender"),

  parent_id: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : Number(originalValue)
    ),
});
