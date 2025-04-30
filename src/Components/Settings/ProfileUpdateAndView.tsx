import { Edit3, Save, XCircle } from "lucide-react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Notify } from "notiflix";
import { useAppContext } from "../../Provider/AppProvider";

// Validation Schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const ProfileUpdateAndView = () => {
  const { LoggedInUser } = useAppContext(); // Assuming LoggedInUser is available in context
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = async (values: any) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Notify.success("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      Notify.failure("Failed to update profile.");
    }
  };

  if (!LoggedInUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {isEditing ? "Edit Your Profile" : "Profile Overview"}
      </h2>

      <Formik
        initialValues={{
          name: LoggedInUser.first_name + " " + LoggedInUser.last_name,
          email: LoggedInUser.email,
          phone: LoggedInUser.phone || "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleSave}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4 mb-8">
              {/* <div className="relative w-32 h-32"> */}
                {/* <img
                  src={LoggedInUser.first_name || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-100 shadow-lg"
                /> */}
                {/* {isEditing && (
                  <span className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-md">
                    <Edit3 size={16} />
                  </span>
                )} */}
              {/* </div> */}
              <p className="text-xl font-medium text-gray-700">
                {LoggedInUser.first_name + " " + LoggedInUser.last_name}
              </p>
            </div>

            {/* Form Fields */}
            {[
              { label: "Full Name", field: "name", type: "text" },
              { label: "Email Address", field: "email", type: "email" },
              { label: "Phone Number", field: "phone", type: "tel" },
            ].map(({ label, field, type }) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  {label}
                </label>
                <Field
                  type={type}
                  id={field}
                  name={field}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg text-gray-800 transition focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "border border-blue-300 focus:ring-blue-200 bg-white"
                      : "border border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />
                {/* {errors[field] && touched[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )} */}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="mt-10 flex justify-center gap-4">
              <button
                type="button"
                onClick={toggleEdit}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition ${
                  isEditing
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-main_viridian text-white hover:bg-main_olivine"
                }`}
              >
                {isEditing ? <XCircle size={18} /> : <Edit3 size={18} />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>

              {isEditing && (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white !bg-main_viridian hover:bg-main_olivine rounded-xl transition"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileUpdateAndView;