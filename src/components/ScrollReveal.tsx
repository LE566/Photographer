import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  id?: string;
  className?: string; // Agrego esto por si quieres pasar clases extra
}

const ScrollReveal = ({ children, id, className = "" }: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SELECCIÓN MÁGICA: Buscamos elementos de texto dentro de este contenedor
    // Buscamos encabezados (h2, h3), párrafos (p), listas (li), botones y los divs de tarjetas de servicios
    const targets = container.querySelectorAll('h2, h3, p, li, button, .rounded-2xl');

    if (targets.length === 0) return; // Si no encuentra nada, no hace nada

    // Configuramos el estado inicial (invisible y un poco más abajo)
    gsap.set(targets, { y: 30, opacity: 0 });

    // Creamos la animación escalonada
    ScrollTrigger.batch(targets, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.15, // <-- LA CLAVE: 0.15s de espera entre cada elemento
          overwrite: true // Asegura que no se peleen animaciones
        });
      },
      onLeaveBack: (batch) => {
        // Opcional: hace que desaparezcan al subir
        gsap.to(batch, { opacity: 0, y: 30, duration: 0.4, ease: "power3.in", stagger: 0.05, overwrite: true });
      },
      start: "top 95%", // Empieza cuando el elemento entra al 85% de la pantalla
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Agregué 'py-16' para dar un poco de aire vertical entre secciones
  return (
    <section ref={containerRef} id={id} className={`min-h-screen flex flex-col justify-center py-16 ${className}`}>
      {children}
    </section>
  );
};

export default ScrollReveal;