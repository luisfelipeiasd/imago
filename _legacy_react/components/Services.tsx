import React, { useState } from 'react';
import { Service } from '../types';
import ProjectModal from './ProjectModal';

const services: Service[] = [
  {
    icon: 'fa-rocket',
    title: 'Sites de Performance',
    description: 'Não é apenas estética. Desenvolvemos arquiteturas digitais focadas em SEO, velocidade de carregamento (Core Web Vitals) e taxas de conversão agressivas.'
  },
  {
    icon: 'fa-cogs',
    title: 'Automações Inteligentes',
    description: 'Integramos seu CRM, WhatsApp e ferramentas de marketing. Elimine o erro humano e faça sua operação rodar no piloto automático 24/7.'
  },
  {
    icon: 'fa-code',
    title: 'Sistemas Sob Medida',
    description: 'SaaS e dashboards personalizados que resolvem dores específicas da sua operação. Onde o software de prateleira falha, nós construímos a solução exata.'
  }
];

const Services: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="solucao" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-accent-glow font-bold tracking-widest text-xs md:text-sm uppercase mb-2 block">Nossa Expertise</span>
          <h2 className="font-heading text-2xl md:text-5xl text-white inline-block relative pb-4 leading-tight">
            A Engenharia do Crescimento
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Deixamos o "básico" para os amadores. Entregamos infraestrutura digital robusta para escalar seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative bg-[#0B1121] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-accent-glow/30 transition-all duration-500 active:scale-[0.98] md:hover:-translate-y-2 overflow-hidden">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <i className={`fa ${service.icon} text-xl md:text-2xl text-white group-hover:text-accent-glow transition-colors duration-300`}></i>
                </div>
                
                <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-text-muted text-sm leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-accent-glow transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-accent-glow hover:border-accent-glow transition-all duration-300 text-xs md:text-sm font-semibold tracking-wide"
            >
                VER PROJETOS REALIZADOS 
                <i className="fa fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
            </button>
        </div>
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Services;