import { useEffect, useState } from "react";
import { Table, Button, Input, Select, Space } from "antd";
import { debounce } from "lodash";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import ProductFormModal from "./ProductFormModal";
import productApi from "../../../services/products";
import categoryApi from "../../../services/categories";
import { formatPriceVND } from "../../../utils/formatPriceVND";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const handler = debounce(() => {
      setSearch(searchInput);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchInput]);

  useEffect(() => {
    fetchData();
  }, [search, selectedCategory, sortOrder]);

  const fetchData = async () => {
    const res = await productApi.getAll({
      search,
      category: selectedCategory,
      sort: sortOrder,
    });
    const resCategories = await categoryApi.getAll();
    setProducts(res.data);
    setCategories(resCategories.data);
  };

  useEffect(() => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      temp = temp.filter((p) => p.category_id === selectedCategory);
    }

    if (sortOrder === "asc") {
      temp = temp.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      temp = temp.sort((a, b) => b.price - a.price);
    }

    setFiltered(temp);
  }, [search, selectedCategory, sortOrder, products]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    await productApi.delete(id);
    fetchData();
  };

  const handleModalOk = async (values) => {
    if (editingProduct) {
      await productApi.update(editingProduct._id, values);
    } else {
      await productApi.create(values);
    }
    setModalVisible(false);
    setEditingProduct(null);
    fetchData();
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => formatPriceVND(value),
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      key: "category_id",
      render: (id) => categories.find((c) => c._id === id)?.name || "---",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "---",
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
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input
          placeholder="Tìm theo tên"
          prefix={<SearchOutlined />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Select
          className="w-48"
          placeholder="Lọc theo danh mục"
          allowClear
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          options={categories.map((c) => ({ label: c.name, value: c._id }))}
        />
        <Select
          className="w-40"
          placeholder="Sắp xếp giá"
          value={sortOrder}
          onChange={(value) => setSortOrder(value)}
          options={[
            { label: "Tăng dần", value: "asc" },
            { label: "Giảm dần", value: "desc" },
          ]}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingProduct(null);
            setModalVisible(true);
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Table dataSource={filtered} columns={columns} rowKey="_id" />

      <ProductFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(null);
        }}
        onOk={handleModalOk}
        initialValues={editingProduct}
      />
    </div>
  );
};

export default ProductList;
