import React, { useState } from 'react';
import { Layout, Menu, App } from 'antd';
import type { MenuProps } from 'antd';
import { 
  PieChartOutlined, 
  HomeOutlined, 
  CalendarOutlined,
  TeamOutlined,
  IdcardOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// Helper type for Menu Items
type MenuItem = Required<MenuProps>['items'][number];

// 1. Main Navigation
const mainItems: MenuItem[] = [
  { key: '/', icon: <PieChartOutlined />, label: 'Dashboard' },
  { key: '/properties', icon: <HomeOutlined />, label: 'Properties' },
  { key: '/viewings', icon: <CalendarOutlined />, label: 'Viewings' },
  { key: '/owners', icon: <IdcardOutlined />, label: 'Owners' }, 
  { key: '/partners', icon: <TeamOutlined />, label: 'Partners' },
];

// 2. Bottom Actions
const bottomItems: MenuItem[] = [
  { type: 'divider' }, 
  { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
  { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true }, 
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Access the context-aware modal
  const { modal } = App.useApp(); 

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
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
          borderRight: '1px solid var(--border-color)', // Uses global theme var
          display: 'flex',
          flexDirection: 'column', 
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 100
        }}
      >
        {/* Sidebar Content Container */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Top Section */}
          <div style={{ flex: 1 }}>
            <div style={{ 
                height: 64, 
                margin: 16, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: collapsed ? '12px' : '16px',
                color: '#0f766e',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                {collapsed ? 'FRE' : 'FRONTERA'}
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

          {/* Bottom Section */}
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
        {
          
        }
        <Header 
          style={{ 
            padding: 0, 
            background: 'transparent', 
            height: 0, 
            border: 'none',
            lineHeight: 0 
          }} 
        />
        
        {/* Content Area */}
        <Content style={{ margin: '30px 24px 0 24px' }}>
          <div style={{ minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        
        <Footer style={{ textAlign: 'center', color: '#888', background: 'transparent' }}>
          Frontera Real Estate ©2025
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;