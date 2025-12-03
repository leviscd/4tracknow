import { Link } from 'react-router-dom';
import Logo4Track from './Logo4Track';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-deep/30 via-transparent to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <Logo4Track className="scale-150" />
        </div>
        
        {/* Main Title */}
        <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-delayed">
          <span className="text-primary text-glow-intense">O Futuro</span>
          <br />
          <span className="text-foreground">da Análise Inteligente de Dados</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-delayed-2">
          A plataforma mais moderna de consultas avançadas, com tecnologia de 
          <span className="text-accent"> rastreamento</span> e 
          <span className="text-accent"> cruzamento de informações</span> em tempo real.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delayed-2">
          {/* Primary Button */}
          <Link to="/auth">
            <Button 
              variant="hero" 
              size="lg"
              className="min-w-[220px] btn-scanner"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Entrar no Sistema
              </span>
            </Button>
          </Link>
          
          {/* Secondary Button */}
          <Link to="/planos">
            <Button 
              variant="heroSecondary" 
              size="lg"
              className="min-w-[220px]"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Cadastrar-se
              </span>
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
           
            { value: '0.5s', label: 'Tempo de retorno Médio' },
            { value: '24/7', label: 'Disponibilidade' },
           { value: 'Updates', label: 'Constantes' },
            { value: 'Api´s', label: 'Para desenvolvedores' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 float" style={{ animationDelay: `${i * 0.5}s` }}>
              <div className="font-orbitron text-2xl md:text-3xl font-bold text-primary text-glow">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
