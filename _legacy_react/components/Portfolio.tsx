import React, { useState } from 'react';
import { Project } from '../types';

const projectsData: Project[] = [
  {
    id: 1,
    title: 'PERFORMANCE',
    category: 'websites',
    subtitle: 'E-commerce de Alta Conversão',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'AUTOMAÇÃO',
    category: 'automacoes',
    subtitle: 'Integração CRM & WhatsApp',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'SISTEMA',
    category: 'sistemas',
    subtitle: 'Gestão de Estoque Sob Medida',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  }
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-bg-dark">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-2xl md:text-4xl text-white inline-block relative pb-4">
            Projetos de Impacto
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-primary rounded-full"></div>
          </h2>
        </div>

        {/* Filter - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto md:justify-center gap-3 md:gap-4 mb-8 md:mb-12 pb-4 md:pb-0 px-1 scrollbar-hide snap-x">
          {[
            { label: 'TODOS', value: 'all' },
            { label: 'WEBSITES', value: 'websites' },
            { label: 'AUTOMAÇÕES', value: 'automacoes' },
            { label: 'SISTEMAS', value: 'sistemas' }
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`whitespace-nowrap px-5 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border border-transparent snap-center ${
                filter === btn.value
                  ? 'bg-bg-card border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative bg-[#0B1121] border border-white/5 hover:border-accent-glow/30 rounded-2xl overflow-hidden h-64 md:h-80 transition-all duration-500 md:hover:-translate-y-2">
              <img 
                src={project.image} 
                alt={project.subtitle} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              
              {/* Gradient Overlay for Consistency */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <h3 className="text-white/80 font-medium text-xs md:text-sm mb-2 tracking-[0.2em] uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h3>
                <h4 className="text-white font-bold text-lg md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.subtitle}
                </h4>
                <div className="w-10 h-1 bg-primary rounded-full mt-4 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;