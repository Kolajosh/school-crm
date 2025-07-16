/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import styles from "./styles.module.css";
import { FormikProps } from "formik";

type InputType = {
  checked?: boolean;
  type?: string;
  onClick?: () => void;
  onChange?: () => void;
  label?: string;
  className?: string;
  id?: string;
  name: string;
  formik?: FormikProps<any>;
  placeholder?: string | "";
};

function Checkbox({
  // type,
  // onClick,
  // onChange,
  label,
  className,
  // id,
  name,
  formik,
  checked = false,
  ...rest
}: InputType) {
  const [selected, setIsSelected] = useState(!!formik?.values?.[name]);

  const error = formik && formik.touched?.[name] && formik.errors?.[name];
  let classes = `${styles.container} ${className}`;
  const status = formik && formik.status?.[name];

  if (error || status) classes += ` ${styles["error"]}`;

	if (formik) {
		Object.assign(rest, {
			onChange: handleChange,
			onBlur: (e: SyntheticEvent) => {
				return formik?.handleBlur(e);
			}
		});
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsSelected(e.target.checked);
		formik?.setValues({ ...formik?.values, [name]: e.target.checked });
  }

  return (
    <label className={classes}>
      <input
        type="checkbox"
        checked={selected || checked}
        {...rest}
      />
      <span className={styles["checkmark"]}></span>
      {label}
    </label>
  );
}

export { Checkbox };
