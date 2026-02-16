import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollUp from './components/ScrollUp';
import WhatsAppBtn from './components/WhatsAppBtn';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-body text-text-main bg-bg-dark antialiased overflow-x-hidden selection:bg-primary selection:text-white">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
        <ScrollUp />
        <WhatsAppBtn />
      </div>
    </Router>
  );
};

export default App;