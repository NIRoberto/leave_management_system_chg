import React from "react";
import { Calendar, Badge } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useAppContext } from "../../Provider/AppProvider";

const TeamCalendarComp = () => {
  const { leaveRecords } = useAppContext();

  // Transform leaveRecords to include only approved leaves
  const approvedLeaveData: Record<
    string,
    { type: "success"; content: string }[]
  > = React.useMemo(() => {
    const data: Record<string, { type: "success"; content: string }[]> = {};

    leaveRecords?.forEach((record: any) => {
      if (record.leaveStatus?.name?.toLowerCase() === "approved") {
        const dateKey = dayjs(record.start_date).format("YYYY-MM-DD");
        const leaveType = record.leaveType?.name || "Leave";
        const userName = `${record.user?.first_name || "Unknown"} ${
          record.user?.last_name || ""
        }`.trim();

        if (!data[dateKey]) {
          data[dateKey] = [];
        }

        data[dateKey].push({
          type: "success",
          content: `${userName} - ${leaveType}`,
        });
      }
    });

    return data;
  }, [leaveRecords]);

  const getListData = (value: Dayjs) => {
    const dateKey = value.format("YYYY-MM-DD");
    return approvedLeaveData[dateKey] || [];
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
          Stay informed about your team’s approved leaves and planned absences.
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
