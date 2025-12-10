import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertiesDetails';
import Viewings from './pages/Viewings'; // <-- Import the new page
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
             bodyBg: '#f5f7fa', 
             headerBg: '#ffffff',
             siderBg: '#ffffff', 
          },
          Menu: {
            itemSelectedBg: '#e6fffa', 
            itemSelectedColor: '#0f766e', 
          }
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<PropertyDetails />} />
            
            {/* Update this line: */}
            <Route path="viewings" element={<Viewings />} />
            
            <Route path="owners" element={<Owners />} />
            <Route path="partners" element={<Partners />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;