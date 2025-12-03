import { useEffect, useState, useCallback } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  role: string;
  expires_at?: string | null;
};

export function useDashboard() {
  const [user, setUser] = useState<User>({ 
    id: 0, 
    name: 'Levi', 
    username: '', 
    role: 'user' // Default: usuário comum
  });
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState('Calculando...');

  // ✅ Função para calcular tempo restante
  const calcRemaining = useCallback((expires_at?: string | null) => {
    if (!expires_at) return 'Sem expiração';
    
    const exp = new Date(expires_at).getTime();
    const now = Date.now();
    
    if (exp <= now) return 'Expirado';
    
    const diff = exp - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    
    if (days > 0) {
      return `${days}d ${hours}h restantes`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m restantes`;
    } else {
      return `${minutes}m restantes`;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Tenta carregar do localStorage
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          setUser(userData);
          if (userData.expires_at) {
            setRemaining(calcRemaining(userData.expires_at));
          }
        } catch (error) {
          console.error('Erro ao parsear user do localStorage:', error);
        }
      }
      setLoading(false);
      return;
    }

    // Busca dados do servidor
    fetch('http://localhost:5000/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('not authorized');
        return res.json();
      })
      .then((data: User) => {
       
        setUser(data);
        
        // Salva no localStorage
        localStorage.setItem('user', JSON.stringify(data));
        
        // Calcula tempo restante
        if (data.expires_at) {
          const timeRemaining = calcRemaining(data.expires_at);
          console.log('Tempo restante calculado:', timeRemaining);
          setRemaining(timeRemaining);
        } else {
          setRemaining('Sem expiração');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do usuário:', error);
        
        // Fallback: tenta ler do localStorage
        const stored = localStorage.getItem('user');
        if (stored) {
          try {
            const userData = JSON.parse(stored);
            setUser(userData);
            if (userData.expires_at) {
              setRemaining(calcRemaining(userData.expires_at));
            }
          } catch (e) {
            console.error('Erro ao parsear user do localStorage:', e);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [calcRemaining]);

  // ✅ Atualiza o tempo restante a cada minuto
  useEffect(() => {
    if (!user.expires_at) return;

    const interval = setInterval(() => {
      setRemaining(calcRemaining(user.expires_at));
    }, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval);
  }, [user.expires_at, calcRemaining]);

  return { user, loading, remaining };
}