import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PasswordInput } from "../Shared/UI/FormInput"; // Reusable PasswordInput component
import { Notify } from "notiflix";
import { useCreateData, useCreateWithAuthData } from "../../Hooks/apiHooks";
import { Button } from "antd";

// Dummy function to simulate API call for changing password

// Validation Schema
const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const {
    mutate: changePasswordAPI,
    isPending,
    isError,
    error,
  } = useCreateWithAuthData<any>("auth/change-password");

  const handleChangePassword = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const { currentPassword, newPassword } = values;
    changePasswordAPI(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          Notify.success("Password changed successfully.");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        onError: (error) => {
          console.error("Error changing password:", error);
          Notify.failure("Failed to change password.");
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Change Password
      </h2>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleChangePassword}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Current Password */}
            <PasswordInput
              name="currentPassword"
              label="Current Password"
              isRequired={true}
              placeholder="Enter your current password"
              helperText="Please enter your current password."
            />

            {/* New Password */}
            <PasswordInput
              name="newPassword"
              label="New Password"
              isRequired={true}
              placeholder="Enter your new password"
              helperText="Password must be at least 6 characters."
            />

            {/* Confirm New Password */}
            <PasswordInput
              name="confirmPassword"
              label="Confirm New Password"
              isRequired={true}
              placeholder="Confirm your new password"
              helperText="Passwords must match."
            />

            {/* Submit Button */}
            <div>
              <Button
                loading={isPending}
                htmlType="submit"
                size="large"
                disabled={isPending}
                className="w-full bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 !text-white py-3 !rounded-none text-base font-semibold shadow-md"
              >
                {isPending ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
