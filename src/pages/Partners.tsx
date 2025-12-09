import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Avatar,
  Tabs,
  Input,
  Space,
  List,
  message,
  Modal,
} from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface AgentPartner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  status: "Connected" | "Pending" | "Not Connected";
}

// DUMMY DATA\
const initialPartners: AgentPartner[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Jenkins",
    licenseNumber: "REA-12345",
    email: "sarah@example.com",
    phoneNumber: "012-3456789",
    status: "Connected",
  },
  {
    id: "2",
    firstName: "Jessica",
    lastName: "Pearson",
    licenseNumber: "REA-98765",
    email: "jessica@example.com",
    phoneNumber: "012-9876543",
    status: "Connected",
  },
];

const initialRequests: AgentPartner[] = [
  {
    id: "101",
    firstName: "Mike",
    lastName: "Ross",
    licenseNumber: "REA-55555",
    email: "mike@example.com",
    phoneNumber: "011-1111111",
    status: "Pending",
  },
];

const availableAgents: AgentPartner[] = [
  {
    id: "201",
    firstName: "Dana",
    lastName: "Scott",
    licenseNumber: "REA-77777",
    email: "dana@example.com",
    phoneNumber: "013-3333333",
    status: "Not Connected",
  },
  {
    id: "202",
    firstName: "Robert",
    lastName: "Zane",
    licenseNumber: "REA-88888",
    email: "robert@example.com",
    phoneNumber: "014-4444444",
    status: "Not Connected",
  },
];

const Partners: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [modalSearchText, setModalSearchText] = useState("");
  const [partners, setPartners] = useState<AgentPartner[]>(initialPartners);
  const [requests, setRequests] = useState<AgentPartner[]>(initialRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- HANDLERS ---
  const handleAccept = (agent: AgentPartner) => {
    setRequests(requests.filter((r) => r.id !== agent.id));
    setPartners([...partners, { ...agent, status: "Connected" }]);
    message.success(`You are now partners with ${agent.firstName}!`);
  };

  const handleDecline = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
    message.info("Request declined");
  };

  const handleRemove = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
    message.warning("Partner removed from your network.");
  };

  const handleConnect = (name: string) => {
    message.success(`Connection request sent to ${name}!`);
    setIsModalOpen(false);
  };

  // --- FILTERS ---
  const filteredData = partners.filter((agent) => {
    const value = searchText.toLowerCase();
    const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
    return (
      fullName.includes(value) ||
      agent.email.toLowerCase().includes(value) ||
      agent.licenseNumber.toLowerCase().includes(value)
    );
  });

  const filteredAvailableAgents = availableAgents.filter((agent) => {
    const value = modalSearchText.toLowerCase();
    const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
    return fullName.includes(value);
  });

  // Columns
  const columns: ColumnsType<AgentPartner> = [
    {
      title: "Agent",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            size="large"
          >
            {record.firstName[0]}
            {record.lastName[0]}
          </Avatar>
          <div>
            <div style={{ fontWeight: "bold" }}>
              {record.firstName} {record.lastName}
            </div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "License #",
      dataIndex: "licenseNumber",
      key: "licenseNumber",
      render: (text) => <Tag icon={<IdcardOutlined />}>{text}</Tag>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => <Tag color="success">CONNECTED</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button size="small" danger onClick={() => handleRemove(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Partner Network</h1>
          <p style={{ color: "gray", margin: 0 }}>Connect with other agents.</p>
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Find New Agents
        </Button>
      </div>

      {/* --- MODAL --- */}
      <Modal
        title="Find New Agents"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Input
          placeholder="Search for agents..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: 20 }}
          onChange={(e) => setModalSearchText(e.target.value)}
          allowClear
        />

        <List
          itemLayout="horizontal"
          pagination={{ pageSize: 4 }}
          dataSource={filteredAvailableAgents}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleConnect(item.firstName)}
                >
                  Connect
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: "#1890ff" }}>
                    {item.firstName[0]}
                    {item.lastName[0]}
                  </Avatar>
                }
                title={`${item.firstName} ${item.lastName}`}
                description={`License: ${item.licenseNumber}`}
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* --- TABS --- */}
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: `My Partners (${partners.length})`,
            children: (
              <>
                <Input
                  placeholder="Search by name, email or license..."
                  prefix={<SearchOutlined />}
                  style={{ marginBottom: 16, maxWidth: 300 }}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  rowKey="id"
                />
              </>
            ),
          },
          {
            key: "2",
            label: `Incoming Requests (${requests.length})`,
            children: (
              <List
                itemLayout="horizontal"
                dataSource={requests}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<CheckCircleOutlined />}
                        style={{ color: "green" }}
                        onClick={() => handleAccept(item)}
                      >
                        Accept
                      </Button>,
                      <Button
                        type="text"
                        icon={<CloseCircleOutlined />}
                        style={{ color: "red" }}
                        onClick={() => handleDecline(item.id)}
                      >
                        Decline
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: "#87d068" }}>
                          {item.firstName[0]}
                          {item.lastName[0]}
                        </Avatar>
                      }
                      title={
                        <strong>
                          {item.firstName} {item.lastName}
                        </strong>
                      }
                      description={`License: ${item.licenseNumber} • ${item.email}`}
                    />
                  </List.Item>
                )}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Partners;
