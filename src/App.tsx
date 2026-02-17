import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalleryHorizontal from './components/Gallery';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import Lenis from 'lenis';
import ScrollReveal from './components/ScrollReveal';
import Testimonials from './components/Testimonials'; // Fixed import

// New Components
import ClientAccess from './components/ClientAccess';
import ClientGallery from './components/ClientGallery';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('hero');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Client System State
  const [clientSession, setClientSession] = useState<{ type: 'ADMIN' | 'CLIENT' | null, code: string | null }>({ type: null, code: null });

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    // If we are in a special view (Client or Admin), go back to home first
    if (['client-access', 'client-gallery', 'admin-dashboard'].includes(currentView) || ['client-access', 'client-gallery', 'admin-dashboard'].includes(id)) {
      setCurrentView(id); // Switch view
      window.scrollTo(0, 0);
      return;
    }

    // Normal scrolling for landing page sections
    setCurrentView(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsModalOpen(true);
  };

  const handleClientLogin = (code: string) => {
    if (code === 'ADMIN') {
      setClientSession({ type: 'ADMIN', code: 'ADMIN' });
      setCurrentView('admin-dashboard');
    } else {
      setClientSession({ type: 'CLIENT', code: code });
      setCurrentView('client-gallery');
    }
  };

  const handleLogout = () => {
    setClientSession({ type: null, code: null });
    setCurrentView('client-access');
  };

  // --- RENDER LOGIC ---

  // 1. Admin Dashboard
  if (currentView === 'admin-dashboard' && clientSession.type === 'ADMIN') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // 2. Client Gallery
  if (currentView === 'client-gallery' && clientSession.type === 'CLIENT') {
    return <ClientGallery albumCode={clientSession.code!} onLogout={handleLogout} />;
  }

  // 3. Client Login/Access
  if (currentView === 'client-access') {
    return (
      <>
        <Navbar setCurrentView={scrollToSection} />
        <ClientAccess onLogin={handleClientLogin} />
      </>
    );
  }

  // 4. Default Landing Page
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">

      <Navbar setCurrentView={scrollToSection} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />

      <main className="grow">
        <section id="hero">
          <Hero setCurrentView={scrollToSection} />
        </section>

        <div id="gallery">
          <GalleryHorizontal />
        </div>

        <ScrollReveal id="services">
          <Services onSelectPackage={handlePackageSelect} />
        </ScrollReveal>

        <ScrollReveal id="testimonials">
          <Testimonials />
        </ScrollReveal>

        <ScrollReveal id="about">
          <About />
        </ScrollReveal>

        <ScrollReveal id="contact">
          <Contact />
        </ScrollReveal>

      </main>

      <Footer />
    </div>
  );
}

export default App;