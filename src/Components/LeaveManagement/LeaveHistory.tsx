import React, { useState } from "react";

// Sample leave data
const sampleLeaveData = [
  {
    id: 1,
    leaveType: "Sick Leave",
    startDate: "2025-04-01",
    endDate: "2025-04-05",
    status: "Approved",
    reason: "Flu",
  },
  {
    id: 2,
    leaveType: "Annual Leave",
    startDate: "2025-03-15",
    endDate: "2025-03-20",
    status: "Pending",
    reason: "Vacation",
  },
  {
    id: 3,
    leaveType: "Casual Leave",
    startDate: "2025-02-10",
    endDate: "2025-02-12",
    status: "Denied",
    reason: "Personal Matter",
  },
];

// Utility function to format dates
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// Utility function for badge style
const getBadgeClass = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Denied":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const LeaveHistory = () => {
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredRecords =
    filterStatus === "All"
      ? sampleLeaveData
      : sampleLeaveData.filter((record) => record.status === filterStatus);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-main_dark">Leave History</h2>

        <div className="flex items-center gap-3">
          <label htmlFor="status" className="text-sm text-gray-600">
            Filter by status:
          </label>
          <select
            id="status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-main_dark focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Denied">Denied</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-700">
            <tr>
              <th className="px-4 py-3 font-medium">Leave Type</th>
              <th className="px-4 py-3 font-medium">Start Date</th>
              <th className="px-4 py-3 font-medium">End Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-800">{leave.leaveType}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(leave.startDate)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(leave.endDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getBadgeClass(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{leave.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No leave records match the selected status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
