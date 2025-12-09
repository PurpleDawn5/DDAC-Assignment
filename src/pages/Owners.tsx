import React, { useState } from "react";
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

interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

interface CreateOwnerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

// DUMMY DATA
const initialOwners: Owner[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    phoneNumber: "012-3456789",
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@yahoo.com",
    phoneNumber: "019-8765432",
    createdAt: "2025-02-15T14:30:00Z",
  },
];

const Owners: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>(initialOwners);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
  const [form] = Form.useForm();

  const handleSave = (values: CreateOwnerFormValues) => {
    if (editingOwner) {
      // CASE 1: EDIT MODE
      setOwners(
        owners.map((owner) =>
          owner.id === editingOwner.id
            ? { ...owner, ...values }
            : owner
        )
      );
      message.success("Owner details updated!");
    } else {
      // CASE 2: ADD MODE
      const newOwner: Owner = {
        id: Math.random().toString(),
        ...values,
        createdAt: new Date().toISOString(),
      };
      setOwners([...owners, newOwner]);
      message.success("New owner registered!");
    }

    setIsModalOpen(false);
    form.resetFields();
    setEditingOwner(null); // Reset mode
  };

  const handleDelete = (id: string) => {
    setOwners(owners.filter((o) => o.id !== id));
    message.success("Owner deleted.");
  };

  const handleEditClick = (record: Owner) => {
    setEditingOwner(record); // Remember who we are editing
    form.setFieldsValue(record); // Pre-fill the form with their data
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingOwner(null); // We are NOT editing anyone
    form.resetFields(); // Clear the form
    setIsModalOpen(true);
  };

  // 3. FILTER LOGIC
  const filteredData = owners.filter((owner) => {
    const term = searchText.toLowerCase();
    const fullName = `${owner.firstName} ${owner.lastName}`.toLowerCase();
    return fullName.includes(term) || owner.email.toLowerCase().includes(term);
  });

  // --- COLUMNS ---
  const columns: ColumnsType<Owner> = [
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
      <Table columns={columns} dataSource={filteredData} rowKey="id" />

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
