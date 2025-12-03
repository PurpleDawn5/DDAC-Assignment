import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { 
  PieChartOutlined, 
  HomeOutlined, 
  UsergroupAddOutlined,
  CalendarOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

const items = [
  { key: '/', icon: <PieChartOutlined />, label: 'Dashboard' },
  { key: '/properties', icon: <HomeOutlined />, label: 'Properties' },
  { key: '/viewings', icon: <CalendarOutlined />, label: 'Viewings' },
  { key: '/clients', icon: <UsergroupAddOutlined />, label: 'Clients' }, 
  { key: '/partners', icon: <TeamOutlined />, label: 'Partners' },
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="light" 
        style={{ borderRight: '1px solid #f0f0f0' }}
      >
        {/* Logo Area */}
        <div style={{ 
            height: 64, 
            margin: 16, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: collapsed ? '10px' : '16px',
            color: '#0f766e'
        }}>
            {collapsed ? 'PMS' : 'PROP MANAGER'}
        </div>

        <Menu 
            theme="light" 
            selectedKeys={[location.pathname]}
            mode="inline" 
            items={items} 
            onClick={({ key }) => navigate(key)} 
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, borderBottom: '1px solid #f0f0f0' }} />
        <Content style={{ margin: '24px 16px' }}>
          {/* We removed the white box wrapper here so the page background shows through */}
          <div style={{ minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#888' }}>
          Property Manager System ©2025
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;