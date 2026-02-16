import React, { useState } from 'react';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { useNavigate } from 'react-router-dom';

const allProjects: Project[] = [
  {
    id: 1,
    title: 'PERFORMANCE',
    category: 'websites',
    subtitle: 'E-commerce Fashion',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'AUTOMAÇÃO',
    category: 'automacoes',
    subtitle: 'Bot de Vendas WhatsApp',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'SISTEMA',
    category: 'sistemas',
    subtitle: 'ERP Logístico Custom',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'WEBSITE',
    category: 'websites',
    subtitle: 'Landing Page Imobiliária',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'SISTEMA',
    category: 'sistemas',
    subtitle: 'Dashboard Financeiro SaaS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'AUTOMAÇÃO',
    category: 'automacoes',
    subtitle: 'Integração RD Station + CRM',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80'
  }
];

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  const categories = [
    { label: 'TODOS', value: 'all' },
    { label: 'WEBSITES', value: 'websites' },
    { label: 'AUTOMAÇÃO', value: 'automacoes' },
    { label: 'SISTEMAS', value: 'sistemas' }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark pb-16">
      <div className="container mx-auto px-6 md:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
            <button 
                onClick={() => navigate('/')} 
                className="mb-6 text-text-muted hover:text-white flex items-center justify-center gap-2 transition-colors text-sm"
            >
                <i className="fa fa-arrow-left"></i> Voltar para Home
            </button>
            <h1 className="animate-title-entrance font-heading text-4xl md:text-6xl font-extrabold uppercase leading-tight mb-6 text-white">
                Nossos <span className="text-transparent bg-clip-text bg-gradient-primary">Projetos</span>
            </h1>
            <p className="text-text-muted text-base md:text-xl font-light max-w-2xl mx-auto">
                Explore como transformamos desafios complexos em soluções digitais de alta performance.
            </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 md:mb-16">
          {categories.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border ${
                filter === btn.value
                  ? 'bg-white/10 border-accent-glow text-accent-glow shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-[#0B1121] border-white/5 text-text-muted hover:text-white hover:border-white/20'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
                key={project.id} 
                onClick={() => setIsModalOpen(true)}
                className="group relative bg-[#0B1121] border border-white/5 hover:border-accent-glow/40 rounded-3xl overflow-hidden h-80 md:h-96 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-accent-glow/10"
            >
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.subtitle} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent opacity-90 transition-opacity duration-300"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-accent-glow text-xs font-bold tracking-widest uppercase mb-2 block">
                            {categories.find(c => c.value === project.category)?.label}
                        </span>
                        <h3 className="text-white font-heading font-bold text-xl md:text-2xl leading-tight mb-2 group-hover:text-primary transition-colors">
                            {project.subtitle}
                        </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300 transform group-hover:rotate-45">
                        <i className="fa fa-arrow-up text-sm"></i>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-white/40">
                <i className="fa fa-folder-open-o text-4xl mb-4"></i>
                <p>Nenhum projeto encontrado nesta categoria.</p>
            </div>
        )}

      </div>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProjectsPage;