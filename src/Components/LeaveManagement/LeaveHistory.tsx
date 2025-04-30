import React, { useMemo, useState } from "react";
import {
  Table,
  Tag,
  Input,
  DatePicker,
  Select,
  Spin,
  Empty,
  Button,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useAppContext } from "../../Provider/AppProvider";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
const { Option } = Select;

const LeaveHistory = () => {
  const { leaveRecords, LoggedInUser, isLeaveRecordsLoading } = useAppContext();

  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filtered leave records based on role and filters
  const filteredLeaveRecords = useMemo(() => {
    let records = leaveRecords || [];

    // Filter by role
    if (LoggedInUser?.role?.name?.toLowerCase() === "staff") {
      records = records.filter(
        (record: any) => record.user?.id === LoggedInUser.id
      );
    }

    // Filter by search term
    if (searchTerm) {
      records = records.filter((record: any) =>
        record.leaveType?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange) {
      const [start, end] = dateRange;
      records = records.filter((record: any) => {
        const recordStart = dayjs(record.start_date);
        const recordEnd = dayjs(record.end_date);
        return (
          recordStart.isBetween(start, end, null, "[]") ||
          recordEnd.isBetween(start, end, null, "[]") ||
          (recordStart.isBefore(start) && recordEnd.isAfter(end))
        );
      });
    }

    // Filter by status
    if (statusFilter) {
      records = records.filter((record: any) =>
        statusFilter !== ""
          ? record.leaveStatus?.name?.toLowerCase() ===
            statusFilter.toLowerCase()
          : true
      );
    }

    return records;
  }, [leaveRecords, LoggedInUser, searchTerm, dateRange, statusFilter]);

  // Table columns
  const columns: ColumnsType<any> = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (leaveType: any) => leaveType?.name || "N/A",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date: string) => dayjs(date).format("MMMM DD, YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date: string) => dayjs(date).format("MMMM DD, YYYY"),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => `${duration} day(s)`,
    },
    {
      title: "Status",
      dataIndex: "leaveStatus",
      key: "status",
      render: (_: any, record: any) => {
        const status = record?.leaveStatus?.name?.toLowerCase() || "unknown";

        const statusColorMap: Record<string, string> = {
          approved: "green",
          cancelled: "default",
          pending: "orange",
          rejected: "red",
        };
        const displayText =
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

        return (
          <Tag color={statusColorMap[status] || "default"}>{displayText}</Tag>
        );
      },
    },
    {
      title: "Reviewer",
      dataIndex: "reviewer_by",
      key: "reviewer_by",
      render: (reviewer: any) =>
        reviewer
          ? `${reviewer.first_name} ${reviewer.last_name}`
          : "Not Assigned",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <header className="mb-6 flex justify-between">
        <h2 className="text-3xl font-bold text-main_dark mb-2">
          Leave History
        </h2>
        <p className="text-gray-600 text-sm">
          View and track your leave history and statuses.
        </p>
      </header>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <RangePicker
          className="w-full sm:w-1/3"
          size="large"
          onChange={(dates) =>
            setDateRange(
              dates && dates[0] && dates[1]
                ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")]
                : null
            )
          }
        />
        <Select
          placeholder="Filter by status"
          className="w-full sm:w-1/3"
          allowClear
          size="large"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value || null)}
        >
          <Option value="">All</Option>
          <Option value="approved">Approved</Option>
          <Option value="pending">Pending</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
        <Input.Search
          placeholder="Search by leave type"
          className="w-full sm:w-1/3"
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          type="primary"
          onClick={() => {
            setDateRange(null);
            setStatusFilter(null);
            setSearchTerm("");
          }}
          className=" bg-main_viridian hover:bg-main_bitter_switter transition-colors duration-200 text-white py-3 !rounded-none text-base font-semibold shadow-md"
          size="large"
        >
          Clear Filters
        </Button>
      </div>

      {/* Leave Records Table */}
      {isLeaveRecordsLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : filteredLeaveRecords.length > 0 ? (
        <Table
          columns={columns}
          dataSource={filteredLeaveRecords}
          rowKey={(record) => record.id}
          pagination={{ pageSize: 10 }}
          className="rounded-lg overflow-hidden"
        />
      ) : (
        <div className="flex justify-center items-center h-40">
          <Empty description="No leave records found" />
        </div>
      )}
    </div>
  );
};

export default LeaveHistory;
