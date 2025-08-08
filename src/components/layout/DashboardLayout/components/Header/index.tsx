"use client";
import React, { FC } from "react";
import styles from "./styles.module.css";
import { Bell, Hamburger } from "@/assets";
import { capitalizeFirstLetter, getTimeIcon } from "@/utils";
import { useAppSelector } from "@/store";

const Header: FC<{
  sideNavIsOpen?: boolean;
  handleToggleDrawer: () => void;
}> = ({ sideNavIsOpen, handleToggleDrawer }) => {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <div className={`${styles["wrapper"]} z-10 w-full sticky top-0 bg-white`}>
      <header
        className={`${styles.container} ${
          styles.nav
        } px-5 py-8 flex justify-between items-center gap-3 md:gap-6 ${
          !sideNavIsOpen && "md:pl-10"
        }`}
      >
        <button
          type="button"
          className="p-2 text-gray-800 dark:text-white md:hidden"
          onClick={handleToggleDrawer}
        >
          <Hamburger />
        </button>
        <p>
          Hello, {capitalizeFirstLetter(role || "")} {getTimeIcon()}
        </p>

        <div className="flex items-center gap-4 ml-auto">
          <Bell />
          <span className="hidden md:block">Downtown High School</span>
        </div>
      </header>
    </div>
  );
};

export { Header as DashboardHeader };
