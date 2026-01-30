import { useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const columns = footerRef.current?.querySelectorAll('.footer-col');
      const bottomBar = footerRef.current?.querySelector('.footer-bottom');

      if(columns) {
        gsap.fromTo(columns, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
            }
          }
        );
      }

      if(bottomBar) {
        gsap.fromTo(bottomBar,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.5, scrollTrigger: { trigger: footerRef.current, start: "top 95%" } }
        );
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* COLUMNA 1: Marca y Bio */}
          <div className="md:col-span-5 footer-col opacity-0">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Gus Velasco</h2>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Capturando la esencia de los momentos irrepetibles. Especializado en fotografía editorial, bodas y retratos con luz natural.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: Navegación */}
          <div className="md:col-span-2 footer-col opacity-0">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Menu</h3>
            <ul className="space-y-4">
              <li><a href="#hero" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all inline-block">Inicio</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all inline-block">Galería</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all inline-block">Servicios</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all inline-block">Sobre Mí</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: Servicios */}
          <div className="md:col-span-3 footer-col opacity-0">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Servicios</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">Retratos Editoriales</li>
              <li className="text-gray-400">Cobertura de Bodas</li>
              <li className="text-gray-400">Fotografía de Producto</li>
              <li className="text-gray-400">Workshops</li>
            </ul>
          </div>

          {/* COLUMNA 4: Botón Subir */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-start footer-col opacity-0">
              <button 
                onClick={scrollToTop}
                className="group flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <span className="text-sm font-medium uppercase tracking-widest">Subir</span>
                <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                </div>
              </button>
          </div>

        </div>

        {/* BARRA INFERIOR: Copyright & Créditos */}
        <div className="footer-bottom opacity-0 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex flex-col md:flex-row md:space-x-4 items-center">
            <p>&copy; {currentYear} Gus Velasco Photography.</p>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="text-gray-400">
              Developed by {' '}
              <a 
                href="https://le566.github.io/LE-Portafolio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 font-medium hover:text-white transition-colors underline decoration-white/10 underline-offset-4"
              >
                Luis Esparza
              </a>
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;