import React from 'react';

const WhatsAppBtn: React.FC = () => {
  return (
    <a
      href="https://wa.me/5562984077910"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 animate-pulse-green"
      aria-label="Fale conosco no WhatsApp"
    >
      <i className="fa fa-whatsapp text-3xl"></i>
    </a>
  );
};

export default WhatsAppBtn;