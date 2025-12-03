import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    // Verifica localStorage primeiro
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    
    // Se não houver preferência salva, usa dark como padrão
    return true;
  });

  useEffect(() => {
    const html = document.documentElement;
    
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="relative group h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-purple-500/20 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-500/50 transition-all shadow-sm hover:shadow-glow-sm"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <Sun 
        className={`w-5 h-5 absolute transition-all duration-300 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} 
      />
      <Moon 
        className={`w-5 h-5 absolute transition-all duration-300 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} 
      />
    </button>
  );
};

export default ThemeToggle;