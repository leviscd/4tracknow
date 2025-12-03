import React, { useState } from "react";
import { LogOut } from 'lucide-react';
import ThemeToggle from "./ThemeToggle";

type Props = {
  user: { name: string; role: string };
  remaining: string;
  onTabChange: (tab: 'painel' | 'databases' | 'admin') => void;
  activeTab: 'painel' | 'databases' | 'admin';
  onLogout: () => void;
};

const Header: React.FC<Props> = ({ user, remaining, onTabChange, activeTab, onLogout }) => {
  // ✅ Verifica se o usuário é admin
  const isAdmin = user.role === 'admin';
  
  // ✅ Estado para controlar o menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-purple-300/20 dark:border-purple-500/10 bg-white/80 dark:bg-[#050508]/70 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        
     
      <span className="font-orbitron text-2xl font-bold tracking-wider text-slate-900 dark:text-white">
        <span className="text-purple-600 dark:text-purple-500 text-glow">4</span>Track
      </span>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-purple-300/30 dark:border-purple-500/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm">
          <button
            onClick={() => onTabChange('painel')}
            className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all ${
              activeTab === 'painel'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-300 dark:border-purple-500/20 shadow-md'
                : 'text-slate-700 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5'
            }`}
          >
            Painel
          </button>
          <button
            onClick={() => onTabChange('databases')}
            className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all ${
              activeTab === 'databases'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-300 dark:border-purple-500/20 shadow-md'
                : 'text-slate-700 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5'
            }`}
          >
            Databases
          </button>
          
          {/* ✅ Aba Admin - Só aparece se for admin */}
          {isAdmin && (
            <button
              onClick={() => onTabChange('admin')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all relative ${
                activeTab === 'admin'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-300 dark:border-purple-500/20 shadow-md'
                  : 'text-slate-700 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5'
              }`}
            >
              GESTÃO
              {/* Badge opcional indicando área restrita */}
              {activeTab !== 'admin' && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Badge de tempo restante */}
          <span className="hidden sm:inline-block text-xs font-mono text-purple-700 dark:text-purple-500/70 bg-purple-50 dark:bg-transparent border border-purple-300 dark:border-purple-500/20 rounded px-3 py-1.5">
            {remaining}
          </span>

          {/* Badge de Role (opcional - mostra o tipo de usuário) */}
          {isAdmin && (
            <span className="hidden lg:inline-block text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/20 border border-purple-300 dark:border-purple-500/30 rounded px-2 py-1">
              ♔ DONO
            </span>
          )}

          {/* ✅ Botão Sair - Desktop */}
          <button
            onClick={onLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-300 dark:border-red-500/30 transition-all text-xs font-semibold uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>

          {/* Mobile Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-purple-300 dark:border-purple-500/20 bg-purple-50 dark:bg-slate-900 text-slate-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all shadow-sm"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Toggle Dark Mode */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`md:hidden flex-col gap-2 p-4 bg-white/90 dark:bg-[#050508]/70 backdrop-blur-md border-t border-purple-300/20 dark:border-purple-500/10 transition-all duration-300 ${
          mobileMenuOpen ? 'flex' : 'hidden'
        }`}
      >
        <button
          onClick={() => {
            onTabChange('painel');
            setMobileMenuOpen(false);
          }}
          className={`block px-4 py-2 rounded-lg transition-all text-left ${
            activeTab === 'painel'
              ? 'text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20'
              : 'text-slate-700 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5'
          }`}
        >
          Painel
        </button>
        <button
          onClick={() => {
            onTabChange('databases');
            setMobileMenuOpen(false);
          }}
          className={`block px-4 py-2 rounded-lg transition-all text-left ${
            activeTab === 'databases'
              ? 'text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20'
              : 'text-slate-700 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5'
          }`}
        >
          Databases
        </button>
        
        {/* ✅ Aba Admin no mobile - Só aparece se for admin */}
        {isAdmin && (
          <button
            onClick={() => {
              onTabChange('admin');
              setMobileMenuOpen(false);
            }}
            className={`block px-4 py-2 rounded-lg transition-all text-left ${
              activeTab === 'admin'
                ? 'text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20'
                : 'text-slate-700 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
             Gerenciar
              <span className="text-xs text-purple-700 dark:text-purple-500">(restrito)</span>
            </span>
          </button>
        )}

        {/* ✅ Botão Sair - Mobile */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-300 dark:border-red-500/30 transition-all font-semibold mt-2"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </nav>
    </header>
  );
};

export default Header;