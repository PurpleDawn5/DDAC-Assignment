import { Card, Statistic, Row, Col } from 'antd';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Properties" value={12} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Tenants" value={45} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Revenue (Month)" prefix="$" value={12500} precision={2} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;