import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-10 md:py-14 text-center">
      <div className="container mx-auto px-6">
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="w-10 h-10 rounded-full bg-[#404040] text-white flex items-center justify-center hover:bg-primary transition-colors duration-300">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#404040] text-white flex items-center justify-center hover:bg-primary transition-colors duration-300">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#404040] text-white flex items-center justify-center hover:bg-primary transition-colors duration-300">
            <i className="fa fa-whatsapp"></i>
          </a>
        </div>

        <ul className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-8 mb-8 text-text-muted text-sm">
          <li className="relative md:after:content-[''] md:after:absolute md:after:w-0.5 md:after:h-3 md:after:bg-white/20 md:after:right-[-16px] md:after:top-1/2 md:after:-translate-y-1/2 md:mr-4">
            <span className="font-semibold text-white/60 mr-2">Localização:</span> Atendimento em todo o Brasil
          </li>
          <li className="relative md:after:content-[''] md:after:absolute md:after:w-0.5 md:after:h-3 md:after:bg-white/20 md:after:right-[-16px] md:after:top-1/2 md:after:-translate-y-1/2 md:mr-4">
            <span className="font-semibold text-white/60 mr-2">WhatsApp:</span> (11) 99999-9999
          </li>
          <li>
            <span className="font-semibold text-white/60 mr-2">E-mail:</span> contato@imago.tech
          </li>
        </ul>

        <p className="text-text-muted text-xs">
          Copyright 2024. Desenvolvido por <a href="#" className="text-primary hover:underline">Imago</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;