"use client";
import React from "react";
import styles from "./styles.module.css";
import { useAppSelector } from "@/store";
import { INavItem } from "./SidebarContent";
import Link from "next/link";
import { ArrowDownNav } from "@/assets";
// import { ArrowDownNav } from "@/app/assets";

const SidebarItem: React.FC<{
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  path?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  sub?: INavItem["sub"];
  isOpen?: boolean;
}> = ({
  icon: Icon,
  title,
  path,
  onClick,
  isActive = false,
  className = "",
  sub,
  isOpen = false,
}) => {
  const { sidebarOpen } = useAppSelector((state) => state?.app);

  return (
    <Link
      href={path || "#"}
      onClick={onClick}
      className={`${styles["icon-wrapper"]} ${path && styles["nav-icon"]} ${
        isActive ? `${styles["active"]} text-primary-100 bg-black` : ""
      } border-none flex items-center gap-3 p-2 hover:bg-black rounded-[4px] cursor-pointer ${
        sidebarOpen === false && "md:justify-center"
      }  ${className}`}
    >
      {Icon && <Icon height={24} width={24} />}
      <span
        className={`${
          isActive ? `text-white` : "text-black"
        } text-sm hover:text-white ${sidebarOpen === false && "md:hidden"}`}
      >
        {title}
      </span>
      {sub && sidebarOpen && (
        <ArrowDownNav className={`${isOpen ? "" : "rotate-180"} ml-auto`} />
      )}
    </Link>
  );
};

export { SidebarItem };
