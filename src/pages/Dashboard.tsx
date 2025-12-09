import {
  DollarOutlined,
  HomeOutlined,
  RightOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Card, Carousel, Col, List, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: 'Properties', value: '12', icon: <HomeOutlined />, percent: '+20%', fill: '76%' },
    { title: 'Tenants', value: '45', icon: <UserOutlined />, percent: '+5%', fill: '60%' },
    { title: 'Revenue', value: '$12.5k', icon: <DollarOutlined />, percent: '+12%', fill: '90%' },
  ];

  const featuredProperties = [
    { 
      id: 1, 
      title: 'Modern Apartment - City Center', 
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
      price: '$2,500/mo' 
    },
    { 
      id: 2, 
      title: 'Luxury Villa - Beverly Hills', 
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
      price: '$8,200/mo'
    },
    { 
      id: 3, 
      title: 'Cozy Cottage - Riverside', 
      img: 'https://images.unsplash.com/photo-1600596542815-2a434f6755b9?auto=format&fit=crop&q=80',
      price: '$1,800/mo'
    },
  ];

  const partnerRequests = [
    { id: '101', name: 'Mike Ross', license: 'REA-55555', avatar: 'M' },
    { id: '102', name: 'Rachel Zane', license: 'REA-12121', avatar: 'R' },
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
      <h1 style={{ marginBottom: 24 }}>Dashboard</h1>

      {/* --- STATS CARDS --- */}
      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <div className="dashboard-stat-card">
              
              {/* Header: Icon, Title, Percent */}
              <div className="stat-header">
                <div className="icon-circle">
                  {stat.icon}
                </div>
                <span className="stat-title">{stat.title}</span>
                <span className="stat-percent">{stat.percent}</span>
              </div>

              {/* Data: Value, Bar */}
              <div className="stat-data">
                <span className="stat-value">{stat.value}</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: stat.fill }}></div>
                </div>
              </div>

            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        
        {/* --- CAROUSEL SLIDESHOW --- */}
        <Col xs={24} lg={16}>
          <h3 style={{ marginBottom: 16 }}>Featured Properties</h3>
          <div className="property-carousel">
            <Carousel autoplay autoplaySpeed={3000} draggable>
              {featuredProperties.map((prop) => (
                <div key={prop.id}>
                  <div 
                    className="carousel-content" 
                    onClick={() => navigate('/properties')}
                  >
                    <img src={prop.img} alt={prop.title} />
                    <div className="carousel-caption">
                      <h3>{prop.title}</h3>
                      <p>{prop.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <Card title="Quick Actions" bordered={false} style={{ marginTop: 24, borderRadius: 16 }}>
             <Row gutter={16}>
                <Col span={12}>
                   <Button type="primary" block size="large" onClick={() => navigate('/properties')}>
                      Add Property
                   </Button>
                </Col>
                <Col span={12}>
                   <Button block size="large" onClick={() => navigate('/owners')}>
                      Register Owner
                   </Button>
                </Col>
             </Row>
          </Card>
        </Col>

        {/* --- SIDEBAR WIDGETS --- */}
        <Col xs={24} lg={8}>
          
          <Card 
            title="Pending Requests" 
            bordered={false} 
            style={{ marginBottom: 24, borderRadius: 16 }}
            extra={<Tag color="red">{partnerRequests.length}</Tag>}
          >
            <List
              itemLayout="horizontal"
              dataSource={partnerRequests}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{item.avatar}</Avatar>}
                    title={<span style={{ fontWeight: 600 }}>{item.name}</span>}
                    description={
                      <div style={{ fontSize: 12 }}>
                        License: {item.license} <br />
                        <Link to="/partners" style={{ color: '#1890ff', fontSize: 12 }}>
                          Review Request <RightOutlined style={{ fontSize: 10 }} />
                        </Link>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card title="System Updates" bordered={false} style={{ borderRadius: 16 }}>
             <List size="small">
                <List.Item>
                   <List.Item.Meta 
                      title="Maintenance Scheduled"
                      description="Server maintenance on Sunday 2:00 AM."
                   />
                </List.Item>
                <List.Item>
                   <List.Item.Meta 
                      title="New Feature"
                      description="Dark mode is live!"
                   />
                </List.Item>
             </List>
          </Card>

        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;