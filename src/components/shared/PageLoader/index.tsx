"use client";
import { Logo } from "@/assets/png";
import Image from "next/image";
import React, { useEffect } from "react";

const PageLoader = ({
  message = "Please wait",
  showMessage = false,
  isTransparent = false,
}: {
  message?: string;
  showMessage?: boolean;
  isTransparent?: boolean;
}) => {
  useEffect(() => {
    if (document && document.body) {
      const { body } = document;

      body.classList.add("overflow-hidden");
      return () => {
        body.classList.remove("overflow-hidden");
      };
    }
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center w-full h-full p-5 !z-[999999] overflow-hidden ${
        !isTransparent
          ? "bg-white"
          : "backdrop-blur-sm backdrop-filter bg-opacity-95 bg-transparent"
      }`}
      style={{ margin: 0 }}
    >
      <center
        className={`z-10 flex flex-col items-center justify-center ${
          showMessage ? "gap-2" : "gap-2"
        }`}
      >
        <div
          className={`${
            showMessage ? "w-[76px] h-[76px]" : "w-[132px] h-[132px]"
          } flex justify-center items-center relative`}
        >
          <div
            className={`${
              showMessage ? "w-[76px] h-[76px]" : "w-[120px] h-[120px] "
            } animate-spin max-w-full max-h-full rounded-full `}
          />
          <div className="flex items-center justify-center animate-pulse  absolute max-w-full max-h-full">
            <Image src={Logo} alt="Logo" />
          </div>
        </div>
        {showMessage && <p className="text-[#000] text-sm">{message}...</p>}
      </center>
    </div>
  );
};

export default PageLoader;
