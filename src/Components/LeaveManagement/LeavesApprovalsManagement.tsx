import React, { useState } from "react";
import { Table, Button, Drawer, Modal, message, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useAppContext } from "../../Provider/AppProvider";
import dayjs from "dayjs";

import { Card, Descriptions, Avatar } from "antd";
import { UserOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { useUpdateStatusData } from "../../Hooks/apiHooks";
import { Notify } from "notiflix";
import StatusDropdownFilter from "../Shared/UI/FilterTypes";

const LeaveRequestCard = ({
  request,
  onApprove,
  onReject,
}: {
  request: any;
  onApprove: (request: any) => void;
  onReject: (request: any) => void;
}) => {
  const {
    user,
    reviewer_by,
    leaveType,
    leaveStatus,
    start_date,
    end_date,
    duration,
  } = request;

  const statusColorMap = {
    approved: "green",
    rejected: "red",
    pending: "orange",
    cancelled: "gray",
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-semibold text-lg">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-gray-500 text-sm">{user.email}</div>
          </div>
        </div>
      }
      extra={
        <Tag
          color={
            statusColorMap[
              leaveStatus?.name?.toLowerCase() as keyof typeof statusColorMap
            ] || "default"
          }
        >
          {leaveStatus?.label || leaveStatus?.name?.toUpperCase()}
        </Tag>
      }
      bordered
      className="w-full max-w-3xl mx-auto shadow-lg rounded-lg"
    >
      <Descriptions column={1} size="small" labelStyle={{ fontWeight: 600 }}>
        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Leave Type">
          {leaveType.name}
        </Descriptions.Item>
        <Descriptions.Item label="Leave Duration">
          {duration} day(s)
        </Descriptions.Item>
        <Descriptions.Item label="Start Date">
          {moment(start_date).format("ddd, MMM D, YYYY [at] h:mm A")}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {moment(end_date).format("ddd, MMM D, YYYY [at] h:mm A")}
        </Descriptions.Item>
        <Descriptions.Item label="Reviewed By">
          {reviewer_by?.first_name} {reviewer_by?.last_name} (
          {reviewer_by?.role?.name})
        </Descriptions.Item>
      </Descriptions>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-4">
        {leaveStatus?.name === "pending" && (
          <>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => onApprove(request)}
              className="bg-main_viridian hover:bg-main_bitter_switter transition-colors duration-200"
            >
              Approve
            </Button>
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={() => onReject(request)}
              className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
            >
              Reject
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

const LeaveApprovalManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(
    null
  );

  const {
    leaveRecords,
    leaveStatuses,
    leaveTypes,
    loggedInUserError,
    isLeaveRecordsLoading,
    LoggedInUser,
  } = useAppContext();

  const [currentRequest, setCurrentRequest] = useState<{
    id: number;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
    reviewer_by?: {
      first_name: string;
      last_name: string;
      role?: { name: string };
    };
    leaveType: { name: string };
    leaveStatus?: { name: string; label?: string };
    start_date: string;
    end_date: string;
    duration: number;
  } | null>(null);

  const showDrawer = (request = null) => {
    if (request) {
      setIsEditing(true);
      setCurrentRequest(request);
    } else {
      setIsEditing(false);
      setCurrentRequest(null);
    }
    setVisibleDrawer(true);
  };

  const closeDrawer = () => setVisibleDrawer(false);
  const showApprovalModal = (request: any) => {
    setCurrentRequest(request);
    setVisibleModal(true);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const {
    mutate: requestLeave,
    isPending,
    error: leaveRequestError,
  } = useUpdateStatusData("leave/request/status");

  const handleApproval = (status: string) => {
    if (!currentRequest) return;
    const updatedRequest = {
      requestId: currentRequest?.id,
      reviewerById: LoggedInUser?.id,
      leaveStatusId: leaveStatuses.find(
        (leaveStatus) => leaveStatus.name === status
      )?.id,
    };

    requestLeave(
      { data: updatedRequest },
      {
        onSuccess: () => {
          Notify.success("Leave request updated successfully");
          window.location.reload();
        },
        onError: () => {
          Notify.failure("Failed to update leave request");
        },
      }
    );
  };

  const columns = [
    {
      title: "S/N",
      key: "sn",
      render: (_: any, __: any, index: number) => (
        <span className="font-medium text-gray-800">
          {(page - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Employee",
      dataIndex: "user",
      key: "employee",

      render: (text: string, record: any) => (
        <span className="font-medium text-gray-800">
          {record?.user?.first_name} {record?.user?.last_name}
        </span>
      ),
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (type: string, record: any) => (
        <span className="font-medium text-gray-800">
          {record?.leaveType?.name}
        </span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "startDate",
      render: (date: string) => dayjs(date).format("MMM D, YYYY · h:mm A"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "endDate",
      render: (date: string) => dayjs(date).format("MMM D, YYYY · h:mm A"),
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
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Tooltip title="View details">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              showDrawer(record);
              setCurrentRequest(record);
            }}
            type="default"
            shape="round"
            size="small"
            className="text-main_viridian border-main_viridian hover:text-white hover:bg-main_viridian"
          >
            View
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6 border-b pb-2">
        <h2 className="text-2xl font-semibold text-dark">Leave Requests</h2>

        <StatusDropdownFilter
          value={selectedStatus || ""}
          onChange={handleStatusChange}
          statusOptions={
            leaveStatuses?.map((status) => ({
              label: status.label,
              value: status.name,
            })) ?? []
          }
          label="Filter by Status:"
        />

        {/* <Button
          type="primary"
          size="large"
          onClick={() => showDrawer()}
          className="bg-main_viridian hover:bg-main_bitter_switter transition-colors duration-200 text-white px-6 py-2.5 rounded-md text-base font-semibold shadow-sm"
        >
          + New Leave Request
        </Button> */}
      </div>
      <Table
        columns={columns}
        dataSource={
          leaveRecords?.filter((record) =>
            selectedStatus
              ? record.leaveStatus.name.toLowerCase() === selectedStatus
              : true
          ) || []
        }
        rowKey="id"
        pagination={{
          current: page,
          pageSize: pageSize,
          total:
            leaveRecords?.filter((record) =>
              selectedStatus
                ? record.leaveStatus.name.toLowerCase() === selectedStatus
                : true
            )?.length || 0,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        loading={isLeaveRecordsLoading}
        className="rounded-lg shadow-md"
      />

      <Drawer
        title={"Leave Request Details"}
        open={visibleDrawer}
        onClose={closeDrawer}
        width={550}
      >
        {currentRequest && (
          <LeaveRequestCard
            request={currentRequest}
            onApprove={() => showApprovalModal(currentRequest)}
            onReject={() => showApprovalModal(currentRequest)}
          />
        )}
      </Drawer>
      <Modal
        title="Confirm Leave Approval"
        open={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={[
          <Button
            key="reject"
            onClick={() => handleApproval("rejected")}
            loading={isPending}
            className="bg-red-500 !text-white hover:bg-red-600 transition-colors duration-200"
          >
            Reject
          </Button>,
          <Button
            key="approve"
            type="primary"
            loading={isPending}
            onClick={() => handleApproval("approved")}
            className="bg-main_viridian hover:bg-main_bitter_switter transition-colors duration-200"
          >
            Approve
          </Button>,
        ]}
      >
        <p>Are you sure you want to approve/reject this leave request?</p>
        <p>{/* <strong>Employee:</strong> {currentRequest?.} */}</p>
        {/* <p>
          <strong>Leave Type:</strong>{" "}
          {leaveTypes?.find((lt) => lt.id === currentRequest?.leaveType)?.label}
        </p> */}
      </Modal>
    </div>
  );
};

export default LeaveApprovalManagement;
