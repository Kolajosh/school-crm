import React from "react";

interface ProgressBarProps {
  label: string;
  percentage: number; // e.g. 100 for 100%
  barColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  percentage,
  barColor = "#6C8CFF", // default to blue
}) => {
  return (
    <div className="space-y-1 w-full">
      {/* Top Row: Label & Percentage */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-600">{label}</p>
        <span className="font-bold" style={{ color: barColor }}>
          {percentage}%
        </span>{" "}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
