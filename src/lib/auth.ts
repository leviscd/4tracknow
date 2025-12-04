// Utilitários de autenticação com validação de expiração

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const isTokenExpired = (expiresAt: string | null): boolean => {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() <= Date.now();
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUserData = () => {
  const userData = localStorage.getItem('user');
  if (!userData) return null;
  
  try {
    const user = JSON.parse(userData);
    
    // Verifica se está expirado
    if (user.expires_at && isTokenExpired(user.expires_at)) {
      clearAuth();
      return null;
    }
    
    return user;
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const setAuth = (token: string, user: any) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Requisição autenticada com verificação de expiração
export const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const user = getUserData();
  
  // Verifica se está expirado antes de fazer a requisição
  if (user && user.expires_at && isTokenExpired(user.expires_at)) {
    clearAuth();
    throw new Error('SESSION_EXPIRED');
  }
  
  if (!token) {
    throw new Error('NO_TOKEN');
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  // Se receber 401 ou 403, limpa a autenticação
  if (response.status === 401 || response.status === 403) {
    clearAuth();
    throw new Error('UNAUTHORIZED');
  }
  
  return response;
};