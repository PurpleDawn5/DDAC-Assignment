import { Button, Card, message, Switch } from 'antd';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // 1. Import Hook
import './Settings.css';

const Settings: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);
  
  // 2. Use Global State instead of local state
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSave = () => {
    message.success('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1 style={{ marginBottom: 24 }}>Settings</h1>

      <Card title="Notifications & Emails" style={{ marginBottom: 24 }}>
        <div className="setting-item">
          <div className="setting-label">
            <h4>Allow Emails</h4>
            <p>Receive weekly summaries and updates.</p>
          </div>
          <Switch 
            checked={emailEnabled} 
            onChange={setEmailEnabled} 
            style={{ backgroundColor: emailEnabled ? '#0f766e' : undefined }}
          />
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <h4>Push Notifications</h4>
            <p>Get alerted when a new tenant applies.</p>
          </div>
          <Switch 
            checked={notifEnabled} 
            onChange={setNotifEnabled} 
            style={{ backgroundColor: notifEnabled ? '#0f766e' : undefined }}
          />
        </div>
      </Card>

      <Card title="Appearance">
        <div className="setting-item" style={{ borderBottom: 'none' }}>
          <div className="setting-label">
            <h4>Theme</h4>
            <p>Toggle between Light and Dark mode.</p>
          </div>
          
          {/* 3. Connect Input to Global State */}
          <label htmlFor="theme" className="theme">
            <span className="theme__toggle-wrap">
              <input 
                id="theme" 
                className="theme__toggle" 
                type="checkbox" 
                role="switch" 
                name="theme" 
                value="dark" 
                checked={isDarkMode}
                onChange={(e) => toggleTheme(e.target.checked)}
              />
              <span className="theme__fill"></span>
              <span className="theme__icon">
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
              </span>
            </span>
          </label>

        </div>
      </Card>

      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <Button size="large">Reset Defaults</Button>
        <Button 
          type="primary" 
          size="large" 
          style={{ marginLeft: 12, backgroundColor: '#0f766e' }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>

    </div>
  );
};

export default Settings;