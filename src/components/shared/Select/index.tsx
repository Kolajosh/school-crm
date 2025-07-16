/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  useState,
  SyntheticEvent,
  Fragment,
  useMemo,
  useCallback,
} from "react";
import styles from "./styles.module.css";
import { FormikProps } from "formik";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDown2 } from "@/assets";
import { Checkbox } from "../Checkbox";

type SelectType<T> = {
  onClick?: () => void;
  label?: string;
  className?: string;
  defaultValue?: string | T;
  id?: string;
  name: string;
  formik?: FormikProps<any>;
  placeholder?: string | "";
  Icon?: any;
  options: { label: string; value: string | T }[] | string[];
  disabled?: boolean;
  multiple?: boolean;
};

function Select({
  // onClick,
  label,
  className,
  defaultValue,
  // id,
  name,
  formik,
  Icon,
  options,
  disabled = false,
  multiple = false,
  ...rest
}: SelectType<any>) {
  const [isFocused, setIsFocused] = useState(false);
  const error = formik && formik.touched[name] && formik.errors?.[name];

  let classes = `${styles.container} ${className} flex flex-col relative`;

  const status = formik && formik.status?.[name];
  if (error || status) classes += ` ${styles["error"]}`;

  const placeholder = rest.placeholder;
  if (formik) {
    Object.assign(rest, {
      onChange: handleChange,
      onBlur: (e: SyntheticEvent) => {
        setIsFocused(false);
        return formik?.handleBlur(e);
      },
      value: formik?.values[name],
    });
  }

  const allOptions = useMemo(
    () => [{ label: placeholder, value: "" }, ...options],
    [options, placeholder]
  );

  const getSelectLabel = useCallback(() => {
    let optionLabel = multiple
      ? allOptions
          .filter((option) =>
            typeof option === "string"
              ? formik?.values?.[name].includes(option)
              : formik?.values?.[name].includes(option.value)
          )
          .map((option) => (typeof option === "string" ? option : option.label))
          .join(", ")
      : allOptions.find((option) =>
          typeof option === "string"
            ? option === formik?.values?.[name]
            : option.value === formik?.values?.[name]
        );
    if (!optionLabel) optionLabel = allOptions[0];
    return typeof optionLabel === "string"
      ? optionLabel?.replace("<br/>", " ")
      : optionLabel.label?.replace("<br/>", " ");
  }, [multiple, allOptions, formik?.values, name]);

  function handleChange(e: string) {
    formik?.setValues({ ...formik?.values, [name]: e });
  }

  return (
    <div className={classes}>
      {label && (
        <label
          className={`${
            isFocused ? styles["active"] : ""
          } font-medium text-sm text-[#4f4a60] mb-2`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      {Icon ? <Icon className={`${styles.icon}`} /> : ""}
      <Listbox
        value={formik?.values?.[name] || defaultValue}
        onChange={handleChange}
        disabled={disabled}
        multiple={multiple}
      >
        <div className="relative rounded-[3px] border-[1px] border-gray-300 border-solid">
          <Listbox.Button
            className={`relative w-full cursor-pointer rounded-[3px] px-4 py-3 text-left focus:outline-none sm:text-sm flex items-center ${
              disabled && "cursor-not-allowed"
            }`}
          >
            <span className="w-[80%] block truncate mr-2 flex-grow">
              {getSelectLabel()}
            </span>
            <ArrowDown2 className="auto" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              modal={false}
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-[3px] bg-white text-base shadow-lg focus:outline-none sm:text-sm z-40"
            >
              {allOptions.map((option, i) => (
                <Listbox.Option
                  key={`${
                    typeof option === "string" ? option : option.value
                  }${i}`}
                  className={({ active }) =>
                    `relative cursor-pointer select-none ${
                      active ? "bg-grey-100 " : ""
                    }`
                  }
                  disabled={
                    !(typeof option === "string"
                      ? option && option === "0"
                      : typeof option.value === "boolean" ||
                        option.value ||
                        option.value == "0")
                  }
                  value={typeof option === "string" ? option : option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`pointer-events-none p-2 flex gap-3 ${
                          selected
                            ? "font-medium bg-primary-200"
                            : "font-normal"
                        }`}
                      >
                        {multiple &&
                          (typeof option === "string"
                            ? option
                            : option.value) && (
                            <Checkbox name="" checked={selected} />
                          )}
                        <span
                          className={`block`}
                          dangerouslySetInnerHTML={{
                            __html:
                              (typeof option === "string"
                                ? option
                                : option.label) || "",
                          }}
                        ></span>
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {(error || status) && (
        <div className={`${styles["error-message"]}`}>{error || status}</div>
      )}
    </div>
  );
}

export { Select };
