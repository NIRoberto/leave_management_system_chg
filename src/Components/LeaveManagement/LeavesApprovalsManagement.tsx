import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Typography,
  message,
  Popconfirm,
  Tag,
  Input,
  Drawer,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;

const LeavesApprovalsManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employee: "John Doe",
      date: "2025-04-20",
      reason: "Personal",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Jane Smith",
      date: "2025-04-21",
      reason: "Sick",
      status: "Pending",
    },
    {
      id: 3,
      employee: "Sam Wilson",
      date: "2025-04-22",
      reason: "Vacation",
      status: "Pending",
    },
  ]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<any>(null);
  const [filteredRequests, setFilteredRequests] = useState(leaveRequests);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle approve action with confirmation
  const handleApprove = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to approve this leave request?",
      onOk: () => {
        const updatedRequests = leaveRequests.map((request) =>
          request.id === id ? { ...request, status: "Approved" } : request
        );
        setLeaveRequests(updatedRequests);
        message.success("Leave request approved successfully!");
      },
    });
  };

  // Handle reject action with confirmation
  const handleReject = (id: number) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status: "Rejected" } : request
    );
    setLeaveRequests(updatedRequests);
    message.error("Leave request rejected!");
  };

  // Handle view details in a Drawer
  const handleViewDetails = (record: any) => {
    setCurrentRequest(record);
    setIsDrawerVisible(true);
  };

  // Handle drawer close
  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    setCurrentRequest(null);
  };

  // Handle search term change
  const handleSearchChange = (e: any) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = leaveRequests.filter(
      (request) =>
        request.employee.toLowerCase().includes(term) ||
        request.reason.toLowerCase().includes(term)
    );
    setFilteredRequests(filtered);
  };

  // Columns for the table
  const columns = [
    { title: "Employee", dataIndex: "employee", key: "employee" },
    { title: "Leave Date", dataIndex: "date", key: "date" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "gold"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleApprove(record.id)}
            disabled={record.status !== "Pending"}
            className="btn-approve"
          >
            Approve
          </Button>
          <Popconfirm
            title="Are you sure to reject this leave?"
            onConfirm={() => handleReject(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<CloseCircleOutlined />}
              disabled={record.status !== "Pending"}
              className="btn-reject"
            >
              Reject
            </Button>
          </Popconfirm>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            className="text-blue-500"
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Title level={2} className="text-center text-gray-800 mb-6">
        Leave Approval Management
      </Title>

      {/* Filter and Search */}
      <div className="mb-6">
        <Input
          placeholder="Search by Employee or Reason"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "100%" }}
        />
      </div>

      {/* Table for leave requests */}
      <Table
        columns={columns}
        dataSource={filteredRequests}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="mb-6"
      />

      {/* Drawer for viewing leave request details */}
      <Drawer
        title="Leave Request Details"
        visible={isDrawerVisible}
        onClose={handleDrawerClose}
        width={600}
      >
        {currentRequest && (
          <div>
            <p>
              <strong>Employee:</strong> {currentRequest.employee}
            </p>
            <p>
              <strong>Leave Date:</strong> {currentRequest.date}
            </p>
            <p>
              <strong>Reason:</strong> {currentRequest.reason}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag
                color={currentRequest.status === "Approved" ? "green" : "red"}
              >
                {currentRequest.status}
              </Tag>
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default LeavesApprovalsManagement;
