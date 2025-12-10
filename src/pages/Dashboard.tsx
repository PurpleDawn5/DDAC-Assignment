import React, { useEffect, useState } from 'react';
import { Row, Col, Carousel, Card, List, Avatar, Button, Badge } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  IdcardOutlined, 
  ClockCircleOutlined,
  CalendarOutlined,
  UserAddOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from './PropertiesData'; 
import './Dashboard.css'; 

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  // --- DATA MOCKING ---
  const featuredProperties = MOCK_PROPERTIES.slice(0, 4);
  
  // Mock Viewings Data (In reality, this comes from your Viewings API)
  const upcomingViewings = [
    { id: 1, prop: 'Dvilla Residences', client: 'John Buyer', time: '10:00 AM', date: 'Today', status: 'confirmed' },
    { id: 2, prop: 'Tungis Luxury', client: 'Alice Investor', time: '02:30 PM', date: 'Tomorrow', status: 'pending' },
  ];

  // Mock Request Data (Matches your PartnerAPI structure)
  const partnerRequests = [
    { id: '101', name: 'Mike Ross', license: 'REA-55555', avatar: 'M' },
    { id: '102', name: 'Rachel Zane', license: 'REA-12121', avatar: 'R' },
  ];

  // --- STATS CONFIGURATION ---
  const stats = [
    { 
      title: 'Total Properties', 
      value: MOCK_PROPERTIES.length, 
      tag: '+2 New', 
      icon: <HomeOutlined />, 
      color: '#3b82f6', // Blue
      fill: '70%' 
    },
    { 
      title: 'Total Owners', 
      value: '8', // You would fetch this from OwnerAPI.getAll().length
      tag: 'Active', 
      icon: <IdcardOutlined />, 
      color: '#10b981', // Green
      fill: '60%' 
    },
    { 
      title: 'Network Partners', 
      value: '14', // You would fetch this from PartnerAPI.getMyPartners().length
      tag: '+3 Pending', 
      icon: <TeamOutlined />, 
      color: '#8b5cf6', // Purple
      fill: '85%' 
    },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="honeycomb">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <h3 style={{ marginTop: 24, color: '#0f766e' }}>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Dashboard Overview</h1>
        <span style={{ color: '#888' }}>Welcome back, Agent.</span>
      </div>

      {/* --- 1. KEY METRICS ROW --- */}
      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <div className="dashboard-stat-card">
              <div className="stat-header">
                <div className="icon-wrapper" style={{ backgroundColor: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                   <span className="stat-title">{stat.title}</span>
                </div>
                <span className="stat-percent" style={{ color: stat.color, background: `${stat.color}15` }}>
                  {stat.tag}
                </span>
              </div>
              <span className="stat-value">{stat.value}</span>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: stat.fill, backgroundColor: stat.color }}
                ></div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        
        {/* --- 2. LEFT COL: CAROUSEL & ACTIONS --- */}
        <Col xs={24} lg={16}>
          {/* Feature Carousel */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Featured Properties</h3>
            <div className="carousel-wrapper">
              <Carousel autoplay autoplaySpeed={5000} draggable effect="fade">
                {featuredProperties.map((prop) => (
                  <div key={prop.id}>
                    <div 
                      className="carousel-slide" 
                      style={{ backgroundImage: `url(${prop.imageUrl})` }}
                      onClick={() => navigate(`/properties/${prop.id}`)}
                    >
                      <div className="carousel-overlay">
                        <h3>{prop.title}</h3>
                        <p>${prop.price.toLocaleString()}/mo • {prop.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          {/* New Quick Actions */}
          <h3 style={{ marginBottom: 16 }}>Quick Actions</h3>
          <Row gutter={[16, 16]}>
             <Col xs={24} sm={8}>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  icon={<HomeOutlined />}
                  style={{ height: '50px', fontWeight: 600 }}
                  onClick={() => navigate('/properties')}
                >
                   Add Property
                </Button>
             </Col>
             <Col xs={24} sm={8}>
                <Button 
                  block 
                  size="large" 
                  icon={<IdcardOutlined />}
                  style={{ height: '50px', fontWeight: 600, borderColor: '#10b981', color: '#10b981' }}
                  onClick={() => navigate('/owners')}
                >
                   Register Owner
                </Button>
             </Col>
             <Col xs={24} sm={8}>
                <Button 
                  block 
                  size="large" 
                  icon={<UserAddOutlined />}
                  style={{ height: '50px', fontWeight: 600, borderColor: '#8b5cf6', color: '#8b5cf6' }}
                  onClick={() => navigate('/partners')}
                >
                   Find Partner
                </Button>
             </Col>
          </Row>
        </Col>

        {/* --- 3. RIGHT COL: SCHEDULE & REQUESTS --- */}
        <Col xs={24} lg={8}>
          
          {/* UPCOMING VIEWINGS WIDGET (New) */}
          <Card 
            title={<span><CalendarOutlined /> Upcoming Viewings</span>} 
            bordered={false} 
            style={{ marginBottom: 24, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            extra={<Button type="link" size="small" onClick={() => navigate('/viewings')}>View All</Button>}
          >
            <List
              itemLayout="horizontal"
              dataSource={upcomingViewings}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div style={{ 
                        background: item.status === 'confirmed' ? '#f6ffed' : '#fffbe6', 
                        padding: '8px', 
                        borderRadius: '8px',
                        color: item.status === 'confirmed' ? '#52c41a' : '#faad14'
                      }}>
                        <ClockCircleOutlined style={{ fontSize: '18px' }} />
                      </div>
                    }
                    title={<span style={{ fontWeight: 600 }}>{item.time} - {item.date}</span>}
                    description={
                      <div style={{ fontSize: 12 }}>
                        {item.prop} <br/>
                        <span style={{ color: 'var(--text-secondary)' }}>w/ {item.client}</span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* PARTNER REQUESTS WIDGET */}
          <Card 
            title={<span><TeamOutlined /> Partner Requests</span>}
            bordered={false} 
            style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            extra={<Badge count={partnerRequests.length} style={{ backgroundColor: '#f56a00' }} />}
          >
            <List
              itemLayout="horizontal"
              dataSource={partnerRequests}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{item.avatar}</Avatar>}
                    title={<span style={{ fontWeight: 600 }}>{item.name}</span>}
                    description={
                      <div style={{ fontSize: 12 }}>
                        License: {item.license} <br />
                        <a onClick={() => navigate('/partners')} style={{ color: '#1890ff', cursor: 'pointer' }}>
                          Review Request <RightOutlined style={{ fontSize: 10 }} />
                        </a>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;