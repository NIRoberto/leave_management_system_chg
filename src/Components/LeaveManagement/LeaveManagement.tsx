import { CheckCircle, Clock, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useCreateData,
  useCreateWithAuthData,
  useFetchData,
  useFetchDataById,
  useUpdateWithTwoParameters,
} from "../../Hooks/apiHooks";
import { useAppContext } from "../../Provider/AppProvider";
import { Button, Drawer, Popconfirm, Tag } from "antd";
import Table from "antd/es/table";
import { LeaveRecord } from "../Types/leave";
import { Form, Formik } from "formik";
import { SelectInput, TextInput } from "../Shared/UI/FormInput";
import * as Yup from "yup";
import { Notify } from "notiflix";

const LeaveManagement = () => {
  const {
    LoggedInUser,
    leaveTypes,
    leaveStatuses,
    LeaveRecordsByUserResponse,
  } = useAppContext();

  const [isRequestLeaveDrawerVisible, setIsRequestLeaveDrawerVisible] =
    useState(false);

  const { data: LeaveRecordsResponse = [], isLoading: LeaveRecordsLoading } =
    useFetchDataById<LeaveRecord[]>(
      "leaveRequestsUsers",
      "leave/request/user",
      LoggedInUser?.id ?? 0 //
    );
  const { mutate: cancelLeave } = useCreateWithAuthData("leave/cancel");
  const handleCancelLeave = (id: number) => {
    cancelLeave(id, {
      onSuccess: () => {
        Notify.success("Leave request cancelled successfully.");
      },
      onError: (error) => {
        console.error("Error cancelling leave:", error);
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveTypeName",
      key: "leaveTypeName",
      render: (text: string, record: any) => (
        <span className="font-medium text-gray-800">
          {record?.leaveType?.name}
        </span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "startDate",
      render: (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "-",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "endDate",
      render: (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "-",
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
      title: "Action",
      key: "action",
      render: (_: any, record: LeaveRecord) => {
        const canCancel = ["pending", "approved"].includes(
          record?.leaveStatus?.name?.toLowerCase()
        );

        return canCancel ? (
          <Popconfirm
            title="Are you sure you want to cancel this leave request?"
            onConfirm={() => handleCancelLeave(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              size="small"
              className="!bg-main_sandy_brown hover:!bg-main_flax text-white outline-none border-none hover:!text-black transition-colors duration-200"
              danger
            >
              Cancel
            </Button>
          </Popconfirm>
        ) : (
          <span className="text-gray-400">No Action</span>
        );
      },
    },
  ];

  const [chosenLeaveTypeId, setChosenLeaveTypeId] = useState<number | null>(
    null
  );

  const showDrawer = () => {
    setIsRequestLeaveDrawerVisible(true);
  };

  const {
    mutate: requestLeave,
    isPending,
    error: leaveRequestError,
  } = useCreateWithAuthData("leave/request");

  interface LeaveType {
    id: number;
    name: string;
    description: string;
    maxDaysPerYear: number;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface LeaveBalance {
    id: number;
    employeeId: number;
    leaveType: LeaveType;
    year: number;
    totalDays: number;
    usedDays: number;
    createdAt: string;
    updatedAt: string;
  }

  const {
    data: leaveBalance,
    isLoading: leaveBalancesLoading,
    error: leaveBalancesError,
    refetch: refetchLeaveBalance,
  } = useFetchData<LeaveBalance>(
    "api/leave-balances/employee",
    `api/leave-balances/employee/${LoggedInUser?.id}/type/${chosenLeaveTypeId}`
  );

  const handleSubmit = (values: any) => {
    setChosenLeaveTypeId(values.leaveType);
    refetchLeaveBalance();

    var duration = Math.floor(
      (new Date(values.endDate).getTime() -
        new Date(values.startDate).getTime()) /
        (1000 * 3600 * 24)
    );

    if (leaveBalance && leaveBalance.totalDays < duration) {
      Notify.failure(
        `Insufficient leave balance. You have ${leaveBalance.totalDays} days available.`
      );
      return;
    }

    //   prevent user from requesting two leave request with pending status on same leave type

    const existingLeaveRequest = LeaveRecordsResponse.find(
      (record: LeaveRecord) =>
        record.leaveType.id === values.leaveType &&
        record.leaveStatus.name === "pending"
    );
    if (existingLeaveRequest) {
      Notify.failure(
        "You already have a pending leave request for this leave type."
      );
      return;
    }

    const leaveRequest = {
      userId: LoggedInUser?.id,
      leaveTypeId: values.leaveType,
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
      reviewerId: 2,
    };

    requestLeave(leaveRequest, {
      onSuccess: () => {
        Notify.success(
          "Leave request submitted successfully. Awaiting approval."
        );
        setIsRequestLeaveDrawerVisible(false);

        setTimeout(() => {
          refetchLeaveBalance();
          window.location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error requesting leave:", error);
      },
    });
  };

  const requestLeaveValidationSchema = Yup.object().shape({
    leaveType: Yup.string().required("Leave type is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
  });

  return (
    <div className="p-6 space-y-8">
      <Drawer
        title={
          <h2 className="text-xl font-bold text-main_dark">Request Leave</h2>
        }
        placement="right"
        onClose={() => setIsRequestLeaveDrawerVisible(false)}
        open={isRequestLeaveDrawerVisible}
        width={550}
        className="bg-white"
        headerStyle={{
          backgroundColor: "#f0f2f5",
          borderBottom: "1px solid #e8e8e8",
        }}
        bodyStyle={{
          padding: "20px",
          backgroundColor: "#f0f2f5",
        }}
        footerStyle={{
          textAlign: "right",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={requestLeaveValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* <TextInput
                name="email"
                label="Email"
                isRequired={true}
                placeholder="Enter your email"
                // icon={<MailOutlined className="mr-2" />}
                helperText="Please enter your email."
              /> */}
              <SelectInput
                label="Leave Type"
                name="leaveType"
                options={leaveTypes?.map((type: any) => ({
                  label: type.name,
                  value: type.id,
                }))}
                isRequired={true}
                placeholder="Select Leave Type"
              />
              {/* <SelectInput
                label="Leave Status"
                name="leaveStatus"
                options={leaveStatuses?.map((status: any) => ({
                  label: status.name,
                  value: status.id,
                }))}
                isRequired={true}
                placeholder="Select Leave Status"
              /> */}
              <TextInput
                name="startDate"
                label="Start Date"
                type="date"
                isRequired={true}
                placeholder="Select Start Date"
              />
              <TextInput
                name="endDate"
                label="End Date"
                type="date"
                isRequired={true}
                placeholder="Select End Date"
              />

              <div className="flex justify-between items-center">
                {/*  remember me  */}
                {/* <div className="flex items-center justify-center gap-2  p-2 rounded-md">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        className="  accent-bg_primary h-4 w-4"
                      />
                      <label
                        htmlFor="remember"
                        className="text-gray-700 font-medium"
                      >
                        Remember me
                      </label>
                    </div> */}
                <div></div>
                {/* <Link to={"/forgot-password"} className="text-bg_primary">
                  Forgot Password?
                </Link> */}
              </div>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isPending}
                className="w-full bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white py-3 !rounded-none text-base font-semibold shadow-md"
              >
                Request Leave
              </Button>
            </Form>
          )}
        </Formik>
      </Drawer>
      <div>
        <div className="flex items-center bg-white  rounded-lg shadow-md justify-between p-8 border-b ">
          <section className="">
            <h2 className="text-2xl font-bold text-main_dark mb-2 flex items-center gap-2">
              {/* <FaRegCalendarCheck className="text-main_orange" /> Leave Balance */}
            </h2>
            <h1 className="text-gray-600 text-xl">
              Request and manage your leave requests efficiently.
            </h1>
          </section>
          <Button
            type="primary"
            size="large"
            onClick={() => showDrawer()}
            className="!bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white px-6 py-2.5  text-base font-semibold shadow-sm"
          >
            + Request Leave
          </Button>
        </div>
      </div>
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-main_dark mb-4">
          Leave Requests
        </h2>
        <div className="overflow-x-auto">
          <Table
            dataSource={LeaveRecordsResponse}
            columns={columns}
            rowKey="id"
            loading={LeaveRecordsLoading}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </section>
    </div>
  );
};

export default LeaveManagement;
