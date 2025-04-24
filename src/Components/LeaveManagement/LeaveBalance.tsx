import React, { useState } from "react";
import {
  Card,
  InputNumber,
  Button,
  Row,
  Col,
  Typography,
  Space,
  message,
  Spin,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useAppContext } from "../../Provider/AppProvider";
import { useUpdateData } from "../../Hooks/apiHooks";

const { Text } = Typography;

// Define the LeaveType type for better type safety
export type LeaveType = {
  id: number;
  name: string;
  description: string;
  maxDaysPerYear: number;
  isPaid: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

const LeaveBalanceManagement = () => {
  const { leaveTypes } = useAppContext(); // leaveTypes should be of type LeaveType[]
  const [leaveBalances, setLeaveBalances] = useState<any[]>([]); // Store leave balances

  const { mutate, isPending } = useUpdateData("leave/types");

  // Ensure leaveTypes is available
  if (!leaveTypes) {
    return <Spin />;
  }

  const handleAddLeaveDays = (
    leaveTypeId: number,
    currentUsedDays: number,
    newLeaveDays: number
  ) => {
    const leaveType = leaveTypes.find((type) => type.id === leaveTypeId);
    if (!leaveType) return;

    if (newLeaveDays <= 0) {
      message.error("Please enter a valid number of leave days.");
      return;
    }
    if (currentUsedDays + newLeaveDays > leaveType.maxDaysPerYear) {
      message.error("Total used days cannot exceed total days.");
      return;
    }

    // Update local state for immediate UI feedback
    setLeaveBalances((prevBalances) =>
      prevBalances.map((balance) =>
        balance.leaveTypeId === leaveTypeId
          ? { ...balance, currentUsedDays: currentUsedDays + newLeaveDays }
          : balance
      )
    );

    // Call mutate to update leave balance via API
    mutate(
      {
        id: leaveTypeId.toString(),
        data: { usedDays: currentUsedDays + newLeaveDays },
      },
      {
        onSuccess: () => {
          message.success("Leave balance updated successfully.");
        },
        onError: () => {
          message.error("Failed to update leave balance. Please try again.");
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-start justify-start min-h-16 bg-bg_primary p-8 rounded-lg shadow-md mb-6 bg-white ">
        <h1 className="text-2xl font-semibold text-start text-bg_primary ">
          Leave Balance Management
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leaveTypes.map((leaveType: LeaveType) => {
          const { id, name, maxDaysPerYear } = leaveType;
          const remainingDays = maxDaysPerYear - 0; // Update the remaining days calculation logic

          return (
            <Card
              key={id}
              title={`${name} Leave Balance Management`}
              bordered={false}
              className="shadow-lg rounded-lg m-4"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Total Days:</Text>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#4A4A68",
                    }}
                  >
                    {maxDaysPerYear}
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Used Days:</Text>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#4A4A68",
                    }}
                  >
                    {0} {/* Placeholder, update with actual used days */}
                  </div>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Text strong>Remaining Days:</Text>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#4A4A68",
                    }}
                  >
                    {remainingDays}
                  </div>
                </Col>
              </Row>

              <Space
                direction="vertical"
                style={{ width: "100%", marginTop: 20 }}
              >
                <InputNumber
                  min={0}
                  max={remainingDays}
                  placeholder="Enter number of days"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#FAFCFE",
                    transition: "all 0.3s",
                  }}
                  onChange={(value) => {
                    // Update the input value dynamically
                    setLeaveBalances((prevBalances) =>
                      prevBalances.map((balance) =>
                        balance.leaveTypeId === id
                          ? { ...balance, newLeaveDays: value ?? 0 }
                          : balance
                      )
                    );
                  }}
                />
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  block
                  onClick={() => {
                    const balance = leaveBalances.find(
                      (balance) => balance.leaveTypeId === id
                    );
                    if (balance) {
                      handleAddLeaveDays(
                        id,
                        balance.currentUsedDays,
                        balance.newLeaveDays
                      );
                    }
                  }}
                  disabled={remainingDays <= 0}
                  loading={isPending}
                  style={{
                    backgroundColor: "#13B156",
                    color: "white",
                    borderRadius: "8px",
                    padding: "12px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    transition: "all 0.3s",
                  }}
                >
                  Update Leave Balance
                </Button>
              </Space>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default LeaveBalanceManagement;
