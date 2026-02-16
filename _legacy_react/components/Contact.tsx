import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contato" className="py-16 md:py-24 bg-bg-dark relative overflow-hidden">
      {/* Decorator - Hidden on mobile to reduce clutter */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-10 md:gap-12 items-start">
            
            {/* Text Content */}
            <div className="w-full lg:w-5/12 pt-0 md:pt-10">
                <h2 className="font-heading text-3xl md:text-5xl text-white font-bold leading-tight mb-4 md:mb-6">
                    Sua Próxima Fase <br />
                    <span className="text-transparent bg-clip-text bg-gradient-primary">Começa Aqui.</span>
                </h2>
                <p className="text-text-muted text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                    Não somos apenas desenvolvedores. Somos parceiros estratégicos de crescimento. Vamos analisar seu cenário atual e desenhar a solução ideal.
                </p>
                
                <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-primary shrink-0">
                            <i className="fa fa-check"></i>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm md:text-base">Análise Gratuita</h4>
                            <p className="text-xs md:text-sm text-text-muted">Diagnóstico completo do seu digital.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-primary shrink-0">
                            <i className="fa fa-lock"></i>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm md:text-base">Sigilo Absoluto</h4>
                            <p className="text-xs md:text-sm text-text-muted">Seus dados e ideias protegidos.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-7/12">
                <div className="bg-[#0B1121] border border-white/5 p-6 md:p-10 rounded-2xl relative group overflow-hidden shadow-2xl">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                    
                    <div className="relative z-10">
                        <div className="mb-6 md:mb-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Solicitar Sessão Estratégica</h3>
                            <p className="text-xs md:text-sm text-yellow-500 font-medium flex items-center">
                                <i className="fa fa-exclamation-triangle mr-2"></i>
                                Agenda de projetos para este mês encerrando.
                            </p>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            alert('Obrigado! Recebemos seu interesse e entraremos em contato em breve.');
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                                <div className="space-y-1 md:space-y-2">
                                    <label className="text-xs uppercase text-text-muted font-bold tracking-wide ml-1">Nome</label>
                                    <input 
                                        type="text" 
                                        placeholder="Seu nome" 
                                        required 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 md:py-4 md:px-5 text-white text-base placeholder-white/20 focus:bg-white/10 focus:border-primary focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1 md:space-y-2">
                                    <label className="text-xs uppercase text-text-muted font-bold tracking-wide ml-1">Empresa</label>
                                    <input 
                                        type="text" 
                                        placeholder="Nome do negócio" 
                                        required 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 md:py-4 md:px-5 text-white text-base placeholder-white/20 focus:bg-white/10 focus:border-primary focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1 md:space-y-2">
                                    <label className="text-xs uppercase text-text-muted font-bold tracking-wide ml-1">E-mail</label>
                                    <input 
                                        type="email" 
                                        placeholder="contato@empresa.com" 
                                        required 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 md:py-4 md:px-5 text-white text-base placeholder-white/20 focus:bg-white/10 focus:border-primary focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1 md:space-y-2">
                                    <label className="text-xs uppercase text-text-muted font-bold tracking-wide ml-1">WhatsApp</label>
                                    <input 
                                        type="tel" 
                                        placeholder="(DDD) 99999-9999" 
                                        required 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 md:py-4 md:px-5 text-white text-base placeholder-white/20 focus:bg-white/10 focus:border-primary focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6 md:mb-8 space-y-1 md:space-y-2">
                                <label className="text-xs uppercase text-text-muted font-bold tracking-wide ml-1">Desafio Atual</label>
                                <textarea 
                                    rows={3} 
                                    placeholder="O que está impedindo seu crescimento hoje?" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 md:py-4 md:px-5 text-white text-base placeholder-white/20 focus:bg-white/10 focus:border-primary focus:outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-gradient-primary hover:brightness-110 text-white font-extrabold py-4 px-6 md:py-5 md:px-8 rounded-xl shadow-[0_10px_30px_rgba(59,130,246,0.3)] transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-xs md:text-sm"
                            >
                                Agendar Consultoria Gratuita
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;