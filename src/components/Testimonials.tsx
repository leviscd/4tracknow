const testimonials = [
  {
    name: 'Ricardo Mendes',
    role: 'Analista de Segurança',
    avatar: 'RM',
    quote: 'O 4Track aumentou muito minha produtividade. O sistema é rápido, intuitivo e muito confiável.',
  },
  {
    name: 'Carla Oliveira',
    role: 'Investigadora Particular',
    avatar: 'CO',
    quote: 'A melhor ferramenta para trabalho sério. Velocidade + precisão. Indispensável no meu dia a dia.',
  },
  {
    name: 'Fernando Costa',
    role: 'Consultor Empresarial',
    avatar: 'FC',
    quote: 'O cruzamento de dados é impressionante. Consigo obter informações que antes levavam horas em segundos.',
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            O que nossos <span className="text-primary text-glow">usuários</span> dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profissionais que confiam no 4Track para suas análises diárias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card neon-border p-6 float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {/* Quote */}
              <div className="mb-6">
                <svg className="w-8 h-8 text-primary/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
