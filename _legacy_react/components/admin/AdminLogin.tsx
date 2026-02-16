import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake login for demonstration
    if (email && password) {
        navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-bg-dark to-bg-dark pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0B1121] border border-white/10 p-8 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-white mb-2">Painel Imago</h2>
            <p className="text-text-muted text-sm">Acesso restrito para administradores.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className="block text-xs uppercase text-text-muted font-bold tracking-wide mb-2">E-mail</label>
                <div className="relative">
                    <i className="fa fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/30"></i>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:bg-white/10 focus:outline-none transition-all"
                        placeholder="admin@imago.tech"
                    />
                </div>
            </div>
            
            <div>
                <label className="block text-xs uppercase text-text-muted font-bold tracking-wide mb-2">Senha</label>
                <div className="relative">
                    <i className="fa fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/30"></i>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:bg-white/10 focus:outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-gradient-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
                ENTRAR
            </button>
        </form>
        
        <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-xs text-white/40 hover:text-white transition-colors">
                ← Voltar para o site
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;