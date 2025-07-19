"use client";
import React, { FC } from "react";
import styles from "./styles.module.css";
import { Bell, Hamburger, Message, User } from "@/assets";

const Header: FC<{
  sideNavIsOpen?: boolean;
  handleToggleDrawer: () => void;
}> = ({ sideNavIsOpen, handleToggleDrawer }) => {
  return (
    <div
      className={`${styles["wrapper"]} border-b z-40 w-full sticky top-0 bg-white`}
    >
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
        <p>Welcome back, Admin ☀️</p>

        <div className="flex items-center gap-4 ml-auto">
          <Message />
          <Bell />
          <span className="hidden md:block">Downtown High School</span>
          <User />
        </div>
      </header>
    </div>
  );
};

export { Header as DashboardHeader };
