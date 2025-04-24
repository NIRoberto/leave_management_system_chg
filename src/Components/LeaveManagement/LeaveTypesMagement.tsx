import React, { useState } from "react";
import { Table, Button, Modal, message, Typography, Space, Spin } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useAppContext } from "../../Provider/AppProvider";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../Shared/UI/FormInput";
import { useCreateData } from "../../Hooks/apiHooks";

const { Title } = Typography;

interface LeaveType {
  id: number;
  name: string;
  description: string;
}

const LeaveTypeSchema = Yup.object().shape({
  name: Yup.string().required("Leave type name is required"),
  description: Yup.string().required("Description is required"),
});

const LeaveTypesManagement: React.FC = () => {
  const {
    leaveTypes,
    isLoggedInUserLoading,
    isLoggedInUserError,
    LoggedInUser,
  } = useAppContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLeaveType, setCurrentLeaveType] = useState<LeaveType | null>(
    null
  );

  const { mutate, isPending } = useCreateData<any>("leave/types");

  const handleAdd = () => {
    setIsModalVisible(true);
    setCurrentLeaveType(null);
  };

  const handleEdit = (leaveType: LeaveType) => {
    setCurrentLeaveType(leaveType);
    setIsModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        message.success("Leave type saved successfully!");
        setIsModalVisible(false);
      },
      onError: () => {
        message.error("Something went wrong. Please try again.");
      },
    });
  };

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: LeaveType) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          type="link"
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="!mb-0">
          Leave Types Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
          className="!bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white px-6 py-2.5 text-base font-semibold shadow-sm"
        >
          Add Leave Type
        </Button>
      </div>

      {isLoggedInUserLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={leaveTypes}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="border rounded-lg"
        />
      )}

      <Modal
        title={currentLeaveType ? "Edit Leave Type" : "Add Leave Type"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        centered
        width={600}
      >
        <Formik
          initialValues={{
            name: currentLeaveType?.name || "",
            description: currentLeaveType?.description || "",
          }}
          validationSchema={LeaveTypeSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4 mt-4">
              <TextInput
                name="name"
                label="Leave Type Name"
                isRequired
                placeholder="e.g. Annual Leave"
              />
              <TextInput
                name="description"
                label="Description"
                isRequired
                placeholder="Enter description"
                type="textarea"
              />
              <Space className="flex justify-end">
                <Button
                  onClick={() => setIsModalVisible(false)}
                  className="!bg-gray-500 hover:!bg-gray-600 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isPending}
                  className="!bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white px-6 py-2.5 text-base font-semibold shadow-sm"
                >
                  {currentLeaveType ? "Update" : "Create"}
                </Button>
              </Space>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default LeaveTypesManagement;
