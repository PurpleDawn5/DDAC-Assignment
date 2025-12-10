import React, { useState } from 'react';
import { Calendar, Badge, Card, Button, Modal, Form, Select, DatePicker, TimePicker, List, Tag, message, Avatar
} from 'antd';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { MOCK_PROPERTIES } from './PropertiesData';
import './Properties.css'; // Re-use your existing CSS variables

// --- Interfaces ---
interface Viewing {
  id: string;
  propertyId: string;
  propertyTitle: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
  clientName: string;
}

// --- Mock Data ---
const INITIAL_VIEWINGS: Viewing[] = [
  {
    id: 'v1',
    propertyId: 'p1',
    propertyTitle: 'Dvilla Residences Batu',
    date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    time: '10:00 AM',
    status: 'confirmed',
    clientName: 'John Buyer'
  },
  {
    id: 'v2',
    propertyId: 'p3',
    propertyTitle: 'Tungis Luxury',
    date: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    time: '02:30 PM',
    status: 'pending',
    clientName: 'Alice Investor'
  }
];

const Viewings: React.FC = () => {
  const [viewings, setViewings] = useState<Viewing[]>(INITIAL_VIEWINGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // --- Helpers ---
  
  const getListData = (value: Dayjs) => {
    const dateString = value.format('YYYY-MM-DD');
    return viewings.filter(v => v.date === dateString);
  };

  // Calendar Cell Render (Shows dots on dates with events)
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge 
              status={item.status === 'confirmed' ? 'success' : 'warning'} 
              text={<span style={{fontSize: '10px'}}>{item.time}</span>} 
            />
          </li>
        ))}
      </ul>
    );
  };

  // Handle Form Submit
  const handleOk = () => {
    form.validateFields().then((values) => {
      // Find property title based on ID
      const selectedProp = MOCK_PROPERTIES.find(p => p.id === values.propertyId);
      
      const newViewing: Viewing = {
        id: Math.random().toString(36).substr(2, 9),
        propertyTitle: selectedProp?.title || 'Unknown Property',
        propertyId: values.propertyId,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('h:mm A'),
        status: 'pending', // Default status
        clientName: values.clientName
      };

      setViewings([...viewings, newViewing]);
      setIsModalOpen(false);
      form.resetFields();
      message.success('Appointment Scheduled Successfully!');
    });
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
         <header className="page-header" style={{ marginBottom: 0 }}>
            <h1 className="page-title">Viewings <span className="breadcrumb">/ Schedule</span></h1>
         </header>
         <Button 
            type="primary" 
            size="large"
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: '#0f766e', padding: '0 30px' }}
         >
            + New Appointment
         </Button>
      </div>

      <div className="content-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
        
        {/* Left Col: Calendar */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
           <Calendar dateCellRender={dateCellRender} />
        </div>

        {/* Right Col: Upcoming List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <Card title="Upcoming Appointments" bordered={false} style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '16px' }}>
              <List
                itemLayout="horizontal"
                dataSource={viewings.sort((a,b) => dayjs(a.date).diff(dayjs(b.date)))}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar style={{ backgroundColor: item.status === 'confirmed' ? '#f6ffed' : '#fffbe6', color: item.status === 'confirmed' ? '#52c41a' : '#faad14' }}>{item.propertyTitle[0]}</Avatar>}
                      title={<span style={{ fontWeight: 600 }}>{item.propertyTitle}</span>}
                      description={
                        <div>
                          <div>📅 {item.date} at {item.time}</div>
                          <div style={{marginTop: '4px'}}>👤 {item.clientName}</div>
                        </div>
                      }
                    />
                    <Tag color={item.status === 'confirmed' ? 'green' : 'gold'}>
                      {item.status.toUpperCase()}
                    </Tag>
                  </List.Item>
                )}
              />
           </Card>
        </div>
      </div>

      {/* --- Booking Modal --- */}
      <Modal 
        title="Schedule a New Viewing" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={() => setIsModalOpen(false)}
        okText="Book Appointment"
        okButtonProps={{ style: { backgroundColor: '#0f766e' } }}
      >
        <Form form={form} layout="vertical" name="bookingForm">
          
          <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
            <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '4px 11px' }}>
               <input placeholder="Enter name" style={{ border: 'none', outline: 'none', width: '100%' }} />
            </div> 
             {/* Note: I used a raw input styled to look like Antd for simplicity, 
                 or you can import { Input } from 'antd' and use <Input /> directly */}
          </Form.Item>

          <Form.Item name="propertyId" label="Select Property" rules={[{ required: true }]}>
            <Select placeholder="Choose a property">
              {MOCK_PROPERTIES.map(p => (
                <Select.Option key={p.id} value={p.id}>{p.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
               <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="time" label="Time" rules={[{ required: true }]}>
               <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
            </Form.Item>
          </div>
        
        </Form>
      </Modal>

    </div>
  );
};

export default Viewings;