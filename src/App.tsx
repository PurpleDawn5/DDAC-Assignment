import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Partners from './pages/Partners';
import Owners from './pages/Owners';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0f766e',
          borderRadius: 4,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Layout: {
             bodyBg: '#f5f7fa', // A very light blue-grey background (not harsh white)
             headerBg: '#ffffff',
             siderBg: '#ffffff', // Make sidebar white instead of dark
          },
          Menu: {
            itemSelectedBg: '#e6fffa', // Light teal background for selected item
            itemSelectedColor: '#0f766e', // Teal text for selected item
          }
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="viewings" element={<div>Schedule Viewing Page</div>} />
            <Route path="owners" element={<Owners />} />
            <Route path="partners" element={<Partners />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

