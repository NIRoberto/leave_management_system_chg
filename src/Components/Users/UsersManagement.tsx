import React, { useState } from "react";
import { Table, Button, Modal, Select, Checkbox, message, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface User {
  id: number;
  name: string;
  role: string;
  permissions: string[];
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", role: "Admin", permissions: ["View", "Edit"] },
    { id: 2, name: "Jane Smith", role: "User", permissions: ["View"] },
    {
      id: 3,
      name: "Sam Wilson",
      role: "Editor",
      permissions: ["View", "Edit"],
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const availableRoles: string[] = ["Admin", "User", "Editor", "Guest"];
  const availablePermissions: string[] = ["View", "Edit", "Delete", "Manage"];

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleRoleChange = (role: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    }
  };

  const handlePermissionChange = (permissions: string[]) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, permissions });
    }
  };

  const handleSave = () => {
    if (currentUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === currentUser.id ? { ...currentUser } : user
        )
      );
      setIsModalVisible(false);
      message.success("User updated successfully!");
    }
  };

  const columns = [
    { title: "User Name", dataIndex: "name", key: "name" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => permissions.join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Users Management</h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        {currentUser && (
          <div>
            <div className="form-item">
              <label>Role</label>
              <Select
                value={currentUser.role}
                onChange={handleRoleChange}
                style={{ width: "100%" }}
              >
                {availableRoles.map((role) => (
                  <Select.Option key={role} value={role}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className="form-item">
              <label>Permissions</label>
              <Checkbox.Group
                value={currentUser.permissions}
                onChange={handlePermissionChange}
              >
                {availablePermissions.map((permission) => (
                  <Checkbox key={permission} value={permission}>
                    {permission}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersManagement;
