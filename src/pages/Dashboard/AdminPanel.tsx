import React, { useState, useEffect } from 'react';
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search,
  Calendar,
  Mail,
  Key,
  Shield,
  Clock
} from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  username: string;
  role: 'admin' | 'user';
  expires_at: string | null;
  created_at: string;
}

interface EditingUser extends Partial<UserData> {
  password?: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState<EditingUser>({
    name: '',
    username: '',
    password: '',
    role: 'user',
    expires_at: null,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadUsers();
        setIsCreating(false);
        resetForm();
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const handleUpdateUser = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadUsers();
        setEditingUser(null);
        resetForm();
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await loadUsers();
        setShowDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const startEdit = (user: UserData) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      role: user.role,
      expires_at: user.expires_at,
      password: '',
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      password: '',
      role: 'user',
      expires_at: null,
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Sem expiração';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
              <Shield className="w-8 h-8 text-purple-500" />
              Painel Administrativo
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Gerencie usuários e permissões do sistema
            </p>
          </div>

          <button
            onClick={() => {
              setIsCreating(true);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-glow-md transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            Novo Usuário
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar usuários por nome ou username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-500/20 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      {(isCreating || editingUser) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                {editingUser ? <Edit className="w-6 h-6 text-purple-500" /> : <Plus className="w-6 h-6 text-purple-500" />}
                {editingUser ? 'Editar Usuário' : 'Criar Novo Usuário'}
              </h2>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingUser(null);
                  resetForm();
                }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="João Silva"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Username (Login)
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="joaosilva"
                  disabled={!!editingUser}
                />
                {editingUser && (
                  <p className="text-xs text-slate-500 mt-1">Username não pode ser alterado</p>
                )}
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Key className="w-4 h-4" /> Senha {editingUser && '(deixe em branco para não alterar)'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="••••••••"
                />
              </div>

              {/* Role e Data de Expiração */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Tipo de Conta
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Data de Expiração
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.expires_at ? new Date(formData.expires_at).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => editingUser ? handleUpdateUser(editingUser.id!) : handleCreateUser()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-glow-md transition-all font-semibold"
                >
                  <Save className="w-5 h-5" />
                  {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingUser(null);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-purple-500/10">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-purple-500" />
            Usuários Cadastrados ({filteredUsers.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-purple-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Usuário</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Criado em</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Expira em</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{user.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        <User className="w-3 h-3" /> Usuário
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      {formatDate(user.expires_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhum usuário encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Confirmar Exclusão
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteUser(showDeleteConfirm)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Sim, Excluir
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;