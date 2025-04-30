import { Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import { PasswordInput, TextInput, SelectInput } from "../Shared/UI/FormInput";
import { useCreateData } from "../../Hooks/apiHooks";
import { Notify } from "notiflix";
import Cookies from "js-cookie";
import { StorageKeys } from "../../Config/StorageKeys";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } =
    useCreateData<any>("auth/login");

  const handleSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    const data = { email, password };
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.token) {
          localStorage.setItem(StorageKeys.ACCESS_TOKEN, data?.token);
          Cookies.set(StorageKeys.ACCESS_TOKEN, data?.token, {
            expires: 1,
          });

          Notify.success("Welcome back! You are logged in successfully.");
          setTimeout(() => {
            navigate("/dashboard/overview");
          }, 1500);
        }
      },
      onError: (error: any) => {
        console.log(error?.response?.data?.message);
        Notify.failure(error?.response?.data?.message || "Login failed");
      },
    });
    // navigate("/dashboard/overview");
  };

  return (
    <div className="flex items-center justify-center min-h-">
      <div className="bg-white p-8 shadow-lg rounded- w-full max-w-md">
        {/* <LogoContainer /> */}
        <h2 className="text-2xl font-semibold text-center text-bg_primary mb-6">
          Welcome Back! Access Your Leave Dashboard
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <TextInput
                name="email"
                label="Email"
                isRequired={true}
                placeholder="Enter your email"
                icon={<MailOutlined className="mr-2" />}
                helperText="Please enter your email."
              />
              <PasswordInput
                name="password"
                label="Password"
                isRequired={true}
                type="password"
                placeholder="Enter your password"
                icon={<LockOutlined className="mr-2" />}
                helperText="Minimum 6 characters required."
              />
              <div className="flex justify-between items-center">
                {/*  remember me  */}
                {/* <div className="flex items-center justify-center gap-2  p-2 rounded-md">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        className="  accent-bg_primary h-4 w-4"
                      />
                      <label
                        htmlFor="remember"
                        className="text-gray-700 font-medium"
                      >
                        Remember me
                      </label>
                    </div> */}
                <div></div>
                {/* <Link to={"/forgot-password"} className="text-bg_primary">
                  Forgot Password?
                </Link> */}
              </div>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isPending}
                className="w-full bg-main_viridian hover:!bg-main_olivine transition-colors duration-200 text-white py-3 !rounded-none text-base font-semibold shadow-md"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
