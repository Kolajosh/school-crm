"use client";
import { Man, Woman } from "@/assets/png";
import { Button, PageLoader } from "@/components/shared";
import { APP_PATHS } from "@/constants";
import { useStudents } from "@/hooks";
import { capitalizeFirstLetter, dayJs } from "@/utils";
import { Edit2, EyeIcon, Plus, Search, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const Students = () => {
  const router = useRouter();
  const { studentData, loading } = useStudents();
  const allStudents = useMemo(() => studentData?.data || [], [studentData]);

  if (loading) {
    return <PageLoader showMessage isTransparent message="Loading" />;
  }
  return (
    <>
      <div className="min-h-screen space-y-5">
        {/* Header */}
        <div className=" bg-white p-6 space-y-5 rounded-xl">
          <div className="flex justify-between items-center bg-white rounded-xl">
            <div>
              <p className="text-2xl font-semibold">Students</p>
              <p className="text-sm font-light text-gray-500">
                All students of the school are listed here
              </p>
            </div>
            <Button
              className="!w-auto"
              onClick={() => router.push(APP_PATHS.STUDENTS_ADD)}
            >
              <p className="flex items-center gap-1">
                <Plus width={20} height={20} />
                <span className="hidden md:block">Add New</span>
              </p>
            </Button>
          </div>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="w-5/6 pl-10 text-sm pr-4 py-2 border-[0.5px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B37F0]"
            />
            <Search
              width={16}
              height={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>

          <div>
            {allStudents?.length > 0 ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {allStudents?.map((students, index) => (
                  <div
                    key={index}
                    className="w-full rounded-lg bg-[#f7f5fc] p-4 flex flex-col items-start gap-3"
                  >
                    {/* Profile */}
                    <div className="flex items-center gap-3">
                      <Image
                        src={students?.gender === "male" ? Man : Woman}
                        alt="Avatar"
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {students?.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {capitalizeFirstLetter(students?.gender)}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-md">
                        {capitalizeFirstLetter(students?.user?.role)}
                      </span>
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-md">
                        {students?.phone}
                      </span>
                    </div>

                    {/* Extra details */}
                    <div className="text-xs text-gray-700 space-y-1">
                      <p>
                        <span className="font-semibold">Student ID:</span>{" "}
                        {students?.id}
                      </p>
                      <p>
                        <span className="font-semibold">Joining Date:</span>{" "}
                        {dayJs(students?.created_at).format("DD-MMM-YYYY")}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex gap-2 items-center justify-end mt-3">
                      <Link className="text-blue-600 text-xs" href="#">
                        <EyeIcon width={16} height={16} />
                      </Link>
                      <Link className="text-green-600 text-xs" href="#">
                        <Edit2 width={16} height={16} />
                      </Link>
                      <Link className="text-red-500 text-xs" href="#">
                        <Trash2Icon width={16} height={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Empty State */}
                <div className="h-[65vh] flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <p className="">No Student Added yet</p>
                    <Button
                      className="!w-full"
                      text="Add New"
                      onClick={() => router.push(APP_PATHS.EMPLOYEES_ADD)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
