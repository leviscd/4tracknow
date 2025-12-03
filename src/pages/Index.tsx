import NeuralNetworkBackground from '@/components/NeuralNetworkBackground';
import HeroSection from '@/components/HeroSection';
import ConsultationCards from '@/components/ConsultationCards';
import TrackingAnimation from '@/components/TrackingAnimation';
import Differentials from '@/components/Differentials';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Neural Network Animated Background */}
      <NeuralNetworkBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <ConsultationCards />
        <TrackingAnimation />
        <Differentials />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
