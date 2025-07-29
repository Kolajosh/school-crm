"use client";
import { Button, Input, Select } from "@/components/shared";
import { APP_PATHS } from "@/constants";
import { useTeachers } from "@/hooks";
import { useAddNewTeacherMutation } from "@/services/teachers";
import { teacherValidationSchema } from "@/validations";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const router = useRouter();
  const { qualifications, specialties } = useTeachers();
  const [addTeacherTrigger, { isLoading }] = useAddNewTeacherMutation();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    subject_specialty: "",
    qualification: "",
    date_of_birth: "",
    address: "",
    gender: "",
  };

  const addFormik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        console.log(values);

        const response = await addTeacherTrigger(values).unwrap();
        if (response?.success) {
          toast.success("Added Successfully");
          router.push(APP_PATHS.EMPLOYEES);
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: teacherValidationSchema,
  });

  return (
    <>
      <div className="min-h-screen space-y-5">
        <div className=" bg-white p-6 rounded-xl">
          <div className="mb-10">
            <h3 className="text-xl font-medium">Add Teacher</h3>
            <p className="text-sm font-normal">
              Please provide teacher details
            </p>
          </div>
          <div>
            <form onSubmit={addFormik.handleSubmit} className="space-y-5">
              <div>
                <p className="font-bold mb-3">Basic Information</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <Input name="name" formik={addFormik} label="Name" />
                  <Input name="phone" formik={addFormik} label="Phone number" />
                  <Select
                    name="qualification"
                    label="Qualification"
                    formik={addFormik}
                    options={qualifications}
                  />
                  <Select
                    name="subject_specialty"
                    label="Subject Speciality"
                    formik={addFormik}
                    options={specialties}
                  />
                </div>
              </div>
              <div>
                <p className="font-bold mb-3">Other Information</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <Input name="email" formik={addFormik} label="Email" />
                  <Input
                    type="date"
                    name="date_of_birth"
                    formik={addFormik}
                    label="Date of Birth"
                  />
                  <Input name="address" formik={addFormik} label="Address" />
                  <Select
                    name="gender"
                    label="Gender"
                    formik={addFormik}
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-center pt-10">
                <Button
                  text="Reset"
                  variant="outlined"
                  onClick={addFormik.resetForm}
                />
                <Button
                  type="submit"
                  text={isLoading ? "Submitting" : "Submit"}
                  disabled={isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
