import React, { useState } from "react";
import { Table, Button, Modal, Tag, notification } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppContext } from "../../Provider/AppProvider";
import { SelectInput, TextInput } from "../Shared/UI/FormInput";
import { User } from "../Types/usersTypes";

interface UserFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roleId: number | null;
  password?: string;
}

const UserSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  roleId: Yup.number().required("Role is required"),
  // password: Yup.string().when("$isEdit", {
  //   is: false,
  //   then: Yup.string()
  //     .required("Password is required")
  //     .min(6, "Min 6 characters"),
  // }),
});

const UsersManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "assign-role">("add");

  const { users, roles } = useAppContext();

  const openAddUserModal = () => {
    setCurrentUser(null);
    setMode("add");
    setIsModalVisible(true);
  };

  const openEditUserModal = (user: User) => {
    setCurrentUser(user);
    setMode("edit");
    setIsModalVisible(true);
  };

  const openAssignRoleModal = (user: User) => {
    setCurrentUser(user);
    setMode("assign-role");
    setIsModalVisible(true);
  };

  const handleSave = (values: UserFormValues) => {
    if (mode === "edit" && currentUser) {
      // Update user logic
      console.log("Update user:", { ...currentUser, ...values });
      notification.success({
        message: "User Updated",
        description: "User details have been updated successfully.",
      });
    } else if (mode === "add") {
      // Create new user logic
      console.log("Create user:", values);
      notification.success({
        message: "User Created",
        description: "New user has been added successfully.",
      });
    } else if (mode === "assign-role") {
      // Assign role logic
      console.log("Assign role:", values);
      notification.success({
        message: "Role Assigned",
        description: "User role has been updated successfully.",
      });
    }

    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_: any, record: User) =>
        `${record.first_name} ${record.last_name}`,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Role",
      key: "roleId",
      render: (_: any, record: User) => {
        const role = roles?.find((r: any) => r.id === record.roleId);
        return <Tag color="blue">{role?.name || "N/A"}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <div className="flex gap-2">
          <Button
            type="link"
            size="small"
            onClick={() => openEditUserModal(record)}
            className="bg-main_viridian !text-white hover:!bg-main_olivine transition-colors duration-200 py-1 px-3 rounded"
          >
            Edit
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => openAssignRoleModal(record)}
            className="bg-main_viridian !text-white hover:!bg-main_olivine transition-colors duration-200 py-1 px-3 rounded"
          >
            Assign Role
          </Button>
        </div>
      ),
    },
  ];

  const initialValues: UserFormValues = {
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    roleId: currentUser?.roleId ?? null,
    password: "",
  };

  return (
    <div className="container px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Users Management
        </h2>
        <Button
          type="primary"
          onClick={openAddUserModal}
          size="large"
          className="w-ful bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white py-3 !rounded-none text- font-semibold shadow-md"
        >
          Add User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="shadow-md rounded-md"
      />

      {/* Modal for Add/Edit/Assign Role */}
      <Modal
        title={
          mode === "edit"
            ? "Edit User"
            : mode === "assign-role"
            ? "Assign Role"
            : "Add User"
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="modal-lg"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          onSubmit={handleSave}
          enableReinitialize
          context={{ isEdit: mode === "edit" }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name="first_name"
                  label="First Name"
                  placeholder="Enter first name"
                />
                <TextInput
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter last name"
                />
              </div>
              <TextInput name="email" label="Email" placeholder="Enter email" />
              <TextInput name="phone" label="Phone" placeholder="Enter phone" />
              {mode !== "assign-role" && (
                <SelectInput
                  name="roleId"
                  label="Role"
                  placeholder="Select role"
                  options={roles?.map((role: any) => ({
                    label: role.name,
                    value: role.id,
                  }))}
                />
              )}
              {mode === "add" && (
                <TextInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                />
              )}
              <div className="flex justify-center mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  size="large"
                  className="w-full bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white py-3 !rounded-none te font-semibold shadow-md"
                >
                  {mode === "edit"
                    ? "Update User"
                    : mode === "assign-role"
                    ? "Assign Role"
                    : "Create User"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default UsersManagement;
