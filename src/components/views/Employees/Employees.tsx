"use client";
import React from "react";
import { Button } from "@/components/shared";
import { useRouter } from "next/navigation";
import { APP_PATHS } from "@/constants";

const Employees = () => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen bg-[#f9f9f9]">
        {/* Header */}
        <div className="flex justify-between items-center bg-white py-3 px-5 rounded-xl">
          <p className="text-xl font-medium">Employees</p>
          <Button
            className="!w-auto"
            text="Add New"
            onClick={() => router.push(APP_PATHS.EMPLOYEES_ADD)}
          />
        </div>

        {/* Empty State */}
        <div className="h-[65vh] flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="">No Employee Added yet</p>
            <Button
              className="!w-full"
              text="Add New"
              onClick={() => router.push(APP_PATHS.EMPLOYEES_ADD)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
