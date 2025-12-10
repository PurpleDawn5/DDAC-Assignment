import React, { useState , useEffect } from "react";
import { PartnerAPI, type AgentPartnerDto } from '../api/partnerService';
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

const Partners: React.FC = () => {
  // 1. Initialize empty arrays
  const [partners, setPartners] = useState<AgentPartnerDto[]>([]);
  const [requests, setRequests] = useState<AgentPartnerDto[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearchText, setModalSearchText] = useState('');

  const [availableAgents, setAvailableAgents] = useState<AgentPartnerDto[]>([]); 

  // 2. Fetch Data Function
  const fetchData = async () => {
    setLoading(true);
    try {
      const [allRelationships, pending, available] = await Promise.all([
        PartnerAPI.getMyPartners(),
        PartnerAPI.getPendingRequests(),
        PartnerAPI.getAvailableAgents(),
      ]);

      // DEBUG: Look at your console to see what the backend is actually sending
      console.log("My Partners Raw:", allRelationships); 

      setPartners(allRelationships); 

      setRequests(pending);

      const excludedIds = new Set([
        ...allRelationships.map((a) => a.id),
        ...pending.map((a) => a.id),
      ]);

      const cleanAvailable = available.filter((a) => !excludedIds.has(a.id));
      setAvailableAgents(cleanAvailable);

    } catch (error) {
      console.error(error);
      message.error("Failed to load partners.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Load on startup
  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---
  // --- ACCEPT ---
  const handleAccept = async (agent: AgentPartnerDto) => {
    try {
      await PartnerAPI.respondToRequest(agent.id, true);
      message.success(`You are now partners with ${agent.firstName}!`);
      fetchData();
    } catch (error) {
      message.error('Failed to accept request');
    }
  };

  // --- DECLINE ---
  const handleDecline = async (id: string) => {
    try {
      await PartnerAPI.respondToRequest(id, false);
      message.info('Request declined');
      fetchData();
    } catch (error) {
      message.error('Failed to decline');
    }
  };

  // --- REMOVE ---
  const handleRemove = async (id: string) => {
    try {
      await PartnerAPI.removePartner(id);
      message.warning('Partner removed');
      fetchData();
    } catch (error) {
      message.error('Failed to remove partner');
    }
  };

  // --- SEND REQUEST ---
  const handleConnect = async (id: string) => {
    try {
      await PartnerAPI.sendRequest(id);
      message.success("Request sent!");
      setIsModalOpen(false);
      fetchData(); // Refresh immediately
    } catch (error: any) {
      const serverMessage = error.response?.data?.Message || "Could not send request.";
      message.error(serverMessage);
    }
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
    return (
      fullName.includes(value) || 
      agent.licenseNumber?.toLowerCase().includes(value)
    );
  });

  // Columns
  const columns: ColumnsType<AgentPartnerDto> = [
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
          onClick={() => {
     setIsModalOpen(true);
  }}
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
                  onClick={() => handleConnect(item.id)}
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
