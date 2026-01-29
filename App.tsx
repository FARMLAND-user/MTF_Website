import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CMSData } from './types';
import { INITIAL_CMS_DATA } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

// CMS Context for global state management
interface CMSContextType {
  data: CMSData;
  updateData: (newData: CMSData) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within a CMSProvider");
  return context;
};

const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    const saved = localStorage.getItem('metafor_cms_data');
    return saved ? JSON.parse(saved) : INITIAL_CMS_DATA;
  });

  const updateData = (newData: CMSData) => {
    setData(newData);
    localStorage.setItem('metafor_cms_data', JSON.stringify(newData));
  };

  return (
    <CMSContext.Provider value={{ data, updateData }}>
      {children}
    </CMSContext.Provider>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <CMSProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FF5E00] selection:text-black">
          <Routes>
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/services" element={<div className="pt-20"><Services /></div>} />
                      <Route path="/insights" element={<div className="pt-20"><Insights /></div>} />
                      <Route path="/contact" element={<div className="pt-20"><Contact /></div>} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </CMSProvider>
  );
};

export default App;