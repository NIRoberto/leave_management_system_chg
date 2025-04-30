import React, { useState } from "react";
import {
  Table,
  Button,
  Tag,
  notification,
  Drawer,
  Card,
  Typography,
} from "antd";
import { PhoneOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

// Formik and validation
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { UserSwitchOutlined, TeamOutlined } from "@ant-design/icons";

// Custom components and types
import { useAppContext } from "../../Provider/AppProvider";
import { SelectInput, TextInput } from "../Shared/UI/FormInput";
import { User } from "../Types/usersTypes";
import StatusDropdownFilter from "../Shared/UI/FilterTypes";
import { Notify } from "notiflix";
import {
  useCreateData,
  useUpdateWithTwoParameters,
} from "../../Hooks/apiHooks";

const { Title, Text } = Typography;

// Validation Schema
const UserSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  roleId: Yup.number().required("Role is required"),
});

// Initial Values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  roleId: null,
};

const CreateUser = () => {
  const { roles } = useAppContext();
  const { mutate, isPending } = useCreateData<any>("auth/register");

  const handleSubmit = (values: typeof initialValues) => {
    mutate(
      {
        ...values,
      },
      {
        onSuccess: () => {
          Notify.success("User created successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        onError: (error: any) => {
          Notify.failure(
            error?.response?.data?.message || "Failed to create user"
          );
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-white p-2  rounded-lg w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* First Name */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="firstName"
                  label="First Name"
                  isRequired={true}
                  placeholder="Enter first name"
                  icon={<UserOutlined className="mr-2" />}
                  helperText="Please enter the user's first name."
                />

                <TextInput
                  name="lastName"
                  label="Last Name"
                  isRequired={true}
                  placeholder="Enter last name"
                  icon={<UserOutlined className="mr-2" />}
                  helperText="Please enter the user's last name."
                />
              </div>
              <TextInput
                name="email"
                label="Email"
                isRequired={true}
                placeholder="Enter email"
                icon={<MailOutlined className="mr-2" />}
                helperText="Please enter the user's email."
              />
              <TextInput
                name="phone"
                label="Phone"
                isRequired={true}
                placeholder="Enter phone number"
                icon={<PhoneOutlined className="mr-2" />}
                helperText="Please enter the user's phone number."
              />

              <SelectInput
                name="roleId"
                label="Role"
                isRequired={true}
                options={
                  roles?.map((role) => ({
                    label:
                      role.name.charAt(0).toUpperCase() +
                      role.name.slice(1).toLowerCase(),
                    value: role.id,
                  })) || []
                }
                placeholder="Select a role"
                helperText="Please select the user's role."
              />

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isPending}
                className="w-full bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white py-3 rounded-md text-base font-semibold shadow-md"
              >
                Create User
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const UserProfileCard = ({ user }: { user: User }) => {
  return (
    <Card
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md"
      cover={
        user.profile_picture_url ? (
          <img
            src={
              user.profile_picture_url ||
              "https://www.shutterstock.com/image-vector/simple-gray-avatar-icons-representing-600nw-2473353263.jpg"
            }
            alt={`${user.first_name} ${user.last_name}`}
            className="h-40 w-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="h-40 bg-gray-300 rounded-t-lg flex justify-center items-center text-white text-4xl">
            {user.first_name.charAt(0)}
            {user.last_name.charAt(0)}
          </div>
        )
      }
      actions={[
        <div className="flex p-2 items-center gap-1 text-sm text-gray-600">
          <PhoneOutlined />
          <Text>{user.phone}</Text>
        </div>,
        <div className="flex p-2 items-center gap-1 text-sm text-gray-600">
          <MailOutlined />
          <Text>{user.email}</Text>
        </div>,
        // <div className="flex items-center gap-1 text-sm text-gray-600">
        //   <IdcardOutlined />
        //   <Text>{user.role.name}</Text>
        // </div>,
      ]}
    >
      <Title level={4} className="text-gray-800 mb-2">
        {user.first_name} {user.last_name}
      </Title>
      <Text className="text-gray-600 text-sm">{user.gender}</Text>

      <div className="mt-4">
        <Tag color="blue">{user.role.name}</Tag>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <Text strong>Role Description: </Text>
        <Text>{user.role.description}</Text>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <Text>Joined on: {new Date(user.created_at).toLocaleDateString()}</Text>
      </div>
    </Card>
  );
};

interface UserFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roleId: number | null;
  password?: string;
}

const UsersManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "assign-role">("add");

  const [selectedRole, setSelectedRole] = useState<number | null>(null);

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
      console.log("Assign role:", values);
      notification.success({
        message: "Role Assigned",
        description: "User role has been updated successfully.",
      });
    }
    setIsModalVisible(false);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(Number(value));
  };

  const columns = [
    {
      title: "S/N",
      key: "index",
      render: (_: any, __: any, index: number) => {
        const pageIndex = (page - 1) * pageSize + index + 1;
        return <span>{pageIndex}</span>;
      },
    },
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
        const roleName = record?.role?.name;

        return (
          <Tag
            color={
              roleName === "ADMIN"
                ? "volcano" // Red for admin
                : roleName === "MANAGER"
                ? "blue" // Blue for managers
                : roleName === "STAFF"
                ? "green"
                : "gray" // Default gray color for undefined roles
            }
          >
            {roleName?.charAt(0).toUpperCase() + roleName?.slice(1)}{" "}
            {/* Capitalize first letter */}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <div className="flex gap-3">
          {/* <Button
            type="link"
            size="small"
            onClick={() => openEditUserModal(record)}
            className="flex items-center !border-none gap-2 p-2 !rounded-md !bg-[#F15D37] !text-white hover:!bg-[#FDA352] focus:outline-none focus:ring-2 focus:ring-[#F15D37] transition-all duration-300 py-2 px-4 shadow-sm hover:scale-105"
          > */}
          {/* <EditOutlined className="text-lg" /> Edit icon */}
          {/* Edit */}
          {/* </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => openAssignRoleModal(record)}
            className="flex items-center !border-none gap-2 p-2  !rounded-md !bg-[#FFAA2C] !text-white hover:!bg-[#FDA352] focus:outline-none focus:ring-2 focus:ring-[#FFAA2C] transition-all duration-300 py-2 px-4 shadow-sm hover:scale-105"
          >
            {/* <UserAddOutlined className="text-lg" /> Assign role icon */}
            Assign Role
          </Button>
        </div>
      ),
    },
  ];

  const {
    mutate: assignRole,
    isPending: isAssignRolePending,
    isError: assignRoleError,
    error: assignRoleErrorMessage,
  } = useUpdateWithTwoParameters("users");

  const handleMakeAdmin = () => {
    if (currentUser) {
      assignRole(
        {
          roleId: 3,
          userId: currentUser.id,
          data: undefined,
        },
        {
          onSuccess: () => {
            Notify.success("User role updated to Admin successfully!");
            setIsModalVisible(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          onError: (error: any) => {
            Notify.failure(
              error?.response?.data?.message || "Failed to update user role"
            );
          },
        }
      );
    }
  };

  const handleMakeManager = () => {
    if (currentUser) {
      assignRole(
        {
          roleId: 2,
          userId: currentUser.id,
          data: undefined,
        },
        {
          onSuccess: () => {
            Notify.success("User role updated to Manager successfully!");
            setIsModalVisible(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          onError: (error: any) => {
            Notify.failure(
              error?.response?.data?.message || "Failed to update user role"
            );
          },
        }
      );
    }
  };

  const RoleManagementButtons = () => {
    return (
      <div className="flex m-8 gap-4">
        {/* Make Admin Button */}
        <Button
          type="primary"
          icon={<UserSwitchOutlined />}
          size="large"
          loading={isAssignRolePending}
          onClick={handleMakeAdmin}
          className="flex items-center gap-2 bg-main_viridian text-white hover:bg-main_olivine transition-all duration-300 py-2 px-6 rounded-lg shadow-md hover:scale-105"
        >
          Make Admin
        </Button>
        <Button
          type="primary"
          icon={<TeamOutlined />}
          size="large"
          loading={isAssignRolePending}
          onClick={handleMakeManager}
          className="flex items-center gap-2 bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300 py-2 px-6 rounded-lg shadow-md hover:scale-105"
        >
          Make Manager
        </Button>
      </div>
    );
  };

  return (
    <div className="container bg-white min-h-screen max-h-screen px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Users Management
        </h2>
        <Button
          type="primary"
          onClick={openAddUserModal}
          size="large"
          // icon={<PlusIcon className="mr-2" />} // Adjusting the icon spacing for better alignment
          className="flex gap-4 items-center justify-center bg-main_viridian hover:!bg-main_olivine focus:bg-main_olivine transition-all duration-300 text-white py-3 px-6 rounded-md text-md font-semibold shadow-lg transform hover:scale-105 focus:ring-2 focus:ring-main_viridian"
        >
          <span>+</span>
          <span>Add User</span>
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div></div>
        <StatusDropdownFilter
          value={selectedRole?.toString() || ""}
          onChange={handleRoleChange}
          statusOptions={
            roles?.map((role) => ({
              label: role.name,
              value: role.id.toString(),
            })) || []
          }
          label="Filter by Role"
        />
      </div>
      <Table
        columns={columns}
        dataSource={
          users?.filter((user) =>
            selectedRole ? user.role.id === selectedRole : true
          ) || []
        }
        rowKey="id"
        pagination={{
          current: page,
          pageSize,
          total: users?.filter((user) =>
            selectedRole ? user.role.id === selectedRole : true
          ).length,

          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        className="shadow-md rounded-md"
      />
      <Drawer
        title={
          <div className="flex items-center text-xl gap-2">
            {/* <UserSwitchOutlined /> */}
            <span>
              {mode === "add"
                ? "Add New User"
                : mode === "edit"
                ? "Edit User"
                : "Assign Role"}
            </span>
          </div>
        }
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        footer={null}
        width={550}
        className="modal-lg"
      >
        {mode === "add" && <CreateUser />}
        {currentUser && <UserProfileCard user={currentUser} />}

        {currentUser && currentUser.role?.id !== 3 && <RoleManagementButtons />}
      </Drawer>
    </div>
  );
};

export default UsersManagement;
