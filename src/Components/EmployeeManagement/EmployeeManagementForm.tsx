import React, { useState } from "react";

const EmployeeManagementForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    hireDate: "",
    address: "",
    city: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form data (could send to API or store in state)
    console.log("Form submitted", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      department: "",
      hireDate: "",
      address: "",
      city: "",
      country: "",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-main_dark mb-6">
        Employee Management
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter employee's name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter employee's email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter employee's phone number"
          />
        </div>

        {/* Job Details */}
        <div className="mb-4">
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-600"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter job title"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-600"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter department"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="hireDate"
            className="block text-sm font-medium text-gray-600"
          >
            Hire Date
          </label>
          <input
            type="date"
            id="hireDate"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Address Information */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter address"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-600"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter city"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-600"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter country"
          />
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-main_orange text-white rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-400 text-white rounded-md"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-600 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeManagementForm;
