import React, { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import orderApi from "../../../services/order";  
import OrderFormModal from "./OrderForm"; 
import { formatPriceVND } from "../../../utils/formatPriceVND";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await orderApi.getAll();
      setOrders(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error.response?.data?.message || error.message);
      alert("Lỗi tải đơn hàng: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (order) => {console.log(order)
    setEditingOrder(order);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    await orderApi.delete(id);
    fetchData();
  };

  const handleModalOk = async (values) => {
    if (editingOrder) {
      await orderApi.update(editingOrder._id, values);
    } else {
      await orderApi.create(values);
    }
    setModalVisible(false);
    setEditingOrder(null);
    fetchData();
  };

  const columns = [
    {
      title: "Khách hàng",
      key: "customer",
      render: (record) => record.customer?.name || "Không có"
    },
    {
      title: "Sản phẩm và Số lượng",
      key: "products",
      render: (record) => record.products.map(p => 
        `${p?.name} (x${p.quantity})`).join(', ')
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "total_amount",
      render: (value) => formatPriceVND(`${value}`)
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingOrder(null);
          setModalVisible(true);
        }}
      >
        Thêm đơn hàng
      </Button>

      <Table dataSource={orders} columns={columns} rowKey="_id" />

      <OrderFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingOrder(null);
        }}
        onOk={handleModalOk}
        initialValues={editingOrder}
      />
    </div>
  );
};


export default OrderList;
