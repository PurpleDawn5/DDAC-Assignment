import React, { useState } from 'react';
import { Table, Tag, Button, Avatar, Tabs, Input, Space } from 'antd';
import { UserAddOutlined, SearchOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface AgentPartner {
  key: string;
  name: string;
  agency: string;
  totalListings: number;
  email: string;
  status: 'Connected' | 'Pending' | 'Not Connected';
}

// dummy data
const allAgents: AgentPartner[] = [
  {
    key: '1',
    name: 'Sarah Jenkins',
    agency: 'Premium Homes Reality',
    totalListings: 12,
    email: 'sarah.j@premiumhomes.com',
    status: 'Connected',
  },
  {
    key: '2',
    name: 'Mike Ross',
    agency: 'Urban Living',
    totalListings: 8,
    email: 'mike@urbanliving.com',
    status: 'Pending',
  },
  {
    key: '3',
    name: 'Jessica Pearson',
    agency: 'Pearson Specter',
    totalListings: 45,
    email: 'jessica@pearson.com',
    status: 'Connected',
  },
  {
    key: '4',
    name: 'Harvey Specter',
    agency: 'Pearson Specter',
    totalListings: 50,
    email: 'harvey@pearson.com',
    status: 'Connected',
  },
  {
    key: '5',
    name: 'Louis Litt',
    agency: 'Pearson Specter',
    totalListings: 20,
    email: 'louis@pearson.com',
    status: 'Not Connected',
  },
];

const Partners: React.FC = () => {
  const [searchText, setSearchText] = useState('');

    const filteredData = allAgents.filter((agent) => {
    const value = searchText.toLowerCase();
    return (
      agent.name.toLowerCase().includes(value) ||
      agent.agency.toLowerCase().includes(value)
    );
  });

  const columns: ColumnsType<AgentPartner> = [
    {
      title: 'Agent',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
            {/*placeholder for icon*/}
          <Avatar icon={<UserOutlined />} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${record.key}`} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Agency',
      dataIndex: 'agency',
      key: 'agency',
    },
    {
      title: 'Inventory Size',
      dataIndex: 'totalListings',
      key: 'totalListings',
      render: (count) => (
        <Tag icon={<TeamOutlined />} color="blue">
          {count} Properties
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'Connected') color = 'success';
        if (status === 'Pending') color = 'warning';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status === 'Connected' 
          ? <Button size="small" danger>Remove</Button> 
          : <Button size="small" disabled>Pending</Button>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Partner Network</h1>
          <p style={{ color: 'gray', margin: 0 }}>
            Connect with other agents to expand your catalogue.
          </p>
        </div>
        <Button type="primary" icon={<UserAddOutlined />}>
          Find New Agents
        </Button>
      </div>

      {/* Tabs to switch between "My Partners" and "Requests" */}
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'My Partners',
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
            key: '2',
            label: 'Incoming Requests (2)', // Example of pending invites
            children: <div>You have 2 agents wanting to partner with you.</div>,
          },
        ]}
      />
    </div>
  );
};

export default Partners;