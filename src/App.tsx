import { App as AntdApp, ConfigProvider, theme } from 'antd'; 
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Owners from './pages/Owners';
import Partners from './pages/Partners';
import Properties from './pages/Properties';
import Settings from './pages/Settings';

// --- NEW IMPORTS FROM FRIEND'S WORK ---
import PropertyDetails from './pages/PropertiesDetails';
import Viewings from './pages/Viewings'; 

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0f766e',
          borderRadius: 4,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Layout: {
            bodyBg: 'var(--bg-color)',
            headerBg: 'var(--card-bg)',
            siderBg: 'var(--card-bg)',
          },
          Menu: {
            itemBg: 'var(--card-bg)',
            itemColor: 'var(--text-primary)',
          }
        }
      }}
    >
      {/* Wrap Router in AntdApp so context-aware modals (logout) work */}
      <AntdApp>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              
              {/* Properties & Details */}
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:id" element={<PropertyDetails />} />
              
              {/* Viewings (Updated from placeholder to real page) */}
              <Route path="viewings" element={<Viewings />} />
              
              <Route path="owners" element={<Owners />} />
              <Route path="partners" element={<Partners />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;