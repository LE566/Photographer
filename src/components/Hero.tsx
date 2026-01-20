import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  setCurrentView: (id: string) => void;
}

const Hero = ({ setCurrentView }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    
    // 1. Efecto Parallax en la imagen de fondo
    if (bgImageRef.current && heroRef.current) {
      gsap.to(bgImageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // 2. Animación de entrada
    if (content) {
        // CORRECCIÓN: Usamos .fromTo para garantizar que empiece invisible y termine visible
        // Esto es mucho más seguro que usar opacity-0 en el HTML
        const tl = gsap.timeline({ delay: 0.5 });
        
        // Seleccionamos los elementos internos
        const elements = content.querySelectorAll('h1, p');
        const button = content.querySelector('button');

        tl.fromTo(elements, 
            { y: 50, opacity: 0 }, // Empieza aquí (invisible)
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 } // Termina aquí (visible)
        )
        .fromTo(button,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.5"
        );
    }
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center text-center text-white">
      
      <div 
        ref={bgImageRef}
        className="absolute inset-0 bg-cover bg-center z-0 scale-110"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")' 
        }}
      >
         <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* CORRECCIÓN: Quitamos opacity-0 de aquí */}
      <div ref={contentRef} className="relative z-1 px-4"> 
        <h1 className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-lg tracking-tight">
          Capturando<br/>Momentos Únicos
        </h1>
        <p className="text-xl md:text-3xl mb-10 font-light drop-shadow-md max-w-2xl mx-auto">
          Gustavo Velasco Magallanes | Fotografía Profesional
        </p>
        <button 
          onClick={() => setCurrentView('gallery')}
          className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl cursor-pointer text-lg"
        >
          Explorar Galería
        </button>
      </div>
    </div>
  );
};

export default Hero;