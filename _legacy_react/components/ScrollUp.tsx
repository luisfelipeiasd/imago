import React, { useState, useEffect } from 'react';

const ScrollUp: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-8 z-40 bg-[rgba(48,79,255,0.7)] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-[#304fff] border border-white/20 backdrop-blur-sm ${
        visible ? 'bottom-24 opacity-100' : '-bottom-16 opacity-0'
      }`}
    >
      <i className="fa fa-angle-up"></i>
    </button>
  );
};

export default ScrollUp;