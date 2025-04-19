import React, { useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";

interface LeaveType {
  id: number;
  name: string;
  description: string;
}

const LeaveTypesManagement: React.FC = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: 1, name: "Sick Leave", description: "Leave due to illness" },
    {
      id: 2,
      name: "Vacation Leave",
      description: "Leave for personal vacation",
    },
    {
      id: 3,
      name: "Maternity Leave",
      description: "Leave for maternity purposes",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentLeaveType, setCurrentLeaveType] = useState<LeaveType | null>(
    null
  );

  const handleAdd = () => {
    setIsModalVisible(true);
    setCurrentLeaveType(null); // Clear any existing data for a new entry
  };

  const handleEdit = (leaveType: LeaveType) => {
    setIsModalVisible(true);
    setCurrentLeaveType(leaveType);
  };

  const handleSave = () => {
    if (currentLeaveType) {
      if (
        leaveTypes.some(
          (leave) =>
            leave.name === currentLeaveType.name &&
            leave.id !== currentLeaveType.id
        )
      ) {
        message.error("Leave type with this name already exists!");
        return;
      }
      if (currentLeaveType.id) {
        setLeaveTypes(
          leaveTypes.map((leave) =>
            leave.id === currentLeaveType.id ? currentLeaveType : leave
          )
        );
        message.success("Leave type updated successfully!");
      } else {
        const newLeaveType = { ...currentLeaveType, id: leaveTypes.length + 1 };
        setLeaveTypes([...leaveTypes, newLeaveType]);
        message.success("Leave type added successfully!");
      }
      setIsModalVisible(false);
    }
  };

  const columns = [
    { title: "Leave Type", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: LeaveType) => (
        <Button onClick={() => handleEdit(record)} type="primary">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Leave Types Management</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 20 }}>
        Add Leave Type
      </Button>
      <Table
        columns={columns}
        dataSource={leaveTypes}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={currentLeaveType ? "Edit Leave Type" : "Add Leave Type"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        <div>
          <div className="form-item">
            <label>Leave Type Name</label>
            <Input
              value={currentLeaveType?.name || ""}
              onChange={(e) =>
                setCurrentLeaveType({
                  ...currentLeaveType!,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="form-item">
            <label>Description</label>
            <Input.TextArea
              value={currentLeaveType?.description || ""}
              onChange={(e) =>
                setCurrentLeaveType({
                  ...currentLeaveType!,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveTypesManagement;
