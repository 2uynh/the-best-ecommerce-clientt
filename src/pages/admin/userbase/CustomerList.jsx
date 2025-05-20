import { useEffect, useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { debounce } from "lodash";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CustomerFormModal from "./CustomerFormModal";
import customerApi from "../../../services/customers";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const handler = debounce(() => {
      setSearch(searchInput);
    }, 500);

    handler();

    return () => handler.cancel();
  }, [searchInput]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let temp = [...customers];
    if (search) {
      temp = temp.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(temp);
  }, [search, customers]);

  const fetchData = async () => {
    const res = await customerApi.getAll();
    setCustomers(res.data);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    await customerApi.delete(id);
    fetchData();
  };

  const handleModalOk = async (values) => {
    if (editingCustomer) {
      await customerApi.update(editingCustomer._id, values);
    } else {
      await customerApi.create(values);
    }
    setModalVisible(false);
    setEditingCustomer(null);
    fetchData();
  };

  const columns = [
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
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
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input
          placeholder="Tìm theo tên"
          prefix={<SearchOutlined />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingCustomer(null);
            setModalVisible(true);
          }}
        >
          Thêm khách hàng
        </Button>
      </div>

      <Table dataSource={filtered} columns={columns} rowKey="_id" />

      <CustomerFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingCustomer(null);
        }}
        onOk={handleModalOk}
        initialValues={editingCustomer}
      />
    </div>
  );
};

export default CustomerList;
