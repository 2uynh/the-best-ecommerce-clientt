import { Modal, Form, Input, Select, InputNumber } from "antd";
import { useState , useEffect } from "react";
import productApi from "../../../services/products"; 
import customerApi from "../../../services/customers";  

const OrderFormModal = ({ visible, onCancel, onOk, initialValues }) => {
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues || {}); 
      customerApi.getAll().then((res) => setCustomers(res.data));
      productApi.getAll().then((res) => setProducts(res.data));
    }
  }, [visible, initialValues]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
  
      const selectedProducts = values.products.map((productId, index) => {
        const product = products?.filter(fP => fP._id).find(p => p._id === productId);
        const quantity = values.quantities || 1;  

        return {
          productId,
          quantity: quantity,
          price_at_order_time: product?.price || 0
        };
      }).filter(fP => fP.productId);

      const totalAmount = selectedProducts.reduce((sum, item) => sum + item.quantity * item.price_at_order_time, 0);

      onOk({
        customer: values.customer,
        products: selectedProducts,
        totalAmount,
      });

      form.resetFields();
    } catch (error) {
      console.error("Lỗi submit đơn hàng:", error.message);
    }
  };

  return (
    <Modal
      title={initialValues ? "Chỉnh sửa đơn hàng" : "Thêm đơn hàng"}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="customer"
          label="Khách hàng"
          rules={[{ required: true, message: "Vui lòng chọn khách hàng" }]}>
          <Select>
            {customers.map((customer) => (
              <Select.Option key={customer._id} value={customer._id}>
                {customer.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="products"
          label="Sản phẩm"
          rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}>
          <Select mode="multiple" allowClear>
            {products.map((product) => (
              <Select.Option key={product._id} value={product._id}>
                {product.name} - {product.price.toLocaleString()} đ
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="quantities"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}>
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>

        <Form.Item
          name="totalAmount"
          label="Tổng tiền">
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};


export default OrderFormModal;
