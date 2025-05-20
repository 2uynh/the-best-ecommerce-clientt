import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  message,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import categoryApi from "../../../services/categories";
import productApi from "../../../services/products";

const ProductFormModal = ({ visible, onCancel, onOk, initialValues }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image || "");

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
      setImageUrl(initialValues?.image || "");
    }
  }, [visible, initialValues]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getAll();
        setCategories(res.data);
      } catch {
        message.error("Không thể tải danh sách danh mục");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onOk({
        ...values,
        image: imageUrl,
        price_sale: values.price_sale || null, 
      });
      form.resetFields();
      setImageUrl("");
    });
  };
  

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const res = await productApi.uploadImage(formData);
      setImageUrl(res.url);
      message.success("Tải ảnh thành công");
    } catch {
      message.error("Tải ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      title={initialValues ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
        setImageUrl("");
      }}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item name="type" label="Loại">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="category_id"
          label="Danh mục"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={categories.map((c) => ({ label: c.name, value: c._id }))}
          />
        </Form.Item>
        <Form.Item label="Ảnh sản phẩm">
          <Upload
            customRequest={({ file }) => handleUpload(file)}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Upload
            </Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </Form.Item>
        <Form.Item name="is_featured" label="Nổi bật" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="featured_type" label="Loại nổi bật">
          <Select
            options={[
              { label: "Khuyến mãi", value: "sale" },
              { label: "Mới", value: "new" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
