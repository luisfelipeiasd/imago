import React, { useState, useEffect, TouchEvent } from 'react';

interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  tags: string[];
  image: string;
}

const projects: ProjectDetail[] = [
  {
    id: 1,
    title: 'E-commerce Ultra Rápido',
    category: 'Varejo & Performance',
    description: 'Uma reformulação completa da infraestrutura de vendas online para uma marca de moda nacional.',
    challenge: 'O cliente sofria com abandono de carrinho devido ao carregamento lento (4s+) no mobile e falta de integração com o estoque físico.',
    solution: 'Desenvolvemos um Headless Commerce utilizando Next.js e Shopify. O tempo de carregamento caiu para 0.8s. Implementamos sincronização em tempo real entre lojas físicas e online via API personalizada.',
    tags: ['Next.js', 'Shopify API', 'Redis', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Dashboard Logístico IA',
    category: 'SaaS & Automação',
    description: 'Sistema de gestão de frotas com roteirização inteligente para uma transportadora de médio porte.',
    challenge: 'Processos manuais em planilhas geravam erros de rota e gastos excessivos com combustível.',
    solution: 'Criamos um dashboard administrativo que utiliza algoritmos de otimização para traçar rotas. O sistema integra com WhatsApp para enviar ordens de serviço automáticas aos motoristas.',
    tags: ['React', 'Python', 'Google Maps API', 'Twilio'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Portal Corporativo Financeiro',
    category: 'Institucional & Segurança',
    description: 'Plataforma para consultoria financeira com área de membros exclusiva e geração de relatórios dinâmicos.',
    challenge: 'A empresa precisava entregar relatórios de investimentos complexos de forma segura e visualmente atraente para clientes VIP.',
    solution: 'Portal com autenticação biométrica (via app) e gráficos interativos em tempo real. Design focado em credibilidade e facilidade de leitura de dados complexos.',
    tags: ['TypeScript', 'Node.js', 'D3.js', 'AWS'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
  }
];

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Swipe logic states - tracking X and Y to distinguish scroll vs swipe
  const [touchStart, setTouchStart] = useState<{x: number, y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number, y: number} | null>(null);
  const minSwipeDistance = 50;

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Swipe handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const xDiff = touchStart.x - touchEnd.x;
    const yDiff = touchStart.y - touchEnd.y;
    
    // Check if horizontal swipe is dominant (more horizontal movement than vertical)
    // This allows vertical scrolling on the text without changing slides accidentally
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (Math.abs(xDiff) > minSwipeDistance) {
            if (xDiff > 0) nextSlide(); // Swipe Left -> Next
            else prevSlide(); // Swipe Right -> Prev
        }
    }
  };

  if (!isOpen) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content - Fixed Height Container with Swipe Listeners on the Container */}
      <div 
        className="relative bg-[#0B1121] border border-white/10 rounded-2xl w-full max-w-5xl h-[85vh] md:h-[600px] flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-title-entrance overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Close Button Mobile (Floating) */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-30 md:hidden bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md"
        >
          <i className="fa fa-times text-sm"></i>
        </button>

        {/* Image Section */}
        {/* Mobile: Fixed height (h-56), Desktop: 50% width & full height */}
        <div 
          className="relative w-full h-56 sm:h-64 md:h-full md:w-1/2 shrink-0 bg-black group"
        >
          <img 
            src={currentProject.image} 
            alt={currentProject.title}
            className="w-full h-full object-cover opacity-80 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0B1121]"></div>
          
          {/* Mobile Navigation Overlay */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 py-3 md:hidden z-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
             <span className="text-white/80 text-xs font-medium flex items-center">
               <i className="fa fa-hand-pointer-o mr-2"></i> Deslize para navegar
             </span>
             <div className="flex gap-3 pointer-events-auto">
                <button onClick={prevSlide} className="text-white hover:text-accent-glow"><i className="fa fa-chevron-left"></i></button>
                <button onClick={nextSlide} className="text-white hover:text-accent-glow"><i className="fa fa-chevron-right"></i></button>
             </div>
          </div>
        </div>

        {/* Text Details Section */}
        {/* Flex column layout to allow internal scrolling of content */}
        <div className="flex flex-col w-full md:w-1/2 h-full bg-[#0B1121] relative">
          
          {/* Header Area (Fixed at top of content side) */}
          <div className="p-6 md:p-8 pb-2 shrink-0 relative">
             {/* Close Button Desktop */}
            <button 
                onClick={onClose}
                className="hidden md:flex absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
                <i className="fa fa-times text-2xl"></i>
            </button>

            {/* Navigation Desktop */}
            <div className="hidden md:flex gap-2 mb-4">
                <button 
                onClick={prevSlide} 
                className="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
                >
                <i className="fa fa-chevron-left"></i>
                </button>
                <button 
                onClick={nextSlide} 
                className="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
                >
                <i className="fa fa-chevron-right"></i>
                </button>
            </div>

            <div className="mb-2">
                <span className="text-accent-glow text-[10px] md:text-xs font-bold tracking-widest uppercase inline-block px-2 py-1 bg-accent-glow/10 rounded">
                {currentProject.category}
                </span>
            </div>

            <h3 className="text-xl md:text-3xl font-heading font-bold text-white leading-tight">
                {currentProject.title}
            </h3>
          </div>

          {/* Scrollable Content Body */}
          <div className="px-6 md:px-8 py-2 overflow-y-auto custom-scrollbar flex-grow space-y-5">
            <div>
              <p className="text-text-muted text-sm md:text-base leading-relaxed">
                {currentProject.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border-l-2 border-primary">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center">
                <i className="fa fa-bolt text-yellow-400 mr-2"></i> O Desafio
              </h4>
              <p className="text-text-muted text-xs md:text-sm">{currentProject.challenge}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border-l-2 border-accent-glow">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center">
                <i className="fa fa-check-circle text-green-400 mr-2"></i> A Solução Imago
              </h4>
              <p className="text-text-muted text-xs md:text-sm">{currentProject.solution}</p>
            </div>

            <div className="pb-2">
              <h4 className="text-white/60 text-xs uppercase font-bold mb-3 tracking-wide">Tecnologias</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] md:text-xs text-white bg-blue-600/20 border border-blue-500/30 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Area (Pagination Dots) */}
          <div className="p-6 md:p-8 pt-4 shrink-0 bg-[#0B1121] border-t border-white/5 md:border-none">
             <div className="flex gap-2 justify-center md:justify-start">
                {projects.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                />
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;