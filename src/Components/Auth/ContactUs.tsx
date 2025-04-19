import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ContactUs = () => {
  // Form submission handler
  const handleSubmit = (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    // Simulating form submission
    message.success("Your message has been sent successfully!");
    console.log("Form values:", values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <Title level={2} className="text-center text-gray-800 mb-6">
          Contact Us
        </Title>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ name: "", email: "", message: "" }}
        >
          {/* Name Field */}
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your name"
              size="large"
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Your Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          {/* Message Field */}
          <Form.Item
            label="Your Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <Input.TextArea
              placeholder="Enter your message"
              size="large"
              rows={4}
            />
          </Form.Item>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Send Message
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
