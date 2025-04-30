export type LeaveType = {
  id: number;
  name: string;
  description: string;
  maxDaysPerYear: number;
  isPaid: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type LeaveTypeListResponse = LeaveType[];

export type UserInfo = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  profile_picture_url: string | null;
  created_at: string;
  updated_at: string;
};

export type LeaveStatus = {
  id: number;
  name: string;
  label: string;
  color: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type LeaveStatusResponse = LeaveStatus[];

export interface LeaveRecord {
  id: number;
  user: UserInfo;
  leaveType: LeaveType;
  reviewer_by: UserInfo;
  start_date: string | null;
  end_date: string | null;
  duration: number;
  created_at: string;
  update_at: string | null;
  leaveStatus: LeaveStatus;
}

export type LeaveRecordsResponse = LeaveRecord[];

export type LeaveRecordByUserResponse = LeaveRecord[];
