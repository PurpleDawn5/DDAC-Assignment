import {
  CalendarOutlined,
  HomeOutlined,
  IdcardOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { App, Layout, Menu, theme } from 'antd'; // 1. Import 'App'
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const mainItems: MenuItem[] = [
  { key: '/', icon: <PieChartOutlined />, label: 'Dashboard' },
  { key: '/properties', icon: <HomeOutlined />, label: 'Properties' },
  { key: '/viewings', icon: <CalendarOutlined />, label: 'Viewings' },
  { key: '/owners', icon: <IdcardOutlined />, label: 'Owners' }, 
  { key: '/partners', icon: <TeamOutlined />, label: 'Partners' },
];

const bottomItems: MenuItem[] = [
  { type: 'divider' }, 
  { key: '/profile', icon: <UserOutlined />, label: 'Profile' },
  { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
  { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true }, 
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Use the 'useApp' hook to get the context-aware modal
  const { modal } = App.useApp(); 

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      // 3. Use 'modal.confirm' instead of 'Modal.confirm'
      modal.confirm({
        title: 'Confirm Logout',
        content: 'Are you sure you want to log out?',
        okText: 'Yes, Log out',
        cancelText: 'Cancel',
        onOk: () => {
          localStorage.removeItem('isAuthenticated'); 
          navigate('/login'); 
        }
      });
    } else {
      navigate(key);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="light" 
        style={{ 
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column', 
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div style={{ flex: 1 }}>
            <div style={{ 
                height: 64, 
                margin: 16, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: collapsed ? '10px' : '16px',
                color: '#0f766e',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }}>
                {collapsed ? 'PMS' : 'PROP MANAGER'}
            </div>

            <Menu 
                theme="light" 
                selectedKeys={[location.pathname]} 
                mode="inline" 
                items={mainItems} 
                onClick={handleMenuClick} 
                style={{ borderRight: 0 }}
            />
          </div>

          <div>
            <Menu 
                theme="light" 
                mode="inline" 
                selectable={false} 
                items={bottomItems} 
                onClick={handleMenuClick}
                style={{ borderRight: 0, marginBottom: 48 }} 
            />
          </div>

        </div>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, borderBottom: '1px solid #f0f0f0' }} />
        <Content style={{ margin: '24px 16px' }}>
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