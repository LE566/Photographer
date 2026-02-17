import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NavbarProps {
  setCurrentView: (id: string) => void;
}

const Navbar = ({ setCurrentView }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Bajamos el umbral a 10px para que reaccione más rápido
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;

    if (isScrolled) {
      // --- MODO FULL (De orilla a orilla) ---
      gsap.to(nav, {
        width: "100%",           // Ancho total
        maxWidth: "100%",        // <--- IMPORTANTE: Quitamos el límite de tamaño
        marginTop: "0rem",
        borderRadius: "0px",     // Esquinas cuadradas
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        border: "none",          // Quitamos el borde para que se fusione mejor
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        duration: 0.5,
        ease: "power2.inOut"     // Curva suave
      });
    } else {
      // --- MODO ISLA (Flotante y centrada) ---
      gsap.to(nav, {
        width: "90%",
        maxWidth: "1200px",      // <--- Restablecemos el límite para que se vea bonita
        marginTop: "1.5rem",
        borderRadius: "100px",   // Muy redonda (tipo pastilla)
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)", // Sombra flotante
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
  }, [isScrolled]);

  const navLinks = [
    { name: 'Inicio', view: 'hero' },
    { name: 'Galería', view: 'gallery' },
    { name: 'Servicios', view: 'services' },
    { name: 'Sobre Mí', view: 'about' },
    { name: 'Área de Clientes', view: 'client-access' },
    { name: 'Contacto', view: 'contact' },
  ];

  return (
    // Contenedor fijo que ocupa toda la pantalla pero no bloquea clicks
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center">
      <nav
        ref={navRef}
        className="
          pointer-events-auto
          flex flex-col items-center
          backdrop-blur-md
          overflow-hidden
        "
        style={{
          // Valores iniciales (Modo Isla)
          width: '90%',
          maxWidth: '1200px',
          marginTop: '1.5rem',
          borderRadius: '100px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid rgba(255,255,255,0.5)',
        }}
      >
        <div className="w-full px-6 md:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="shrink-0 cursor-pointer" onClick={() => setCurrentView('hero')}>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Gus Velasco
              </h1>
            </div>

            {/* Menú Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setCurrentView(link.view)}
                  className="text-gray-600 hover:text-black hover:bg-black/5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => setCurrentView('contact')}
                className="ml-4 bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95"
              >
                Reservar
              </button>
            </div>

            {/* Hamburguesa Móvil */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        <div
          className={`
                w-full md:hidden bg-white/50 transition-all duration-500 ease-in-out
                ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}
            `}
        >
          <div className="px-4 flex flex-col space-y-2 text-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setCurrentView(link.view);
                  setIsOpen(false);
                }}
                className="block w-full py-3 text-gray-800 font-medium hover:bg-white/60 rounded-lg"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;