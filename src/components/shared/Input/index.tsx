/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  useState,
  SyntheticEvent,
  ChangeEvent,
  forwardRef,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import styles from "./styles.module.css";
import { FormikProps } from "formik";
import { EyeClosed, EyeOpen, LoadingIcon, Minus, Plus } from "@/assets";

type InputType = {
  type?: string;
  variant?: "text" | "number";
  onClick?: () => void;
  label?: string | ReactNode;
  labelClasses?: string;
  className?: string;
  id?: string;
  isAdminApproveRequest?: boolean;
  name: string;
  formik?: FormikProps<any>;
  placeholder?: string | "";
  Icon?: any;
  hideError?: boolean;
  disabled?: boolean;
  maxLength?: number;
  minVal?: number;
  loading?: boolean;
  prefix?: string;
};

const Input = forwardRef(function CustomInput(
  {
    type,
    onClick,
    label,
    labelClasses,
    className,
    id,
    isAdminApproveRequest = false,
    name,
    formik,
    Icon,
    hideError = false,
    disabled = false,
    loading = false,
    variant = "text",
    maxLength,
    minVal = 0,
    prefix,
    ...rest
  }: InputType,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [inputType, setInputType] = useState(type || "text");
  const [isFocused, setIsFocused] = useState(false);
  const [initialNumberOfTerminal, setInitialNumberOfTerminal] = useState<
    number | null
  >(null);
  const error = useMemo(
    () => formik && formik.touched?.[name] && formik.errors?.[name],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik?.touched, formik?.errors, name]
  );

  let classes = `${styles.container} ${className} flex flex-col relative`;
  if (type === "password" || type === "email")
    classes += ` ${styles["padding-right"]}`;
  const status = formik && formik.touched?.[name] && formik.status?.[name];
  if (error || status) classes += ` ${styles["error"]}`;

  const placeholder = rest.placeholder;

  // Handler
  const handleClick = useCallback(() => {
    if (type === "password") {
      if (inputType === "password") {
        setInputType("text");
      } else setInputType("password");
    }
  }, [inputType, type]);

  const handleValue = useCallback(
    (value: string) => {
      if (name === "email") {
        value = value?.trim();
      }
      if (variant === "number") {
        value = value.replace(/\D/g, "");
      }
      return value;
    },
    [variant, name]
  );

  const handleValueOnBlur = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      let value = handleValue(e.currentTarget.value);
      if (variant === "number") {
        if (
          value &&
          minVal &&
          !isNaN(Number(value)) &&
          Number(value) < minVal
        ) {
          value = minVal?.toString();
        }

        if (name === "numberOfTerminal" && initialNumberOfTerminal === null) {
          setInitialNumberOfTerminal(Number(value));
        }
      }

      formik?.setFieldValue(name, value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik?.values, name, variant, minVal]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formik?.setFieldValue(name, handleValue(e.target.value));

      if (
        (name === "confirm_password" || name === "password") &&
        formik?.values &&
        typeof formik?.values === "object" &&
        Object.keys(formik?.values).includes("confirm_password")
      ) {
        if (
          (name === "confirm_password" &&
            formik?.values?.password !== e.target.value) ||
          (name === "password" &&
            formik?.values?.confirm_password !== e.target.value)
        ) {
          formik?.setStatus({
            ...formik?.status,
            confirm_password: "Passwords do not match",
          });
        } else {
          delete formik?.status?.confirm_password;
          formik?.setStatus(formik?.status || {});
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik?.values, formik?.status, name, handleValue]
  );

  const handleMinus = useCallback(() => {
    formik?.setFieldValue(
      name,
      !isNaN(Number(formik?.values[name])) &&
        Number(formik?.values[name]) > minVal
        ? Number(formik?.values[name]) - 1
        : minVal
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values, name, minVal]);

  const handleAdd = useCallback(() => {
    formik?.setFieldValue(
      name,
      (!isNaN(Number(formik?.values[name]))
        ? Number(formik?.values[name])
        : 0) + 1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values, name]);

  if (formik) {
    Object.assign(rest, {
      onChange: disabled ? undefined : handleChange,
      onBlur: (e: SyntheticEvent<HTMLInputElement>) => {
        handleValueOnBlur(e);
        setIsFocused(false);
        return formik?.handleBlur(e);
      },
      value: formik?.values[name],
    });
  }

  return (
    <div className={classes}>
      {label && (
        <label
          className={`${
            isFocused ? styles["active"] : ""
          } mb-2 ${labelClasses}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      {Icon ? (
        <Icon
          className={`${formik?.values[name] && "hidden"} ${styles.icon}`}
        />
      ) : (
        ""
      )}
      <div className="flex relative">
        {variant === "number" &&
          (name === "numberOfAgents" || name === "numberOfTerminal") && (
            <button
              type="button"
              disabled={
                isAdminApproveRequest &&
                Number(formik?.values[name]) !== initialNumberOfTerminal
              }
              onClick={handleMinus}
              className={`flex items-center justify-center border-l border-y border-[#C4C4D0] w-14 h-12 rounded-[3px] rounded-r-none  ${
                isAdminApproveRequest && styles["icon-disabled"]
              }`}
            >
              <Minus />
            </button>
          )}
        {prefix && (
          <span className="text-sm text-[#C4C4C4] !absolute !left-3 !top-[14px] !w-fit">
            {prefix}
          </span>
        )}
        <input
          style={{
            borderRadius:
              variant === "number" &&
              (name === "numberOfAgents" || name === "numberOfTerminal")
                ? 0
                : undefined,
            textAlign:
              variant === "number" &&
              (name === "numberOfAgents" || name === "numberOfTerminal")
                ? "center"
                : "left",
          }}
          className={`flex-grow ${prefix && "!pl-12"} ${
            Icon && "placeholder:pl-3"
          }`}
          maxLength={maxLength}
          id={id ?? name}
          name={name}
          type={inputType}
          onClick={onClick}
          // onChange={handleChange}
          onBlur={(e) => {
            handleValueOnBlur(e);
            setIsFocused(false);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          {...rest}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
        />
        {variant === "number" &&
          (name === "numberOfAgents" || name === "numberOfTerminal") && (
            <button
              type="button"
              disabled={
                isAdminApproveRequest &&
                Number(formik?.values[name]) !== initialNumberOfTerminal
              }
              onClick={handleAdd}
              className={`flex items-center justify-center border-r border-y border-[#C4C4D0] w-14 h-12 rounded-[3px] rounded-l-none ${
                isAdminApproveRequest && styles["icon-disabled"]
              }`}
            >
              <Plus />
            </button>
          )}
        {type === "password" && (
          <button
            type="button"
            onClick={handleClick}
            className="flex items-center justify-center border-none w-8 h-8 absolute right-3 top-2"
          >
            {inputType === "password" ? <EyeOpen /> : <EyeClosed />}
          </button>
        )}
        {type !== "password" && loading && (
          <LoadingIcon className="h-4 w-4 absolute right-3 top-4 animate-spin" />
        )}
      </div>
      {(error || status) && !hideError && (
        <div className={`${styles["error-message"]}`}>{error || status}</div>
      )}
    </div>
  );
});

export default Input;
