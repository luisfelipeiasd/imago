import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  // Mock Data
  const projects = [
    { id: 1, title: 'E-commerce Fashion', category: 'Websites', status: 'Published' },
    { id: 2, title: 'Bot WhatsApp', category: 'Automação', status: 'Draft' },
    { id: 3, title: 'ERP Logístico', category: 'Sistemas', status: 'Published' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#0B1121] border-r border-white/5 flex flex-col h-auto md:h-screen sticky top-0">
            <div className="p-6 border-b border-white/5">
                <span className="font-heading text-xl font-bold text-white tracking-wide">IMAGO <span className="text-primary text-xs align-top">ADMIN</span></span>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
                <button 
                    onClick={() => setActiveTab('projects')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'projects' ? 'bg-primary/20 text-white' : 'text-text-muted hover:bg-white/5'}`}
                >
                    <i className="fa fa-folder-open"></i> Projetos
                </button>
                <button 
                    onClick={() => setActiveTab('inbox')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'inbox' ? 'bg-primary/20 text-white' : 'text-text-muted hover:bg-white/5'}`}
                >
                    <i className="fa fa-inbox"></i> Mensagens
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'settings' ? 'bg-primary/20 text-white' : 'text-text-muted hover:bg-white/5'}`}
                >
                    <i className="fa fa-cog"></i> Configurações
                </button>
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                    <span className="text-xs text-text-muted">Supabase: <span className="text-white">Desconectado</span></span>
                </div>
                <button 
                    onClick={() => navigate('/')}
                    className="w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-white/5 text-sm flex items-center gap-2"
                >
                    <i className="fa fa-sign-out"></i> Sair
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold text-white">Gerenciar Projetos</h2>
                <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                    <i className="fa fa-plus"></i> Novo Projeto
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#0B1121] border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-text-muted text-xs uppercase font-bold mb-2">Total Projetos</h4>
                    <span className="text-3xl font-bold text-white">12</span>
                </div>
                <div className="bg-[#0B1121] border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-text-muted text-xs uppercase font-bold mb-2">Publicados</h4>
                    <span className="text-3xl font-bold text-accent-glow">08</span>
                </div>
                <div className="bg-[#0B1121] border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-text-muted text-xs uppercase font-bold mb-2">Leads (Mês)</h4>
                    <span className="text-3xl font-bold text-green-400">45</span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5 text-xs uppercase text-text-muted">
                                <th className="p-4 font-bold tracking-wide">Título</th>
                                <th className="p-4 font-bold tracking-wide">Categoria</th>
                                <th className="p-4 font-bold tracking-wide">Status</th>
                                <th className="p-4 font-bold tracking-wide text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-white font-medium">{project.title}</td>
                                    <td className="p-4 text-text-muted">
                                        <span className={`px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs`}>
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`flex items-center gap-2 ${project.status === 'Published' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Published' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="text-white/60 hover:text-accent-glow transition-colors px-2">
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="text-white/60 hover:text-red-400 transition-colors px-2">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    </div>
  );
};

export default AdminDashboard;