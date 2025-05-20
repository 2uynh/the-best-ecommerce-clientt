import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

const CustomerFormModal = ({ visible, onCancel, onOk, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues || {});
    }
  }, [visible, initialValues]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onOk(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={initialValues ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên khách hàng"
          rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Tên tài khoản"
          rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerFormModal;
