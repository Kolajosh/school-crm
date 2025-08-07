"use client";
import React from "react";
import { Hero, Logo } from "@/assets/png";
import { Button, Input } from "@/components/shared";
import { useLoginMutation } from "@/services";
import { useFormik } from "formik";
import { getErrorMessage, setCookie } from "@/utils";
import { loginSuccess, setRole, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { APP_PATHS } from "@/constants";
import { loginSchema } from "@/validations";
import { toast } from "react-toastify";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [triggerLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await triggerLogin(values).unwrap();
        if (response.success) {
          toast.success(response?.message || "Login successful");
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
    validationSchema: loginSchema,
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
              <Button
                className="!w-full"
                text="Sign in"
                disabled={!(dirty && isValid) || isLoading}
                onClick={handleSubmit}
              />
              <p className="text-sm mt-3">
                New to our platform?{" "}
                <span
                  onClick={() => router.push(APP_PATHS.REGISTER)}
                  className="text-blue-900 cursor-pointer"
                >
                  Create an account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
