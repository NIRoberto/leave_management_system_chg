import { Form, Input, Select, DatePicker } from "antd";
import { Field } from "formik";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

type OptionType = {
  label: string;
  value: string | number;
};

interface CommonProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

// ✅ Text Input
export const TextInput = ({
  name,
  label,
  placeholder,
  disabled,
}: CommonProps) => (
  <Form.Item label={label} name={name}>
    <Field name={name}>
      {({ field, form }: any) => (
        <>
          <Input {...field} placeholder={placeholder} disabled={disabled} />
          {form.touched[name] && form.errors[name] && (
            <div className="text-red-500 text-sm">{form.errors[name]}</div>
          )}
        </>
      )}
    </Field>
  </Form.Item>
);

// ✅ TextArea Input
export const TextAreaInput = ({
  name,
  label,
  placeholder,
  disabled,
}: CommonProps) => (
  <Form.Item label={label} name={name}>
    <Field name={name}>
      {({ field, form }: any) => (
        <>
          <TextArea
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
          />
          {form.touched[name] && form.errors[name] && (
            <div className="text-red-500 text-sm">{form.errors[name]}</div>
          )}
        </>
      )}
    </Field>
  </Form.Item>
);

// ✅ Password Input
export const PasswordInput = ({
  name,
  label,
  placeholder,
  disabled,
}: CommonProps) => (
  <Form.Item label={label} name={name}>
    <Field name={name}>
      {({ field, form }: any) => (
        <>
          <Input.Password
            {...field}
            placeholder={placeholder}
            disabled={disabled}
          />
          {form.touched[name] && form.errors[name] && (
            <div className="text-red-500 text-sm">{form.errors[name]}</div>
          )}
        </>
      )}
    </Field>
  </Form.Item>
);

// ✅ Select Input
interface SelectInputProps extends CommonProps {
  options: OptionType[];
}

export const SelectInput = ({
  name,
  label,
  options,
  placeholder,
  disabled,
}: SelectInputProps) => (
  <Form.Item label={label} name={name}>
    <Field name={name}>
      {({ field, form }: any) => (
        <>
          <Select
            value={field.value}
            onChange={(value) => form.setFieldValue(name, value)}
            onBlur={() => form.setFieldTouched(name, true)}
            placeholder={placeholder}
            disabled={disabled}
          >
            {options.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
          {form.touched[name] && form.errors[name] && (
            <div className="text-red-500 text-sm">{form.errors[name]}</div>
          )}
        </>
      )}
    </Field>
  </Form.Item>
);

// ✅ DatePicker Input
export const DatePickerInput = ({
  name,
  label,
  placeholder,
  disabled,
}: CommonProps) => (
  <Form.Item label={label} name={name}>
    <Field name={name}>
      {({ field, form }: any) => (
        <>
          <DatePicker
            value={field.value ? moment(field.value) : null}
            onChange={(date, dateString) =>
              form.setFieldValue(name, dateString)
            }
            onBlur={() => form.setFieldTouched(name, true)}
            placeholder={placeholder}
            disabled={disabled}
            style={{ width: "100%" }}
          />
          {form.touched[name] && form.errors[name] && (
            <div className="text-red-500 text-sm">{form.errors[name]}</div>
          )}
        </>
      )}
    </Field>
  </Form.Item>
);
