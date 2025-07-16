"use client";
import React, { useState } from "react";
import { MetricsCard } from "./components";
import { ProgressBar, SimpleCard } from "@/components/shared";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Dashboard = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricsCard title="Teachers" value={70} change="" />
          <MetricsCard title="Students" value={56} change="" />
          <MetricsCard title="Classes" value={12} change="" />
          <MetricsCard title="Daily Attendance" value={51} change="" />
        </div>

        <div className="w-full flex gap-5">
          <div className="w-[65%] space-y-5">
            <SimpleCard
              title="Welcome to Admin Dashboard"
              titleColor="#ff808b"
              bgColor="#f7e5e9"
              hasShadow={false}
            >
              <div>
                <p className="text-[#777]">
                  Enjoy World&apos;s No.1 Education Software.
                </p>
              </div>
            </SimpleCard>
            <SimpleCard
              title="New Admissions"
              titleColor="#ff808b"
            ></SimpleCard>
            <SimpleCard
              title="Today Absent Students"
              titleColor="#ff808b"
            ></SimpleCard>
            <SimpleCard
              title="Today Present Employees"
              titleColor="#ff808b"
            ></SimpleCard>
          </div>
          <div className="w-[35%] space-y-5">
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
