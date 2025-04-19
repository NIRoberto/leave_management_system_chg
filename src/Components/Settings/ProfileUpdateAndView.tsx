import { Edit3, Save, XCircle } from "lucide-react";
import React, { useState } from "react";

const initialProfile = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+123456789",
  profilePicture: "https://via.placeholder.com/150",
};

const ProfileUpdateAndView = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    console.log("Profile updated:", profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {isEditing ? "Edit Your Profile" : "Profile Overview"}
      </h2>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="relative w-32 h-32">
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-blue-100 shadow-lg"
          />
          {isEditing && (
            <span className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-md">
              <Edit3 size={16} />
            </span>
          )}
        </div>
        <p className="text-xl font-medium text-gray-700">{profile.name}</p>
      </div>

      <div className="space-y-6">
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
            <input
              type={type}
              id={field}
              name={field}
              value={(profile as any)[field]}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 rounded-lg text-gray-800 transition focus:outline-none focus:ring-2 ${
                isEditing
                  ? "border border-blue-300 focus:ring-blue-200 bg-white"
                  : "border border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <button
          onClick={toggleEdit}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition ${
            isEditing
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isEditing ? <XCircle size={18} /> : <Edit3 size={18} />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        {isEditing && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition"
          >
            <Save size={18} />
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileUpdateAndView;
