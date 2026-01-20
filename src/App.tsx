// src/App.tsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalleryHorizontal from './components/Gallery'; // <--- IMPORTAMOS EL NUEVO
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import SmoothScroll from './components/SmoothScroll'; 
import PageTransition from './components/PageTransition';

function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    scrollToSection('contact');
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <SmoothScroll />
      <PageTransition /> 
      
      <Navbar setCurrentView={scrollToSection} />
      
      <main className="grow">
        <section id="hero">
            <Hero setCurrentView={scrollToSection} />
        </section>

        {/* IMPORTANTE:
           Quitamos <ScrollReveal> de aquí.
           GalleryHorizontal usa 'pin: true' (fixed position). 
           Si lo envuelves en otro div con transformaciones, el 'pin' se rompe.
           La galería ya tiene sus propias animaciones internas.
        */}
        <div id="gallery">
          <GalleryHorizontal />
        </div>

        {/* Cuando GalleryHorizontal termine sus 3000px de scroll, 
           GSAP soltará la pantalla y este componente subirá naturalmente.
        */}
        <ScrollReveal id="services">
          <Services onSelectPackage={handlePackageSelect} />
        </ScrollReveal>

        <ScrollReveal id="about">
          <About />
        </ScrollReveal>

        <ScrollReveal id="contact">
          <Contact preSelectedPackage={selectedPackage} />
        </ScrollReveal>

      </main>
      <Footer />
    </div>
  );
}

export default App;