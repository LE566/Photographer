import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = () => {
  useEffect(() => {
    // 1. Inicializar Lenis
    const lenis = new Lenis({
      duration: 1.5, // Duración del scroll (más alto = más suave/lento)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de aceleración
      // smoothTouch: true, // (Opcional) si quieres suavidad en móviles también
    });

    // 2. Sincronizar Lenis con GSAP ScrollTrigger
    // Esto es CRUCIAL para que las animaciones no vibren al hacer scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Bucle de animación
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis requiere el tiempo en ms
    });

    // Desactivar el lag smoothing de GSAP para evitar saltos con Lenis
    gsap.ticker.lagSmoothing(0);

    // 3. Limpieza al salir
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return null; // Este componente no renderiza nada visual, solo lógica
};

export default SmoothScroll;