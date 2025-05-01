import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CategoryForm from './CategoryForm';
import axiosClient from '../../../config/axios-client';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/categories');
      setCategories(res.data);
    } catch (err) {
      message.error('Lỗi khi tải danh mục');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/categories/${id}`);
      message.success('Xoá thành công');
      fetchCategories();
    } catch {
      message.error('Xoá thất bại');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý danh mục</h2>
        <Button icon={<PlusOutlined />} type="primary" onClick={handleCreate}>
          Thêm danh mục
        </Button>
      </div>
      <Table
        loading={loading}
        rowKey="_id"
        columns={[
          { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
          {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text) => text || "---",
          },
          {
            title: 'Hành động',
            render: (text, record) => (
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(record)}>Sửa</Button>
                <Popconfirm title="Bạn chắc chắn xoá?" onConfirm={() => handleDelete(record._id)}>
                  <Button danger>Xoá</Button>
                </Popconfirm>
              </div>
            ),
          },
        ]}
        dataSource={categories}
      />

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
      >
        <CategoryForm
          category={editingCategory}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchCategories();
          }}
        />
      </Modal>
    </div>
  );
};

export default CategoryList;
