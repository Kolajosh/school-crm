"use client";
import React from "react";
import { Hero, Logo } from "@/assets/png";
import { Button, Input } from "@/components/shared";
import { useRegisterMutation } from "@/services";
import { useFormik } from "formik";
import { getErrorMessage, setCookie } from "@/utils";
import { loginSuccess, setRole, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { APP_PATHS } from "@/constants";
import { registerSchema } from "@/validations";
import { toast } from "react-toastify";
import Image from "next/image";

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
          toast.success(response?.message || "Registration successful");
          setCookie("_tk", response?.data?.access_token);
          dispatch(loginSuccess(response?.data?.user));
          dispatch(setRole(response?.data?.role));
          router.push(APP_PATHS.DASHBOARD);
        }
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message || "Something went wrong");
      }
    },
    validationSchema: registerSchema,
  });

  const { isValid, dirty, handleSubmit } = formik;

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
            <div className="flex items-center justify-center gap-2 mb-5">
              <Image src={Logo} width={50} height={50} alt="Logo" />
              <p className="font-semibold text-2xl">EduSphere</p>
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
