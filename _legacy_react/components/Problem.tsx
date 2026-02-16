import React, { useState, useEffect } from 'react';

const Problem: React.FC = () => {
  const words = [
    "+ Clientes",
    "+ Tecnologia",
    "+ Otimização",
    "+ Tempo",
    "+ Faturamento",
    "+ Posicionamento",
    "+ Vantagem"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="problema" className="py-16 md:py-24 bg-bg-dark">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-2xl md:text-4xl text-white inline-block relative pb-4 leading-tight">
            O Custo de Adiar a Tecnologia
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-primary rounded-full"></div>
          </h2>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-12 items-stretch">
          {/* Left: Tech Scanner Graphic */}
          <div className="w-full md:w-1/2 min-h-[320px] md:min-h-[400px]">
            <div className="relative w-full h-full bg-[#0F172A]/60 border border-blue-500/30 rounded-2xl overflow-hidden flex items-center justify-center backdrop-blur-sm">
              {/* Scan Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-glow shadow-[0_0_15px_#00F0FF] animate-scanning opacity-50 z-10"></div>
              
              <div className="relative z-0 text-center w-full px-4">
                 <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-blue-500/20 flex items-center justify-center animate-pulse mx-auto">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-accent-glow/40 flex items-center justify-center bg-blue-500/5">
                        <i className="fa fa-cog text-4xl md:text-6xl text-accent-glow opacity-90 animate-[spin_6s_linear_infinite]"></i>
                    </div>
                 </div>
                 <div className="mt-6 md:mt-8 flex flex-col items-center justify-center min-h-[4rem] md:min-h-[5rem]">
                    <span className="text-text-muted text-xs md:text-sm uppercase tracking-widest mb-2">Soluções Precisas</span>
                    <p key={currentWordIndex} className="text-2xl md:text-3xl font-bold text-white animate-title-entrance">
                        {words[currentWordIndex]}
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-8 md:mb-10">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
                Você ainda perde horas em planilhas e processos manuais?
              </h3>
              <p className="text-text-muted text-base md:text-lg">
                Enquanto você luta com o caos operacional e um site lento que afasta clientes, seus concorrentes estão escalando. Cada minuto gasto em tarefas repetitivas é dinheiro que deixa de entrar no seu caixa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { title: "Perda de Clientes", desc: "Um site amador ou desatualizado destrói sua credibilidade em segundos." },
                { title: "Caos Operacional", desc: "Planilhas confusas que não se conversam travam o crescimento do negócio." },
                { title: "Tempo Desperdiçado", desc: "Você deveria estar focado em vender, não em preencher dados manualmente." },
                { title: "A Solução Imago", desc: "Recupere seu tempo e profissionalize sua empresa com tecnologia de ponta." }
              ].map((item, idx) => (
                <div key={idx} className="group relative bg-[#0B1121] border border-white/5 rounded-2xl p-5 md:p-6 hover:border-accent-glow/30 transition-all duration-500 md:hover:-translate-y-1 overflow-hidden">
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h4 className="font-heading text-base md:text-lg font-semibold text-white mb-2 flex items-center group-hover:text-primary transition-colors">
                      <i className="fa fa-angle-right text-primary mr-2 group-hover:translate-x-1 transition-transform"></i> {item.title}
                    </h4>
                    <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;