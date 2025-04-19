import React from "react";
import { Calendar, Badge } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const TeamCalendarComp = () => {
  // Sample data - replace with dynamic API data as needed
  const sampleLeaveData: Record<
    string,
    { type: "success" | "warning" | "error"; content: string }[]
  > = {
    "2025-04-20": [{ type: "success", content: "John - Annual Leave" }],
    "2025-04-22": [
      { type: "warning", content: "Alice - Sick Leave" },
      { type: "error", content: "Mark - Emergency Leave" },
    ],
    "2025-04-25": [{ type: "success", content: "Team Outing" }],
  };

  const getListData = (value: Dayjs) => {
    const dateKey = value.format("YYYY-MM-DD");
    return sampleLeaveData[dateKey] || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="space-y-1">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-main_dark mb-2">
          Team Leave Calendar
        </h2>
        <p className="text-gray-600 text-sm">
          Stay informed about your team’s upcoming leaves, sick days, and other
          planned absences.
        </p>
      </header>

      <div className="overflow-x-auto rounded-lg">
        <Calendar
          dateCellRender={dateCellRender}
          fullscreen={true}
          className="bg-white rounded-md"
        />
      </div>
    </div>
  );
};

export default TeamCalendarComp;
