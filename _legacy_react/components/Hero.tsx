import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[100dvh] md:min-h-[85vh] flex items-center justify-center pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80" 
          alt="Background" 
          className="w-full h-full object-cover object-center animate-slow-zoom"
        />
        <div className="hero-overlay absolute inset-0 bg-black/60 md:bg-black/50"></div>
      </div>

      <div className="container mx-auto px-6 md:px-4 relative z-10 text-center flex flex-col items-center justify-center h-full">
        <h1 className="animate-title-entrance font-heading text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase leading-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Transforme caos <br/>
          operacional em <br/>
          <span className="text-accent-glow">lucro escalável.</span>
        </h1>
        
        <h3 className="text-text-muted text-base md:text-xl font-light max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
          Para empresas que cansaram de perder tempo com planilhas e sites lentos.<br className="hidden md:block"/>
          Implementamos sistemas de elite que trabalham enquanto você dorme.
        </h3>

        <div className="mb-10 md:mb-12 w-full md:w-auto">
          <a href="#contato" className="block w-full md:w-auto text-center animate-pulse-glow bg-gradient-primary text-white font-semibold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300">
            QUERO MINHA ANÁLISE GRATUITA →
          </a>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-90 mb-8 md:mb-12 w-full">
          <div className="text-center flex-1 md:flex-none min-w-[80px]">
            <strong className="block text-white font-heading text-xl md:text-3xl">+150</strong>
            <span className="text-text-muted text-[10px] md:text-xs uppercase tracking-widest">Projetos</span>
          </div>
          <div className="w-px h-8 md:h-10 bg-white/10"></div>
          <div className="text-center flex-1 md:flex-none min-w-[80px]">
            <strong className="block text-white font-heading text-xl md:text-3xl">24h</strong>
            <span className="text-text-muted text-[10px] md:text-xs uppercase tracking-widest">Suporte</span>
          </div>
          <div className="w-px h-8 md:h-10 bg-white/10"></div>
          <div className="text-center flex-1 md:flex-none min-w-[80px]">
            <strong className="block text-white font-heading text-xl md:text-3xl">ROI</strong>
            <span className="text-text-muted text-[10px] md:text-xs uppercase tracking-widest">Garantido</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;