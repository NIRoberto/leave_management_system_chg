import React from "react";
import { Select } from "antd";

interface Option {
  label: string;
  value: string;
}

interface StatusDropdownFilterProps {
  value: string;
  onChange: (value: string) => void;
  statusOptions: Option[];
  label?: string;
}

const StatusDropdownFilter: React.FC<StatusDropdownFilterProps> = ({
  value,
  onChange,
  statusOptions,
  label = "Status",
}) => {
  const enhancedOptions: Option[] = [
    { label: "All", value: "" },
    ...statusOptions,
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <span className="text-gray-700 font-medium text-base">{label}</span>
      <Select
        value={value}
        onChange={onChange}
        options={enhancedOptions}
        placeholder="Select Status"
        size="middle"
        className="min-w-[200px] font-semibold"
        popupClassName="rounded-md shadow-lg"
        style={{
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
        dropdownStyle={{
          borderRadius: 10,
        }}
      />
    </div>
  );
};

export default StatusDropdownFilter;
