import { useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onSelectPackage: (packageName: string) => void;
}

interface ServicePackage {
  title: string;
  price: string;
  features: string[];
  highlight: boolean;
}

const Services: FC<ServicesProps> = ({ onSelectPackage }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  const packages: ServicePackage[] = [
    {
      title: 'Sesión Retrato',
      price: '$150 USD',
      features: ['1 Hora de sesión', '1 Ubicación', '15 Fotos editadas digitales', 'Galería online privada'],
      highlight: false
    },
    {
      title: 'Bodas / Eventos',
      price: 'Desde $800 USD',
      features: ['Cobertura de 6 horas', '2 Fotógrafos', 'Más de 300 fotos editadas', 'Álbum digital + Impreso pequeño'],
      highlight: true
    },
    {
      title: 'Comercial / Producto',
      price: 'Cotizar',
      features: ['Fotografía para e-commerce', 'Estilo de vida de marca', 'Edición de alta gama', 'Licencia de uso comercial'],
      highlight: false
    },
  ];

  // --- ANIMACIÓN DE FIGURAS (Igual que antes, solo cambia el color en el CSS) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section || !shapesRef.current) return;

      const cameraIcon = shapesRef.current.querySelector('.shape-camera');
      const shutterIcon = shapesRef.current.querySelector('.shape-shutter');
      const lines = shapesRef.current.querySelectorAll('.shape-line');

      // 1. Cámara flotando
      gsap.to(cameraIcon, {
        y: -100, 
        rotation: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 2. Obturador girando
      gsap.to(shutterIcon, {
        y: 50,
        rotation: 120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // 3. Líneas moviéndose
      gsap.fromTo(lines, 
        { scaleX: 0.5, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.2, 
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    // CAMBIO 1: Fondo BLANCO (bg-white)
    <section ref={sectionRef} className="relative w-ful overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
       
       {/* --- FONDO ANIMADO --- */}
       {/* CAMBIO 2: Las figuras ahora son negras/grises muy sutiles para verse en fondo blanco */}
       <div ref={shapesRef} className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          
          {/* Icono Cámara (Negro sutil) */}
          <div className="shape-camera absolute top-10 -left-10 text-black/5 w-64 h-64">
             <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </div>

          {/* Icono Obturador (Negro sutil) */}
          <div className="shape-shutter absolute bottom-20 -right-16 text-black/5 w-80 h-80">
             <svg fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/> 
             </svg>
          </div>

          {/* Líneas Decorativas (Negras sutiles) */}
          <div className="shape-line absolute top-1/3 left-0 w-full h-[1px] bg-black/5" />
          <div className="shape-line absolute top-2/3 right-0 w-3/4 h-[1px] bg-black/5" />
          
          {/* Cruces (+) */}
          <div className="absolute top-1/2 left-10 text-6xl text-black/10 font-thin">+</div>
          <div className="absolute top-1/4 right-1/4 text-4xl text-black/10 font-thin">+</div>

       </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          {/* CAMBIO 3: Textos oscuros de nuevo */}
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Servicios y Paquetes</h2>
          <p className="mt-4 text-lg text-gray-500">Inversiones transparentes para recuerdos eternos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              // CAMBIO 4: Tarjetas blancas con sombras. 
              // La tarjeta normal ahora tiene border-gray-100 para definirse sobre el fondo blanco.
              className={`rounded-2xl p-8 flex flex-col transition-transform hover:-translate-y-2 duration-300
                ${pkg.highlight 
                    ? 'bg-white shadow-[0_20px_50px_rgba(59,130,246,0.15)] border-2 border-blue-500 relative transform scale-105 z-20' 
                    : 'bg-white shadow-xl border border-gray-100'
                }`}
            >
              {pkg.highlight && <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Más Popular</span>}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">{pkg.price}</p>
              
              <ul className="mb-8 space-y-4 flex-1">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => onSelectPackage(pkg.title)}
                className={`w-full py-3 px-6 rounded-lg font-bold transition-all cursor-pointer shadow-lg active:scale-95 
                  ${pkg.highlight 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30' 
                    : 'bg-gray-900 hover:bg-black text-white shadow-gray-900/30'
                  }`}
              >
                Reservar este Paquete
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;