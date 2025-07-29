import * as Yup from "yup";

export const teacherValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be between 10 to 15 digits")
    .required("Phone number is required"),
  subject_specialty: Yup.string().required("Subject specialty is required"),
  qualification: Yup.string().required("Qualification is required"),
  date_of_birth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Select a valid gender")
    .required("Gender is required"),
});
