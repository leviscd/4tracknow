import { Shield, Zap, Target, Network, Headphones } from 'lucide-react';

const differentials = [
  {
    icon: Shield,
    title: 'Segurança Avançada',
    description: 'Protocolos de segurança corporativa.',
  },
  {
    icon: Zap,
    title: 'Velocidade Extrema',
    description: 'Consultas processadas em milissegundos com infraestrutura otimizada.',
  },
  {
    icon: Network,
    title: 'Cruzamento Inteligente',
    description: 'Algoritmos de IA para correlação e análise de dados complexos.',
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description: 'Equipe técnica disponível 24/7 para atendimento prioritário.',
  },
];

const Differentials = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            Por que escolher o <span className="text-primary text-glow">4Track</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta aliada à confiabilidade que você precisa.
          </p>
        </div>

        <div className="space-y-4">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 flex items-center gap-6 transition-all duration-300 hover:shadow-neon group cursor-default"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                <item.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-orbitron text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {item.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
