import { CheckCircle, Clock, XCircle } from "lucide-react";
import React, { useState } from "react";
// import { CheckCircle, XCircle, Clock } from "react-feather";
// import { FaRegCalendarCheck } from "react-icons/fa";

// Mock Data
const leaveRequests = [
  {
    id: 1,
    name: "John Doe",
    type: "Sick Leave",
    status: "Pending",
    start: "2025-04-20",
    end: "2025-04-22",
  },
  {
    id: 2,
    name: "Jane Smith",
    type: "Annual Leave",
    status: "Approved",
    start: "2025-04-18",
    end: "2025-04-19",
  },
  {
    id: 3,
    name: "Mike Johnson",
    type: "Sick Leave",
    status: "Rejected",
    start: "2025-04-25",
    end: "2025-04-26",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-md">
          <CheckCircle size={16} /> Approved
        </span>
      );
    case "Rejected":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-md">
          <XCircle size={16} /> Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-md">
          <Clock size={16} /> Pending
        </span>
      );
  }
};

const LeaveManagement = () => {
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Leave Applied!");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Leave Balance */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-main_dark mb-2 flex items-center gap-2">
          {/* <FaRegCalendarCheck className="text-main_orange" /> Leave Balance */}
        </h2>
        <p className="text-lg text-gray-600">
          You have{" "}
          <span className="font-semibold text-main_viridian">10 days</span> of
          annual leave remaining.
        </p>
      </section>

      {/* Apply Leave */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-main_dark mb-4">
          Apply for Leave
        </h2>
        <form
          onSubmit={handleApplyLeave}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option>Sick Leave</option>
              <option>Annual Leave</option>
              <option>Maternity Leave</option>
              <option>Paternity Leave</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={leaveStartDate}
              onChange={(e) => setLeaveStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={leaveEndDate}
              onChange={(e) => setLeaveEndDate(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-3 text-right mt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-main_orange hover:bg-orange-600 text-white font-medium rounded-md transition"
            >
              Submit Leave Request
            </button>
          </div>
        </form>
      </section>

      {/* Leave Requests Table */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-main_dark mb-4">
          Leave Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="px-4 py-2">Employee</th>
                <th className="px-4 py-2">Leave Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{req.name}</td>
                  <td className="px-4 py-3">{req.type}</td>
                  <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                  <td className="px-4 py-3">{req.start}</td>
                  <td className="px-4 py-3">{req.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default LeaveManagement;
