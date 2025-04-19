import React, { useState } from "react";

interface LeaveBalanceProps {
  leaveType: string;
  totalDays: number;
  usedDays: number;
}

const LeaveBalanceManagement: React.FC<LeaveBalanceProps> = ({
  leaveType,
  totalDays,
  usedDays,
}) => {
  // State to manage the current leave balance
  const [currentUsedDays, setCurrentUsedDays] = useState(usedDays);
  const [newLeaveDays, setNewLeaveDays] = useState(0);

  // Calculate remaining leave days
  const remainingDays = totalDays - currentUsedDays;

  // Handle the form submission to add leave days
  const handleAddLeaveDays = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUsedDays(currentUsedDays + newLeaveDays);
    setNewLeaveDays(0); // Reset the input field
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLeaveDays(Number(e.target.value));
  };

  return (
    <div className="leave-balance-card">
      <h3>{leaveType} Leave Balance Management</h3>
      <div>
        <strong>Total Days:</strong> {totalDays}
      </div>
      <div>
        <strong>Used Days:</strong> {currentUsedDays}
      </div>
      <div>
        <strong>Remaining Days:</strong> {remainingDays}
      </div>

      <form onSubmit={handleAddLeaveDays} className="leave-form">
        <div>
          <label htmlFor="add-leave">Add Leave Days:</label>
          <input
            type="number"
            id="add-leave"
            value={newLeaveDays}
            onChange={handleInputChange}
            min="0"
            placeholder="Enter number of days"
            required
          />
        </div>
        <button type="submit">Update Leave Balance</button>
      </form>
    </div>
  );
};

export default LeaveBalanceManagement;
