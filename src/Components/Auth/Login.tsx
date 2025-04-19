import React from "react";
import { Form, Input, Button, Checkbox, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik handle submit
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Form values", values);
    // Handle login logic here
    navigate("/dashboard/overview");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <Title level={2} className="text-center text-gray-800 mb-6">
          Login
        </Title>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <FormikForm>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Email Field */}
                <div>
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="Email"
                    prefix={<UserOutlined />}
                    size="large"
                    className={`w-full ${
                      touched.email && errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <Field
                    name="password"
                    as={Input.Password}
                    type="password"
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    size="large"
                    className={`w-full ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Remember me checkbox */}
                <div className="flex justify-between items-center">
                  <Checkbox>Remember me</Checkbox>
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Log In
                </Button>

                {/* Sign up link */}
                <div className="text-center">
                  <Space>
                    <span className="text-sm text-gray-500">
                      Don't have an account?
                    </span>
                    <a
                      href="/signup"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Sign up
                    </a>
                  </Space>
                </div>
              </Space>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
