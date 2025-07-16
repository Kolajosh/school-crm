import { Users } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: number | string;
  change?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon = <Users className="w-5 h-5 text-gray-400" />,
  active,
}) => {
  return (
    <div
      className={`rounded-xl font-acuminpro border ${
        active ? "border-[#000000]" : "border-transparent"
      }  p-6 w-full bg-white shadow-sm`}
    >
      <div className="flex justify-between items-start mb-3">
        <p className="text-sm text-gray-900 font-medium">{title}</p>
        {icon}
      </div>
      <div className="text-2xl font-semibold text-black">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{change}</div>
    </div>
  );
};

export default MetricsCard;
