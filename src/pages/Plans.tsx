import { Check, Star, Zap, Clock, Calendar } from 'lucide-react';
import NeuralNetworkBackground from '@/components/NeuralNetworkBackground';
import Logo4Track from '@/components/Logo4Track';
import { Button } from '@/components/ui/button';

const plans = [
  {
    id: 'diario',
    name: 'Diário',
    price: 'R$ 10',
    period: '/dia',
    description: 'Perfeito para uso rápido',
    icon: Zap,
    features: [
      'Acesso por 24 horas',
      'Consultas ilimitadas',
      'Todos os módulos básicos',
      'Suporte via WhatsApp',
    ],
    highlight: false,
  },
  {
    id: 'semanal',
    name: 'Semanal',
    price: 'R$ 30',
    period: '/semana',
    description: 'Para quem precisa com frequência moderada',
    icon: Clock,
    features: [
      'Acesso por 7 dias',
      'Consultas ilimitadas',
      'Todos os módulos básicos',
      'Suporte prioritário',
      'Economia de R$ 40',
    ],
    highlight: false,
  },
  {
    id: 'quinzenal',
    name: 'Quinzenal',
    price: 'R$ 50',
    period: '/15 dias',
    description: 'Equilíbrio ideal entre preço e uso',
    icon: Calendar,
    features: [
      'Acesso por 15 dias',
      'Consultas ilimitadas',
      'Todos os módulos',
      'Suporte prioritário',
      'Economia de R$ 100',
    ],
    highlight: false,
  },
  {
    id: 'mensal',
    name: 'Mensal',
    price: 'R$ 100',
    period: '/mês',
    description: 'Máximo valor pelo melhor preço',
    icon: Star,
    features: [
      'Acesso por 30 dias',
      'Consultas ilimitadas',
      'Todos os módulos premium',
      'Suporte VIP 24/7',
      'Economia de R$ 200',
      'Módulos exclusivos',
    ],
    highlight: true,
    badge: 'Mais Vendido',
  },
];

const Plans = () => {
  const handlePlanClick = () => {
    const url = 'https://wa.me/5544999119849?text=Olá! Gostaria de adquirir um plano do 4Track.';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen bg-background">
      <NeuralNetworkBackground />
      
      <div className="relative z-10 py-16 px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <a href="/">
              <Logo4Track />
            </a>
          </div>

          <div className="text-center mb-16">
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
              Escolha seu <span className="text-primary text-glow-intense">Plano</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acesso completo à plataforma de análise mais avançada do mercado. 
              Escolha o período que melhor se adapta às suas necessidades.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative glass-card p-6 transition-all duration-500 hover:-translate-y-3 group ${
                  plan.highlight 
                    ? 'border-2 border-primary shadow-neon-intense lg:scale-105' 
                    : 'neon-border'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-secondary to-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-neon whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  plan.highlight 
                    ? 'bg-gradient-to-br from-primary to-secondary' 
                    : 'bg-primary/20 border border-primary/30'
                }`}>
                  <plan.icon className={`w-7 h-7 ${plan.highlight ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>

                {/* Plan Name */}
                <h3 className="font-orbitron text-xl font-bold mb-1 text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`font-orbitron text-4xl font-bold ${plan.highlight ? 'text-primary text-glow' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-primary' : 'text-accent'}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.highlight ? 'hero' : 'heroSecondary'}
                  className="w-full btn-scanner"
                  onClick={handlePlanClick}
                >
                  {plan.highlight ? 'Escolher Plano' : 'Selecionar'}
                </Button>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Pagamento seguro • Ativação imediata • Suporte 24/7</p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: '🔒', label: 'Criptografia SSL' },
                { icon: '⚡', label: 'Ativação Instantânea' },
                { icon: '💬', label: 'Suporte WhatsApp' },
                { icon: '✅', label: 'Garantia de Acesso' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back Links */}
          <div className="mt-12 flex justify-center gap-6">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Voltar para início
            </a>
            <a
              href="/auth"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Já tenho conta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
