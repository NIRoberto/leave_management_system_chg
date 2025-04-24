import { CheckCircle, Clock, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useCreateData,
  useCreateWithAuthData,
  useFetchDataById,
} from "../../Hooks/apiHooks";
import { useAppContext } from "../../Provider/AppProvider";
import { Button, Drawer, Tag } from "antd";
import Table from "antd/es/table";
import { LeaveRecord } from "../Types/leave";
import { Form, Formik } from "formik";
import { SelectInput, TextInput } from "../Shared/UI/FormInput";
import * as Yup from "yup";

const LeaveManagement = () => {
  const { LoggedInUser, leaveTypes, leaveStatuses } = useAppContext();

  const { data: LeaveRecordsResponse = [], isLoading: LeaveRecordsLoading } =
    useFetchDataById<LeaveRecord[]>("leaveRequests", "leave/request/user", 2);

  const [isRequestLeaveDrawerVisible, setIsRequestLeaveDrawerVisible] =
    useState(false);

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
      key: "statusName",
      render: (status: string | null, record: LeaveRecord) => {
        const statusMap: Record<string, string> = {
          approved: "green",
          cancelled: "gray",
          pending: "orange",
          rejected: "red",
        };
        return (
          <Tag color={statusMap[status || ""] || "default"}>
            {record?.leaveStatus?.name?.toUpperCase() || "UNKNOWN"}
          </Tag>
        );
      },
    },
  ];

  console.log("LeaveRecordsResponse", LeaveRecordsResponse);

  const showDrawer = () => {
    setIsRequestLeaveDrawerVisible(true);
  };

  useEffect(() => {}, [LeaveRecordsResponse, leaveTypes, leaveStatuses]);

  const {
    mutate: requestLeave,
    isPending,
    error: leaveRequestError,
  } = useCreateWithAuthData("leave/request");

  const handleSubmit = (values: any) => {
    const leaveRequest = {
      userId: LoggedInUser?.id,
      leaveTypeId: values.leaveType,
      startDate: values.startDate,
      endDate: values.endDate,
    };

    requestLeave(leaveRequest, {
      onSuccess: () => {
        setIsRequestLeaveDrawerVisible(false);
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
                className="w-full bg-main_viridian hover:bg-main_bitter_switter transition-colors duration-200 text-white py-3 !rounded-none text-base font-semibold shadow-md"
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
            <p className="text-lg text-gray-600">
              You have{" "}
              <span className="font-semibold text-main_viridian">10 days</span>{" "}
              of annual leave remaining.
            </p>
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
            pagination={{ pageSize: 5 }}
          />
        </div>
      </section>
    </div>
  );
};

export default LeaveManagement;
