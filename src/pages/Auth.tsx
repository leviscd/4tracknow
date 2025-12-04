import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import NeuralNetworkBackground from '@/components/NeuralNetworkBackground';
import Logo4Track from '@/components/Logo4Track';
import TermsModal from '@/components/TermsModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { Eye, EyeOff, LogIn, MessageCircle, HelpCircle } from 'lucide-react';
import { setAuth, API_URL } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().trim().min(3, 'Digite seu usuário ou e-mail'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

const Auth = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(
          'Erro no login',
          data.error || 'Credenciais inválidas. Verifique seus dados e tente novamente.'
        );
        return;
      }

      // Salva autenticação
      setAuth(data.token, data.user);

      toast.success(
        'Login realizado com sucesso!',
        `Bem-vindo de volta, ${data.user.name}!`
      );

      // Pequeno delay para mostrar o toast
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 800);

    } catch (err) {
      toast.error(
        'Erro de conexão',
        'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5544999119849', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4">
      <NeuralNetworkBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo4Track className="scale-125" />
        </div>

        <div className="glass-card neon-border p-8">
          <div className="text-center mb-8">
            <h1 className="font-orbitron text-2xl font-bold mb-2">
              <span className="text-primary text-glow">Acessar</span> Sistema
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira suas credenciais para continuar
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">E-mail ou Usuário</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuuser"
                className="bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20 h-12"
                autoComplete="username"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20 h-12 pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full btn-scanner" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Entrar no Sistema
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Ao realizar login, você concorda automaticamente com nossos{' '}
            <button
              type="button"
              onClick={() => setTermsOpen(true)}
              className="text-primary hover:text-accent underline underline-offset-2 transition-colors"
            >
              Termos de Uso
            </button>.
          </p>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">Precisa de ajuda?</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="button" variant="heroSecondary" size="default" className="flex-1" onClick={openWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" /> Esqueceu a senha?
            </Button>
            <Button type="button" variant="heroSecondary" size="default" className="flex-1" onClick={openWhatsApp}>
              <HelpCircle className="w-4 h-4 mr-2" /> Suporte
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <a href="/planos" className="text-primary hover:text-accent font-medium transition-colors">
                Adquira seu acesso
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Voltar para a página inicial
          </a>
        </div>
      </div>

      <TermsModal open={termsOpen} onOpenChange={setTermsOpen} />
    </div>
  );
};

export default Auth;