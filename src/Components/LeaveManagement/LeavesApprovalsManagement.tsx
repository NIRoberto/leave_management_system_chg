import React, { useState } from "react";
import { Table, Button, Drawer, Modal, message } from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { TextInput, SelectInput } from "../Shared/UI/FormInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppContext } from "../../Provider/AppProvider";

const LeaveApprovalManagement = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { leaveRecords, leaveStatuses, leaveTypes } = useAppContext();

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

  const handleApproval = (status: string) => {
    // Update leave request status logic here
    message.success(`Leave request ${status}`);
    setVisibleModal(false);
  };

  const validationSchema = Yup.object({
    employee: Yup.string().required("Employee is required"),
    leaveType: Yup.string().required("Leave type is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
  });

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (type: string) =>
        leaveTypes?.find((lt: any) => lt.value === type)?.name || type,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        leaveStatuses?.find((ls: any) => ls.value === status)?.name || status,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showDrawer(record)}
            className="mr-2"
          />
          {record.status === "pending" ? (
            <Button
              icon={<CheckCircleOutlined />}
              onClick={() => showApprovalModal(record)}
              className="mr-2"
            >
              Approve
            </Button>
          ) : (
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => showApprovalModal(record)}
            >
              Reject
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6 border-b pb-2">
        <h2 className="text-2xl font-semibold text-dark">Leave Requests</h2>
        <Button
          type="primary"
          size="large"
          onClick={() => showDrawer()}
          className="bg-main_viridian hover:bg-main_bitter_switter transition-colors duration-200 text-white px-6 py-2.5 rounded-md text-base font-semibold shadow-sm"
        >
          + New Leave Request
        </Button>
      </div>
      <Table columns={columns} dataSource={leaveRecords} rowKey="id" />
      <Drawer
        title={isEditing ? "Edit Leave Request" : "Create Leave Request"}
        open={visibleDrawer}
        onClose={closeDrawer}
        width={400}
      >
        <Formik
          initialValues={{
            employee: "employee",
            leaveType: "leaveType",
            startDate: "startDate",
            endDate: "endDate",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (isEditing) {
              // Update logic here
              message.success("Leave request updated successfully!");
            } else {
              // Create logic here
              message.success("Leave request submitted successfully!");
            }
            closeDrawer();
          }}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <TextInput
                label="Employee Name"
                name="employee"
                value={values.employee}
                onChange={handleChange}
              />
              <SelectInput
                label="Leave Type"
                name="leaveType"
                options={leaveTypes}
                value={values.leaveType}
                onChange={handleChange}
              />
              <TextInput
                label="Start Date"
                name="startDate"
                type="date"
                value={values.startDate}
                onChange={handleChange}
              />
              <TextInput
                label="End Date"
                name="endDate"
                type="date"
                value={values.endDate}
                onChange={handleChange}
              />
              <Button type="primary" htmlType="submit" block className="mt-4">
                {isEditing ? "Update" : "Submit"} Leave Request
              </Button>
            </Form>
          )}
        </Formik>
      </Drawer>

      <Modal
        title="Confirm Leave Approval"
        open={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={[
          <Button key="reject" onClick={() => handleApproval("rejected")}>
            Reject
          </Button>,
          <Button
            key="approve"
            type="primary"
            onClick={() => handleApproval("approved")}
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
