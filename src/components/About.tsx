import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación Parallax de las Figuras (Shapes)
      if (shapesRef.current) {
        gsap.to(shapesRef.current.children, {
          y: (i) => (i + 1) * -50, // Cada figura se mueve a velocidad distinta hacia arriba
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Empieza cuando la sección entra por abajo
            end: "bottom top",   // Termina cuando sale por arriba
            scrub: 1,            // Suavizado
          }
        });
      }

      // 2. Efecto suave en la imagen
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { scale: 0.95, opacity: 0.8 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 1
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#111] text-white overflow-hidden px-4 sm:px-6 lg:px-8">
      
      {/* --- CAPA DE FIGURAS FLOTANTES (Estilo Gallery) --- */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-0">
        
        {/* Círculo grande decorativo */}
        <div className="absolute top-10 left-[-50px] w-64 h-64 border border-white/5 rounded-full" />
        
        {/* Cruz gigante transparente */}
        <div className="absolute bottom-20 right-[-20px] text-[20rem] leading-none text-white/5 font-thin font-sans select-none">
          +
        </div>

        {/* Cuadro Outline */}
        <div className="absolute top-1/3 right-[10%] w-32 h-32 border-t border-r border-white/10" />

        {/* Línea vertical */}
        <div className="absolute bottom-0 left-[20%] w-[1px] h-48 bg-gradient-to-t from-white/20 to-transparent" />
      </div>


      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="md:flex md:items-center md:space-x-16">
          
          {/* Foto del Fotógrafo */}
          <div className="md:w-1/2 mb-12 md:mb-0 relative">
            {/* Marco decorativo detrás de la foto */}
            <div className="absolute top-4 -left-4 w-full h-full border border-white/20 rounded-xl z-0 hidden md:block"></div>
            
            <img 
              ref={imageRef}
              className="relative z-10 rounded-xl shadow-2xl shadow-black/50 w-full object-cover aspect-3/4 grayscale hover:grayscale-0 transition-all duration-700 ease-out" 
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Gustavo Velasco Magallanes" 
            />
          </div>
          
          {/* Texto Bio */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
                 <div className="h-[1px] w-12 bg-white/50"></div>
                 <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">Sobre Mí</span>
            </div>

            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-8 leading-tight">
              Hola, soy <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Gustavo.
              </span>
            </h2>

            <div className="text-lg text-gray-400 space-y-6 font-light leading-relaxed">
              <p>
                Soy un fotógrafo apasionado con sede en México, dedicado a capturar la belleza auténtica de las personas y los momentos que definen nuestras vidas.
              </p>
              <p>
                Con más de 5 años de experiencia, mi enfoque combina el fotoperiodismo con una estética artística y natural. No busco poses forzadas, sino esas risas genuinas, miradas cómplices y la atmósfera real de tu evento.
              </p>
              <p>
                Ya sea tu boda, una sesión familiar o un proyecto personal, mi objetivo es contarte una historia a través de imágenes que atesorarás para siempre.
              </p>
            </div>

            {/* Firma o detalle extra */}
            <div className="mt-10 pt-6 border-t border-white/10">
                <p className="font-handwriting text-2xl text-white/80 transform -rotate-2">
                    Gus Velasco
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;