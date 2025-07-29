"use client";
import React from "react";
import { Hero } from "@/assets/png";
import { Button, Input } from "@/components/shared";
import { useLoginMutation, useRegisterMutation } from "@/services";
import { useFormik } from "formik";
import { setCookie } from "@/utils";
import { loginSuccess, setRole, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { APP_PATHS } from "@/constants";
import { registerSchema } from "@/validations";

const Register = () => {
  const router = useRouter();
  const [triggerRegister, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const initialValues = {
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await triggerRegister(values).unwrap();
        if (response.success) {
          console.log(response?.data);

          setCookie("_tk", response?.data?.access_token);
          dispatch(loginSuccess(response?.data?.user));
          dispatch(setRole(response?.data?.role));
          router.push(APP_PATHS.DASHBOARD);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: registerSchema,
  });

  const { isValid, dirty, handleSubmit, errors } = formik;

  console.log(isValid);
  console.log(dirty);
  console.log(errors);
  

  return (
    <>
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div
          className="bg-slate-500"
          style={{
            backgroundImage: `url(${Hero.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "auto",
          }}
        ></div>
        <div className="flex justify-center items-center">
          <div className="w-[522px] px-5 space-y-5">
            <div>#Logo</div>
            <div>
              <h3 className="font-semibold text-xl">Sign-In</h3>
            </div>
            <div>
              <Input
                name="name"
                label="Name"
                placeholder="Enter your full name"
                formik={formik}
              />
            </div>
            <div>
              <Input
                name="email"
                label="Email"
                placeholder="Enter your email address"
                formik={formik}
              />
            </div>
            <div>
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                formik={formik}
              />
            </div>
            <div>
              <Input
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                formik={formik}
              />
            </div>
            <div>
              <Button
                className="!w-full"
                text="Register"
                disabled={!(dirty && isValid) || isLoading}
                onClick={handleSubmit}
              />
              <p className="text-sm mt-3">
                Existing Customer?{" "}
                <span
                  onClick={() => router.push(APP_PATHS.LOGIIN)}
                  className="text-blue-900 cursor-pointer"
                >
                  Log in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
