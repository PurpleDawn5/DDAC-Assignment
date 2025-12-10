import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  message,
  Popconfirm,
} from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { OwnerAPI, type OwnerDto, type CreateOwnerDto } from "../api/ownerService";

const Owners: React.FC = () => {
  const [owners, setOwners] = useState<OwnerDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<OwnerDto | null>(null);
  const [form] = Form.useForm();

  const fetchOwners = async () => {
    setLoading(true);
    try {
      const data = await OwnerAPI.getAll();
      setOwners(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load owners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleSave = async (values: CreateOwnerDto) => {
    try {
      if (editingOwner) {
        // Update API Call
        await OwnerAPI.update(editingOwner.id, values);
        message.success("Owner updated!");
      } else {
        // Create API Call
        await OwnerAPI.create(values);
        message.success("Owner created!");
      }

      // Cleanup
      setIsModalOpen(false);
      form.resetFields();
      setEditingOwner(null);

      // REFRESH the table to show real data from DB
      fetchOwners();
    } catch (error) {
      console.error(error);
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await OwnerAPI.delete(id);
      message.success("Owner deleted");
      fetchOwners(); // Refresh list
    } catch (error) {
      console.error(error);
      message.error("Failed to delete owner");
    }
  };

  const handleEditClick = (record: OwnerDto) => {
    setEditingOwner(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingOwner(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // 3. FILTER LOGIC
  const filteredData = owners.filter((owner) => {
    const term = searchText.toLowerCase();
    const fullName = `${owner.firstName} ${owner.lastName}`.toLowerCase();
    return fullName.includes(term) || owner.email.toLowerCase().includes(term);
  });

  // --- COLUMNS ---
  const columns: ColumnsType<OwnerDto> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <Space>
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#f56a00",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {record.firstName[0]}
            {record.lastName[0]}
          </div>
          <span style={{ fontWeight: 500 }}>
            {record.firstName} {record.lastName}
          </span>
        </Space>
      ),
    },
    {
      title: "Contact Info",
      key: "contact",
      render: (_, record) => (
        <div style={{ fontSize: "13px" }}>
          <div>
            <MailOutlined style={{ color: "#888", marginRight: 5 }} />{" "}
            {record.email}
          </div>
          <div>
            <PhoneOutlined style={{ color: "#888", marginRight: 5 }} />{" "}
            {record.phoneNumber}
          </div>
        </div>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditClick(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Owner"
            description="Are you sure? This will remove their properties too."
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* --- HEADER --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Property Owners</h1>
          <p style={{ color: "gray", margin: 0 }}>
            Manage the landlords for your listings.
          </p>
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={handleAddClick}
        >
          Add Owner
        </Button>
      </div>

      {/* --- SEARCH --- */}
      <Input
        placeholder="Search by name or email..."
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, maxWidth: 300 }}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
      />

      {/* --- TABLE --- */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading} // <--- Added this
      />

      {/* --- ADD/EDIT OWNER MODAL --- */}
      <Modal
        title={editingOwner ? "Edit Owner Details" : "Register New Owner"} // <--- Dynamic Title
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingOwner ? "Save Changes" : "Register"} // <--- Dynamic Button Text
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <div style={{ display: "flex", gap: 16 }}>
            <Form.Item
              name="firstName"
              label="First Name"
              style={{ flex: 1 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="e.g. John" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              style={{ flex: 1 }}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="e.g. Doe" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                type: "email",
                message: "Valid email required",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="012-3456789" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Owners;
