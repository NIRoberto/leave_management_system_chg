"use client";

import { useEffect, useState } from "react";
import { Field, FieldProps, useField } from "formik";
import {
  Input,
  Select,
  Upload,
  DatePicker,
  Checkbox,
  Tooltip,
  Button as AntdButton,
  ButtonProps as AntdButtonProps,
} from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { InputProps } from "antd/es/input";
import { SelectProps } from "antd/es/select";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import { Notify } from "notiflix";
import { classMerge } from "../../../Utils/class-merge";
// Custom styles for improved user experience

const { TextArea } = Input;
const { Option } = Select;

// Common Props Interface
interface CommonProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
}

interface OtpInputProps extends Omit<InputProps, "name"> {
  name: string;
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
  length?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  name,
  label,
  helperText,
  icon,
  length = 6,
  ...props
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < length - 1) {
        document.getElementById(`${name}-${index + 1}`)?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("Text")
      .slice(0, length)
      .split("");
    setOtp(pastedData);
  };

  return (
    <div className="form-field space-y-2">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {helperText && (
            <Tooltip title={helperText}>
              <InfoCircleOutlined className="ml-1 text-gray-500" />
            </Tooltip>
          )}
        </label>
      )}
      <div className="flex gap-2">
        {otp.map((value, index) => (
          <Input
            key={index}
            id={`${name}-${index}`}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            maxLength={1}
            onPaste={handlePaste}
            prefix={icon}
            style={{ padding: "18px" }}
            className="otp-input w-10 text-center"
            {...props}
          />
        ))}
      </div>
    </div>
  );
};

