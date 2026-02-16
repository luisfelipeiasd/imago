import React, { useState } from 'react';

const VideoSection: React.FC = () => {
  const DRIVE_LINK = "https://drive.google.com/file/d/1OKhs7SvIVltdpbQO5ElxaSj0A9RUsgLc/preview";
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section id="play" className="py-16 md:py-24 bg-black relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#030712] to-[#030712] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex items-center justify-between md:justify-center gap-4 mb-8 md:mb-10 text-white/40">
          <div className="hidden md:block h-px bg-white/10 w-32"></div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap">APERTE O PLAY</span>
          <div className="w-full md:w-32 h-px bg-white/10"></div>
        </div>

        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-2xl md:text-4xl text-white font-bold leading-tight">
            Entenda o poder da <br />
            <span className="text-transparent bg-clip-text bg-gradient-primary">tecnologia no seu negócio.</span>
          </h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)] border border-white/10 bg-white/5 mb-12 group">
          <div className="relative pb-[56.25%] h-0 bg-black">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="absolute inset-0 w-full h-full cursor-pointer group focus:outline-none z-20"
                aria-label="Reproduzir vídeo"
              >
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                  alt="Capa do vídeo"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/50 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <i className="fa fa-play text-2xl md:text-3xl text-white drop-shadow-md"></i>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
              </button>
            ) : (
              <div id="video-container" className="absolute top-0 left-0 w-full h-full z-10">
                <iframe
                  src={DRIVE_LINK}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl pointer-events-none z-30"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-2xl pointer-events-none z-30"></div>
        </div>

        <div className="flex justify-center">
          <a href="#contato" className="block w-full md:w-auto text-center animate-pulse-glow bg-gradient-primary text-white font-semibold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 uppercase tracking-wide text-sm md:text-base">
            QUERO MINHA ANÁLISE GRATUITA →
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;