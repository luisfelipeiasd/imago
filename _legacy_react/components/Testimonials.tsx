import React from 'react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    title: '"A produtividade dobrou"',
    name: 'Ricardo M.',
    role: 'CEO da TecnoLog',
    quote: 'As automações desenvolvidas pela Imago eliminaram 4 horas de trabalho manual diário da nossa equipe. Valeu cada centavo.'
  },
  {
    title: '"Site veloz e vendedor"',
    name: 'Clara S.',
    role: 'Fundadora da Bloom',
    quote: 'Nosso site antigo era lento e não convertia. O novo site carrega instantaneamente e nossas vendas aumentaram 35% no primeiro mês.'
  },
  {
    title: '"Expertise técnica absurda"',
    name: 'André L.',
    role: 'Diretor de Ops na MultiSol',
    quote: 'Eles não apenas entregam código, entregam inteligência de negócio. O sistema personalizado resolveu um gargalo de anos.'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-[#050914]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
            <div className="max-w-2xl">
                <span className="text-primary font-bold tracking-widest text-xs md:text-sm uppercase mb-2 block">Resultados Reais</span>
                <h2 className="font-heading text-2xl md:text-4xl text-white leading-tight">
                    O impacto gerado em<br />nossos parceiros
                </h2>
            </div>
            <div className="flex gap-2 text-yellow-400 text-lg md:text-xl items-center">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <span className="text-white text-xs md:text-sm font-body ml-2">(5.0/5.0)</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div key={index} className="group relative bg-[#0B1121] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-accent-glow/30 transition-all duration-500 md:hover:-translate-y-2 overflow-hidden flex flex-col">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-primary text-3xl md:text-4xl mb-4 opacity-50 group-hover:text-accent-glow transition-colors duration-300">
                    <i className="fa fa-quote-left"></i>
                </div>
                
                <h3 className="text-base md:text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                
                <p className="text-text-muted italic text-sm leading-relaxed mb-6 flex-grow">
                    "{item.quote}"
                </p>
                
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {item.name.charAt(0)}
                    </div>
                    <div>
                        <strong className="block text-white text-sm">{item.name}</strong>
                        <span className="text-xs text-text-muted uppercase tracking-wide">{item.role}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;