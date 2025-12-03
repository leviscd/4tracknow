import { User, Building2, Mail, Phone, Car, Database } from 'lucide-react';

const modules = [
  {
    icon: Car,
    title: 'Consultas Veículares',
    description: 'Informações relacionadas a proprietários e sobre os veículos.',
    available: true,
  },
  {
    icon: User,
    title: 'Consultas CPF / Nome',
    description: 'Busca avançada por dados pessoais com cruzamento inteligente.',
    available: true,
  },
  {
    icon: Building2,
    title: 'Consultas CNPJ',
    description: 'Informações empresariais completas e atualizadas em tempo real.',
    available: true,
  },
  {
    icon: Mail,
    title: 'Consultas E-mail',
    description: 'Consulta informações da pessoa relacionada ao e-mail.',
    available: true,
  },
  {
    icon: Phone,
    title: 'Consultas Telefone',
    description: 'Rastreamento de informações de uma pessoa através de seu telefone.',
    available: true,
  },
  {
    icon: Database,
    title: 'Análises de Dados Gerais',
    description: 'e muito +, acesse já!',
    available: true,
  },
];

const ConsultationCards = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary text-glow">Módulos</span> de Consulta
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Acesse uma variedade de ferramentas especializadas para análise e rastreamento de informações.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`glass-card neon-border p-6 transition-all duration-500 hover:-translate-y-2 group ${
                !module.available ? 'opacity-70' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative w-14 h-14 mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-colors" />
                <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center border border-primary/30">
                  <module.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-orbitron text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {module.title}
              </h3>
              <p className={`text-sm leading-relaxed ${!module.available ? 'text-accent' : 'text-muted-foreground'}`}>
                {module.description}
              </p>

              {/* Status indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${module.available ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-accent shadow-[0_0_8px_rgba(167,139,250,0.4)]'}`} />
                <span className="text-xs text-muted-foreground">
                  {module.available ? 'Disponível' : 'Acesso Restrito'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationCards;
