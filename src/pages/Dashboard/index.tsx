import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import DashboardModules from './DashboardModules';
import RecentQueries from './RecentQueries';
import AdminPanel from './AdminPanel';
import { useDashboard } from './useDashboard';
import { clearAuth, isTokenExpired } from '@/lib/auth';
import { useCustomToast } from '@/hooks/use-custom-toast';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const { user, loading, remaining } = useDashboard();
  const [activeTab, setActiveTab] = useState<'painel' | 'databases' | 'admin'>('painel');

  // ✅ Verifica tema ao montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    
    if (savedTheme === 'dark' || !savedTheme) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  // ✅ Verificação de expiração em tempo real
  useEffect(() => {
    if (!user.expires_at) return;

    const checkExpiration = () => {
      if (isTokenExpired(user.expires_at!)) {
        clearAuth();
        toast.error(
          '⚠️ Login Expirado',
          'Seu acesso expirou. Entre em contato com seu vendedor para renovar!'
        );
        setTimeout(() => {
          navigate('/auth', { replace: true });
        }, 3000);
      }
    };

    // Verifica imediatamente
    checkExpiration();

    // Verifica a cada 30 segundos
    const interval = setInterval(checkExpiration, 30000);

    return () => clearInterval(interval);
  }, [user.expires_at, navigate, toast]);

  const handleLogout = () => {
    clearAuth();
    toast.info('Logout realizado', 'Até logo!');
    setTimeout(() => {
      navigate('/auth');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050508]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-slate-800 dark:text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="bg-white dark:bg-[#050508] text-slate-900 dark:text-slate-200 min-h-screen flex flex-col font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
        <div className="fixed inset-0 z-0 pointer-events-none cyber-grid-bg bg-grid-pattern opacity-[0.03] dark:opacity-[0.15]"></div>
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-300/5 dark:bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-300/5 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

        <Header 
          user={user} 
          remaining={remaining} 
          onTabChange={setActiveTab} 
          activeTab={activeTab}
          onLogout={handleLogout}
        />

        <main className="flex-grow container mx-auto px-4 py-10 z-10 relative">
          {activeTab === 'painel' && (
            <>
              {/* Card Seja Bem-vindo - FUNDO ESCURO */}
              <section className="rounded-2xl p-6 mb-10 relative overflow-hidden bg-[#0f172a] border border-purple-500/20">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Seja bem-vindo(a), <span className="text-purple-400">{user.name}</span>!
                </h1>
                <p className="text-sm md:text-base text-slate-300">
                  Tenha um ótimo trabalho!
                  {user.role === 'admin' && (
                    <span className="ml-2 text-xs font-semibold text-purple-400">
                      ♔ Dono
                    </span>
                  )}
                </p>
              </section>

              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
                    <span className="flex h-8 w-1 bg-purple-600 dark:bg-purple-500 rounded-full" />
                    Módulos Disponíveis
                  </h2>
                </div>

                <DashboardModules />
              </div>

              {/* Card Últimas Consultas - FUNDO ESCURO */}
              <section className="rounded-2xl overflow-hidden relative group bg-[#0f172a] border border-purple-500/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
                <div className="p-6 border-b border-purple-500/20 flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                    <span className="text-purple-400 w-5 h-5 inline-flex items-center justify-center">📈</span> 
                    Últimas Consultas
                  </h3>
                  <button className="text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors">
                    Ver Histórico Completo
                  </button>
                </div>

                <RecentQueries />
              </section>
            </>
          )}

          {activeTab === 'databases' && (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🗄️</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Databases
              </h2>
              <p className="text-slate-700 dark:text-slate-400">
                Esta seção está em desenvolvimento
              </p>
            </div>
          )}

          {activeTab === 'admin' && user.role === 'admin' && (
            <AdminPanel />
          )}
        </main>

        <footer className="border-t border-purple-300/20 dark:border-purple-500/10 bg-white/60 dark:bg-[#050508]/80 backdrop-blur-md py-8 text-center relative z-10">
          <p className="text-xs text-slate-600 dark:text-slate-500 font-mono">
            SYSTEM STATUS: <span className="text-green-600 dark:text-green-500">ONLINE</span> • 4TRACK © 2024
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;