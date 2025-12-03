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
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface AgentPartner {
  key: string;
  name: string;
  agency: string;
  totalListings: number;
  email: string;
  status: "Connected" | "Pending" | "Not Connected";
}

// dummy data
// Existing Partners
const initialPartners: AgentPartner[] = [
  {
    key: "1",
    name: "Sarah Jenkins",
    agency: "Premium Homes",
    totalListings: 12,
    email: "sarah@premium.com",
    status: "Connected",
  },
  {
    key: "3",
    name: "Jessica Pearson",
    agency: "Pearson Specter",
    totalListings: 45,
    email: "jessica@pearson.com",
    status: "Connected",
  },
  {
    key: "4",
    name: "Harvey Specter",
    agency: "Pearson Specter",
    totalListings: 50,
    email: "harvey@pearson.com",
    status: "Connected",
  },
];

// Incoming Requests
const initialRequests: AgentPartner[] = [
  {
    key: "101",
    name: "Mike Ross",
    agency: "Urban Living",
    totalListings: 8,
    email: "mike@urban.com",
    status: "Pending",
  },
  {
    key: "102",
    name: "Louis Litt",
    agency: "Pearson Specter",
    totalListings: 20,
    email: "louis@pearson.com",
    status: "Pending",
  },
];

// Available Agents (Not connected yet)
const availableAgents: AgentPartner[] = [
  {
    key: "201",
    name: "Dana Scott",
    agency: "Pearson Specter",
    totalListings: 15,
    email: "dana@pearson.com",
    status: "Not Connected",
  },
  {
    key: "202",
    name: "Robert Zane",
    agency: "Zane Legal",
    totalListings: 60,
    email: "robert@zane.com",
    status: "Not Connected",
  },
  {
    key: "203",
    name: "Sheila Sazs",
    agency: "Harvard Realty",
    totalListings: 5,
    email: "sheila@harvard.com",
    status: "Not Connected",
  },
];

const Partners: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [partners, setPartners] = useState<AgentPartner[]>(initialPartners);
  const [requests, setRequests] = useState<AgentPartner[]>(initialRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearchText, setModalSearchText] = useState("");

  // TODO: add logic
  const handleRemove = (key: string) => {
    setPartners(partners.filter((p) => p.key !== key));
    message.warning("Partner removed from your network.");
  };

  const handleConnect = (agentName: string) => {
    message.success(`Connection request sent to ${agentName}!`);
    setIsModalOpen(false); // Close the modal
  };

  const handleAccept = (agent: AgentPartner) => {
    setRequests(requests.filter((r) => r.key !== agent.key));
    setPartners([...partners, { ...agent, status: "Connected" }]);
    message.success(`You are now partners with ${agent.name}!`);
  };

  const handleDecline = (key: string) => {
    setRequests(requests.filter((r) => r.key !== key));
    message.info("Request declined");
  };

  const filteredData = partners.filter((agent) => {
    const value = searchText.toLowerCase();
    return (
      agent.name.toLowerCase().includes(value) ||
      agent.agency.toLowerCase().includes(value)
    );
  });

  const columns: ColumnsType<AgentPartner> = [
    {
      title: "Agent",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          {/*placeholder for icon*/}
          <Avatar
            icon={<UserOutlined />}
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${record.key}`}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{text}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Agency",
      dataIndex: "agency",
      key: "agency",
    },
    {
      title: "Inventory Size",
      dataIndex: "totalListings",
      key: "totalListings",
      render: (count) => (
        <Tag icon={<TeamOutlined />} color="blue">
          {count} Properties
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "Connected") color = "success";
        if (status === "Pending") color = "warning";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "Connected" ? (
          <Button size="small" danger onClick={() => handleRemove(record.key)}>
            {" "}
            Remove{" "}
          </Button>
        ) : (
          <Button size="small" disabled>
            Pending
          </Button>
        ),
    },
  ];

  const filteredAvailableAgents = availableAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      agent.agency.toLowerCase().includes(modalSearchText.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
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
          <p style={{ color: "gray", margin: 0 }}>
            Connect with other agents to expand your catalogue.
          </p>
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Find New Agents
        </Button>
        <Modal
          title="Find New Agents"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={700}
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
                    onClick={() => handleConnect(item.name)}
                  >
                    Connect
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.key}`}
                    />
                  }
                  title={item.name}
                  description={
                    <Space>
                      <Tag>{item.agency}</Tag>
                      <span style={{ fontSize: "12px" }}>
                        {item.totalListings} Listings
                      </span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>

      {/* Tabs to switch between "My Partners" and "Requests" */}
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: `My Partners (${partners.length})`,
            children: (
              <>
                <Input
                  placeholder="Search by name or agency"
                  prefix={<SearchOutlined />}
                  style={{ marginBottom: 16, maxWidth: 300 }}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
                <Table columns={columns} dataSource={filteredData} />
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
                        onClick={() => handleDecline(item.key)}
                      >
                        Decline
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.key}`}
                        />
                      }
                      title={<strong>{item.name}</strong>}
                      description={`${item.agency} • ${item.totalListings} Listings available`}
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
