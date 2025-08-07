"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAddStudentMutation } from "@/services";
import { studentValidationSchema } from "@/validations";
import { toast } from "react-toastify";
import { APP_PATHS } from "@/constants";
import { useFormik } from "formik";
import { getErrorMessage } from "@/utils";
import { Button, Input, Select } from "@/components/shared";

const AddStudents = () => {
  const router = useRouter();
  const [triggerAddStudent, { isLoading }] = useAddStudentMutation();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    gender: "",
    parent_id: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await triggerAddStudent(values).unwrap();
        if (response?.success) {
          toast.success(response?.message || "Added Successfully");
          router.push(APP_PATHS.STUDENTS);
        }
      } catch (error) {
        toast.error(getErrorMessage(error) || "Failed to add student");
      }
    },
    validationSchema: studentValidationSchema,
  });

  return (
    <>
      <div className="min-h-screen space-y-5">
        <div className="w-full max-w-[500px] mx-auto bg-white p-6 rounded-xl">
          <div className="mb-10">
            <h3 className="text-xl font-medium">Add Student</h3>
            <p className="text-sm font-normal">
              Please provide student details
            </p>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <p className="font-bold mb-3">Basic Information</p>
                <div className="grid grid-cols-1 gap-3 items-center">
                  <Input name="name" formik={formik} label="Name" />
                  <Input
                    name="phone"
                    formik={formik}
                    label="Phone number (Parent's Phone Number)"
                  />
                </div>
              </div>
              <div>
                <p className="font-bold mb-3">Other Information</p>
                <div className="grid grid-cols-1 gap-3 items-center">
                  <Input name="email" formik={formik} label="Email" />
                  <Input
                    type="date"
                    name="date_of_birth"
                    formik={formik}
                    label="Date of Birth"
                  />
                  <Input name="address" formik={formik} label="Address" />
                  <Select
                    name="gender"
                    label="Gender"
                    formik={formik}
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-center pt-5">
                <Button
                  text="Reset"
                  variant="outlined"
                  onClick={formik.resetForm}
                  className="!w-full"
                />
                <Button
                  type="submit"
                  text={isLoading ? "Submitting" : "Submit"}
                  disabled={isLoading}
                  className="!w-full"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudents;
