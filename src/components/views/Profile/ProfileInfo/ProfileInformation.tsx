import { Button } from "@/components/shared";
import React from "react";

const ProfileInformation = () => {
  const userData = [
    { label: "Name", value: "Joe Uche" },
    { label: "Email", value: "iuyedrrqlyhqjhrlcq@ytnhy.com" },
    { label: "Phone Number", value: "869896986" },
    { label: "Bank Name", value: "fff" },
    { label: "Account Number", value: "765643443245" },
    { label: "Account Name", value: "hhj h" },
  ];

  return (
    <div className="border rounded border-[#e5e7eb] p-10">
      <div className="space-y-6">
        <h3 className="text-2xl">Personal Information</h3>
        <p className="py-2 px-5 bg-[#ebeef2] rounded text-[#8094ae] text-xs font-semibold">
          BASIC INFORMATION
        </p>

        <div className="divide-y space-y-5 divide-[#e5e7eb] border-b pb-5">
          {userData.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-4">
              <span className="text-sm text-[#8094ae]">{item.label}</span>
              <span className="text-sm text-[#364a63] font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div>
          <Button text="Update Profile" textClass="!text-xs" />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
