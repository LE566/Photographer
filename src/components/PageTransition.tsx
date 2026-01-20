import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Las palabras que cambiarán rápido antes de mostrar tu nombre
const words = ["Arte", "Memoria", "Luz", "Sombra", "Eternidad"];

const PageTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. ANIMACIÓN DEL CONTADOR (0% a 100%)
      // Usamos un objeto simple para animar su valor numérico
      const counterObj = { value: 0 };
      
      tl.to(counterObj, {
        value: 100,
        duration: 2.2, // Duración de la carga
        ease: "power2.inOut",
        onUpdate: () => {
            // Actualizamos el número en pantalla
            if(counterRef.current) {
                counterRef.current.textContent = `${Math.floor(counterObj.value)}%`;
            }
        }
      });

      // 2. CAMBIO DE PALABRAS (Arte -> Memoria -> Luz...)
      const wordInterval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 250); // Cambia cada 250ms

      // 3. SECUENCIA FINAL
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => clearInterval(wordInterval) // Detenemos las palabras
      })
      // Preparamos el nombre final
      .set(textRef.current, { 
        textContent: "GUSTAVO VELASCO", 
        color: "white", 
        opacity: 0, 
        scale: 1.2,
        fontWeight: "900", // Más grueso para impacto
        letterSpacing: "0.1em"
      })
      // Aparece el nombre elegantemente
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      })
      // Se va hacia arriba desvaneciéndose
      .to(textRef.current, {
         y: -50,
         opacity: 0,
         duration: 0.5,
         delay: 0.3
      })
      // 4. LEVANTAR EL TELÓN (Tu lógica original)
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      // Z-index muy alto para tapar todo al inicio
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Contador Gigante en la esquina */}
      <div className="absolute bottom-10 right-10 font-mono text-4xl sm:text-8xl font-bold opacity-20 select-none">
        <span ref={counterRef}>0%</span>
      </div>

      {/* Texto Central Cambiante */}
      <div className="relative z-10 overflow-hidden px-4 text-center">
        <h2 
            ref={textRef} 
            className="text-4xl md:text-7xl font-light tracking-tighter uppercase transition-all"
        >
            {words[index]}
        </h2>
      </div>

      {/* Barra de progreso inferior (Decorativa) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900">
         <div className="h-full bg-white w-full origin-left animate-progress"></div>
      </div>
      
      {/* CSS inline simple para la barra de carga */}
      <style>{`
        .animate-progress {
            animation: grow 2.2s ease-in-out forwards;
        }
        @keyframes grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;