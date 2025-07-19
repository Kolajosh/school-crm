"use client";
import React, { useMemo } from "react";
import { Button } from "@/components/shared";
import { useRouter } from "next/navigation";
import { APP_PATHS } from "@/constants";
import { useTeachers } from "@/hooks";
import Image from "next/image";
import { Man, Woman } from "@/assets/png";
import Link from "next/link";

const Employees = () => {
  const router = useRouter();
  const { teachersData } = useTeachers();
  const allTeachers = useMemo(() => teachersData?.data || [], [teachersData]);
  console.log(allTeachers);

  return (
    <>
      <div className="min-h-screen space-y-5">
        {/* Header */}
        <div className=" bg-white p-6 space-y-5 rounded-xl">
          <div className="flex justify-between items-center bg-white rounded-xl">
            <p className="text-xl font-medium">Employees</p>
            <Button
              className="!w-auto"
              text="Add New"
              onClick={() => router.push(APP_PATHS.EMPLOYEES_ADD)}
            />
          </div>

          <div>
            {allTeachers?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {allTeachers?.map((teacher) => (
                  <>
                    <div className="w-auto rounded-xl text-center flex gap-2 flex-col items-center justify-center bg-white border-[0.5px] border-[#c8c8c8] p-3">
                      <Image
                        src={teacher?.gender === "male" ? Man : Woman}
                        alt="Avatar"
                        width={50}
                        height={50}
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          {teacher?.user?.name}
                        </p>
                        <p className="text-xs">{teacher?.user?.role}</p>
                      </div>
                      <div className="text-xs space-x-2">
                        <Link className="text-blue-600" href={"#"}>
                          View
                        </Link>
                        <Link className="text-green-600" href={"#"}>
                          Edit
                        </Link>
                        <Link className="text-red-500" href={"#"}>
                          Delete
                        </Link>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
