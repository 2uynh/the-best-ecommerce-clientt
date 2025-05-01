import React from "react";
import { Form, Input, Button, message } from "antd";
import axiosClient from "../../../config/axios-client";

const CategoryForm = ({ category, onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      if (category) {
        await axiosClient.put(`/categories/${category._id}`, values);
        message.success("Cập nhật thành công");
      } else {
        await axiosClient.post("/categories", values);
        message.success("Thêm mới thành công");
      }
      onSuccess();
    } catch {
      message.error("Thao tác thất bại");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={category || { name: "" }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên danh mục"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea rows={2} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {category ? "Cập nhật" : "Thêm mới"}
      </Button>
    </Form>
  );
};

export default CategoryForm;
