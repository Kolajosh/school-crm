"use client";
import React, { useMemo, useState } from "react";
import { MetricsCard } from "./components";
import { ProgressBar, SimpleCard } from "@/components/shared";
import Calendar from "react-calendar";
import { useAdminDashboard } from "@/hooks";
import { useAppSelector } from "@/store";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Dashboard = () => {
  const state = useAppSelector((state) => state?.auth);
  console.log(state);

  const [value, onChange] = useState<Value>(new Date());
  const { dashboardData } = useAdminDashboard();

  const data = useMemo(() => dashboardData?.data, [dashboardData]);
  console.log(data);

  return (
    <>
      <div className="space-y-6">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Teachers"
            value={data?.totals?.teachers || 0}
            change=""
          />
          <MetricsCard
            title="Students"
            value={data?.totals?.students || 0}
            change=""
          />
          <MetricsCard
            title="Classes"
            value={data?.totals?.classes || 0}
            change=""
          />
          <MetricsCard
            title="Daily Attendance"
            value={data?.attendance_today?.total || 0}
            change=""
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[65%] space-y-5">
            <SimpleCard title="Recent Activities">
              <div className="w-full overflow-x-auto">
                <div className="flex gap-4">
                  {data?.recent_activities?.map((activity) => (
                    <div
                      key={activity.id}
                      className="min-w-[220px] shrink-0 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <p className="text-xs font-semibold capitalize text-[#7839EE]">
                        {activity.type}
                      </p>
                      <p className="text-sm mt-1 font-medium">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {activity.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SimpleCard>
            <SimpleCard title="New Admissions"></SimpleCard>
            <SimpleCard title="Attendance Today">
              <div className="flex gap-4">
                {Object.entries(data?.attendance_today || {}).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="min-w-[100px] shrink-0 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <p className="text-xs font-semibold capitalize text-[#7839EE]">
                        {key}
                      </p>
                      <p className="text-sm mt-1 font-medium">{value}</p>
                    </div>
                  )
                )}
              </div>
            </SimpleCard>
          </div>
          <div className="w-full md:w-[35%] space-y-5">
            <SimpleCard>
              <div className="space-y-4">
                <ProgressBar label="Todays Present Students" percentage={100} />
                <ProgressBar
                  label="Todays Present Employees"
                  percentage={68}
                  barColor="#ff808b"
                />
                <ProgressBar
                  label="This Month Fee Collection"
                  percentage={23}
                />
              </div>
            </SimpleCard>
            <SimpleCard>
              <div className="w-full">
                <Calendar
                  className={"w-full rounded-xl !border-none "}
                  onChange={onChange}
                  value={value}
                />
              </div>
            </SimpleCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
