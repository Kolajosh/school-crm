import React, { ReactNode } from "react";
import { Button } from "../Button";
import Input from "../Input";
import Link from "next/link";
import { BackArrow, Search } from "@/assets";

interface SimpleCardProps {
  containerVariant?: string;
  title?: string;
  subTitle?: string;
  info?: string;
  children?: ReactNode;
  showButton?: boolean;
  showSearch?: boolean;
  buttonProps?: React.ComponentProps<typeof Button>;
  searchProps?: React.ComponentProps<typeof Input>;
  showBackArrow?: boolean;
  backArrowText?: string;
  backArrowLink?: string;
  showStep?: boolean;
  step?: string | number;
  titleColor?: string;
  bgColor?: string;
  hasShadow?: boolean;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  containerVariant = "w-full h-auto bg-white",
  title,
  subTitle,
  info,
  children,
  showButton = false,
  showSearch = false,
  buttonProps,
  searchProps,
  showBackArrow = false,
  backArrowText = "Back",
  backArrowLink = "#",
  showStep = false,
  step,
  titleColor,
  bgColor = "#fff",
  hasShadow = true,
}) => {
  return (
    <div
      className={`${containerVariant} rounded-xl font-inter ${
        hasShadow && "shadow-md"
      } `}
      style={{ background: bgColor || "#fff" }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="items-center">
          {showBackArrow && (
            <div className="mb-8">
              <Link
                href={backArrowLink}
                className="flex items-center gap-3 text-sm text-alat-red"
              >
                <BackArrow />
                <span>{backArrowText}</span>
              </Link>
            </div>
          )}

          <p
            className="text-md font-bold text-left"
            style={{ color: titleColor || "black" }}
          >
            {" "}
            {title}
          </p>
          {subTitle && (
            <p className="text-sm mt-1 text-alat-subtitle-gray font-normal text-left text-nav-item-inactive">
              {subTitle}
            </p>
          )}
          {info && (
            <p className="text-xs mt-1 text-lib-alat-black text-left">{info}</p>
          )}
        </div>

        <div className="flex items-center gap-5">
          {showSearch && (
            <div>
              <Input
                placeholder="Search"
                name=""
                Icon={Search}
                {...searchProps}
              />
            </div>
          )}
          {showButton && (
            <div>
              <Button {...buttonProps} />
            </div>
          )}
          {showStep && (
            <div>
              <p>{step}</p>
            </div>
          )}
        </div>
      </div>

      {/* Children Content */}
      <div className="px-6 pb-6 pt-4">{children}</div>
    </div>
  );
};

export { SimpleCard };