interface TextInputProps extends Omit<InputProps, "name">, CommonProps {
  icon?: React.ReactNode;
  isRequired?: boolean;
}
export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  helperText,
  isRequired = false,
  icon,
  ...props
}) => (
  <div className="form-field space-y-2 ">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {/* {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )} */}
        {isRequired ? <span className="text-red-600"> *</span> : <span></span>}
      </label>
    )}
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <Input
            {...field}
            {...props}
            // prefix={icon}
            style={{ padding: "8px" }}
            className={`form-input  !rounded-none py-3${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

export const PhoneInput: React.FC<TextInputProps> = ({
  name,
  label,
  helperText,
  icon,
  ...props
}) => (
  <div className="form-field space-y-2">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {/* {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )} */}
      </label>
    )}
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <Input
            {...field}
            {...props}
            // prefix={icon}
            style={{ padding: "8px" }}
            className={`form-input ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

export const PasswordInput: React.FC<TextInputProps> = ({
  name,
  label,
  helperText,
  icon,
  isRequired = false,
  ...props
}) => (
  <div className="form-field space-y-2">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {/* {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )} */}
        {isRequired && <span className="text-red-600"> *</span>}
      </label>
    )}
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <Input.Password
            {...field}
            {...props}
            // prefix={icon}
            visibilityToggle
            style={{ padding: "8px" }}
            className={`form-input !rounded-none ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

// Define the button props interface
interface ButtonProps extends Omit<AntdButtonProps, "type"> {
  label: string; // The button label (text)
  type?: "primary" | "default" | "dashed" | "link" | "text" | "ghost"; // Optional prop for button type
  onClick?: () => void; // Optional onClick handler
  href?: string; // Optional href for link buttons
  loading?: boolean; // Optional loading state
  icon?: React.ReactNode; // Optional icon
  className?: string; // Optional custom classes
}

export const CustomButton: React.FC<ButtonProps> = ({
  label,
  type = "primary", // Default to primary button type
  onClick,
  href,
  loading = false,
  icon,
  className = "",
  ...rest
}) => {
  return (
    <AntdButton
      // type={type}
      onClick={onClick}
      href={href}
      loading={loading}
      icon={icon}
      className={`w-full py-3 ${className}`} // You can customize the padding here
      {...rest}
    >
      {label}
    </AntdButton>
  );
};

// Text Area Component
interface TextAreaInputProps extends CommonProps {
  rows?: number;
}
export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  name,
  label,
  helperText,
  placeholder,
  rows = 4,
}) => (
  <div className="form-field space-y-2">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )}
      </label>
    )}
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <TextArea
            {...field}
            rows={rows}
            placeholder={placeholder}
            className={`form-input p-2 !rounded-none ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

interface PhoneInputFieldProps {
  label: string;
  name: string;
  isRequired?: boolean;
  placeholder?: string;
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  label,
  name,
  isRequired = false,
  placeholder = "Enter your phone number",
}) => {
  const [field, meta, helpers] = useField(name);
  const [countries, setCountries] = useState<
    { name: string; dialCode: string; flag: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState("+250");

  // Fetch country codes and flags
  useEffect(() => {
    let isMounted = true;

    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        if (isMounted) {
          const countriesData = response.data
            .map((country: any) => ({
              name: country.name.common,
              dialCode:
                country.idd?.root +
                (country.idd?.suffixes ? country.idd.suffixes[0] : ""),
              flag: country.flags?.png || "",
            }))
            .filter(
              (country: { dialCode: any; flag: any }) =>
                country.dialCode && country.flag
            );
          setCountries(countriesData);
        }
      } catch (error) {
        if (error instanceof Error) {
          Notify.failure(error.message);
        } else {
          Notify.failure("An unknown error occurred");
        }
      }
    };

    fetchCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle phone number input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9\s]/g, "").slice(0, 15);
    console.log(value);
    helpers.setValue(value);
  };

  return (
    <div className="mb-6">
      {/* Label */}
      <label
        htmlFor={name}
        className="block form-label text-gray-800 font-semibold mb-2"
      >
        {label}
        {isRequired && <span className="text-red-600"> *</span>}
      </label>

      {/* Input Group */}
      <div
        className={`flex border rounded-none shadow-sm overflow-hidden focus-within:ring-2 

        `}
      >
        {/* Country Code Selector */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          disabled
          className="bg-white border-r px-3 py-2 text-gray-400 focus:outline-none rounded-none focus:ring-0 w-24"
          aria-label="Country code selector"
        >
          {countries.map((country, index) => (
            <option key={index} value={country.dialCode}>
              {country.flag ? (
                <img
                  src={country.flag}
                  alt={country.name}
                  className="inline-block w-5 h-3 mr-2"
                />
              ) : (
                "🌍"
              )}
              {country.dialCode}
            </option>
          ))}
        </select>

        {/* Phone Number Input */}
        <input
          {...field}
          type="text"
          placeholder={placeholder}
          onChange={handlePhoneChange}
          className="w-full px-3 py-2 rounded-none text-gray-700 focus:outline-none"
          aria-label="Phone number input"
        />
      </div>
      {/* Validation Error */}
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

// Select Component

interface SelectInputProps extends SelectProps<any> {
  name: string;
  label?: string;
  helperText?: string;
  // options: { value: string; label: string }[];
  isRequired?: boolean;
  setSearch?: (value: string) => void;
}

export const SelectInputWithSearch: React.FC<SelectInputProps> = ({
  name,
  label,
  helperText,
  options,
  setSearch,
  placeholder,
  isRequired = false,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="form-field !capitalize !rounded-none space-y-2 flex flex-col">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {helperText && (
            <Tooltip title={helperText}>
              <InfoCircleOutlined className="ml-1 text-gray-500" />
            </Tooltip>
          )}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
      )}
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => (
          <>
            <Select
              {...field}
              {...props}
              size="large"
              showSearch
              value={field.value}
              searchValue={searchValue}
              onSearch={(value) => {
                setSearchValue(value);
                setSearch && setSearch(value);
              }}
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                form.setFieldValue(name, value);
                setSearchValue(""); // Reset search on select
              }}
              style={{ color: "black" }}
              className={`form-input text-black ${
                meta.touched && meta.error ? "border-red-500" : ""
              }`}
              placeholder={placeholder || "Select an option"}
              optionFilterProp="label"
            >
              {options?.map((option) => (
                <Option
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </Option>
              ))}
            </Select>
            {meta.touched && meta.error && (
              <div className="error-message text-red-600">{meta.error}</div>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  helperText,
  options,
  placeholder,
  isRequired = false,
  showSearch = true,
  ...props
}) => {
  return (
    <div className="form-field !capitalize !rounded-none space-y-2 flex flex-col">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {helperText && (
            <Tooltip title={helperText}>
              <InfoCircleOutlined className="ml-1 text-gray-500" />
            </Tooltip>
          )}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
      )}
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => (
          <>
            <Select
              {...field}
              {...props}
              size="large"
              showSearch={showSearch}
              style={{
                color: "black",
              }}
              className={classMerge(
                `form-input  text-black ${
                  meta.touched && meta.error ? "border-red-500" : ""
                }`,
                props.className
              )}
              placeholder={placeholder || "Select an option"} // Explicit placeholder
              optionFilterProp="label"
              onChange={(value) => form.setFieldValue(name, value)}
              options={options?.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
            ></Select>
            {meta.touched && meta.error && (
              <div className="error-message text-red-600">{meta.error}</div>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

// Multi-Select Component
export const MultiSelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  helperText,
  options,
  ...props
}) => (
  <div className="form-field space-y-2">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )}
      </label>
    )}
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => (
        <>
          <Select
            {...field}
            {...props}
            mode="multiple"
            className={`form-input ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
            onChange={(value) => form.setFieldValue(name, value)}
          >
            {options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

// Image Upload Component
interface ImageUploadInputProps extends CommonProps {
  onChange?: (fileList: UploadFile[]) => void;
}
export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  name,
  label,
  helperText,
  onChange,
}) => (
  <div className="form-field space-y-2">
    {label && (
      <label className="form-label">
        {label}
        {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )}
      </label>
    )}
    <Field name={name}>
      {({ meta, form }: FieldProps) => (
        <>
          <Upload
            listType="picture"
            maxCount={1}
            onChange={({ fileList }: UploadChangeParam) => {
              form.setFieldValue(name, fileList);
              onChange && onChange(fileList);
            }}
          >
            <button type="button" className="ant-btn ant-btn-dashed">
              <UploadOutlined /> Upload Image
            </button>
          </Upload>
          {meta.touched && meta.error && (
            <div className="error-message  text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

// Date Picker Component
export const DateInput: React.FC<CommonProps> = ({
  name,
  label,
  helperText,
}) => (
  <div className="form-field space-y-2">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )}
      </label>
    )}
    <Field name={name}>
      {({ meta, form }: FieldProps) => (
        <>
          <DatePicker
            className={`form-input ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
            onChange={(date) => form.setFieldValue(name, date)}
          />
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

export const DateRangePicker = ({ name, label, helperText }: CommonProps) => (
  <div className="form-field !capitalize !rounded-none space-y-2 flex flex-col">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )}
      </label>
    )}
    <Field name={name}>
      {({ meta, form }: FieldProps) => (
        <>
          <DatePicker.RangePicker
            size="large"
            className={`form-input ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
            onChange={(dates) => form.setFieldValue(name, dates)}
          />
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

// Checkbox Component
export const CheckboxInput: React.FC<CommonProps> = ({
  name,
  label,
  helperText,
}) => (
  <div className="form-field space-y-2">
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <Checkbox {...field}>
            {label}
            {helperText && (
              <Tooltip title={helperText}>
                <InfoCircleOutlined className="ml-1 text-gray-500" />
              </Tooltip>
            )}
          </Checkbox>
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);

interface RadioSelectProps extends CommonProps {
  options: { label: string; value: string | number; isRequired?: boolean }[];
  isRequired?: boolean;
}

export const RadioSelect: React.FC<RadioSelectProps> = ({
  name,
  label,
  isRequired = false,
  helperText,
  options,
}) => (
  <div className="form-field border p-3 space-y-2">
    {label && (
      <label htmlFor={name} className="form-label">
        {label}
        {/* {helperText && (
          <Tooltip title={helperText}>
            <InfoCircleOutlined className="ml-1 text-gray-500" />
          </Tooltip>
        )} */}
        {isRequired && <span className="text-red-600"> *</span>}
      </label>
    )}
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <div className="flex flex-col space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                  className="form-radio"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {meta.touched && meta.error && (
            <div className="error-message text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  </div>
);
