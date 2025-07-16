"use client";
import React from "react";
import { Hero } from "@/assets/png";
import { Button, Input } from "@/components/shared";
import { useLoginMutation } from "@/services";
import { useFormik } from "formik";
import { setCookie } from "@/utils";
import { loginSuccess, setRole, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { APP_PATHS } from "@/constants";

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
        if (response?.user) {
          setCookie("_tk", response?.token);
          dispatch(loginSuccess(response?.user));
          dispatch(setRole(response?.role));
          router.push(APP_PATHS.DASHBOARD);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
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
            <div>#Logo</div>
            <div>
              <h3 className="font-semibold text-xl">Sign-In</h3>
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
                <span className="text-blue-900">Create an account</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
