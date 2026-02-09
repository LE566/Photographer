import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- ZONA DE IMPORTACIÓN DE IMÁGENES REALES ---
import img1 from '../assets/images/IMG_8264-3.jpg';
import img2 from '../assets/images/IMG_8140.jpg';
import img3 from '../assets/images/IMG_8205-2.jpg';
import img4 from '../assets/images/IMG_8176.jpg';
import img5 from '../assets/images/IMG_8149-3.jpg';
import img6 from '../assets/images/IMG_8154.jpg';

gsap.registerPlugin(ScrollTrigger);

interface ImageItem {
  id: number;
  src: string;
  title: string;
  category: string;
  year: string;
}

const GalleryHorizontal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  const images: ImageItem[] = [
    { id: 1, src: img1, title: "Boda en Tulum", category: "Bodas", year: "2024" },
    { id: 2, src: img2, title: "Editorial Vogue", category: "Retrato", year: "2025" },
    { id: 3, src: img3, title: "Jardín Botánico", category: "Parejas", year: "2024" },
    { id: 4, src: img4, title: "Campaña Nike", category: "Comercial", year: "2025" },
    { id: 5, src: img5, title: "Boda Civil", category: "Eventos", year: "2024" },
    { id: 6, src: img6, title: "Golden Hour", category: "Personal", year: "2023" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const bgText = bgTextRef.current;
      const shapes = shapesRef.current;
      const progressBar = progressBarRef.current;

      if (!section || !track) return;

      ScrollTrigger.refresh();

      const getScrollAmount = () => {
        const amount = track.scrollWidth - window.innerWidth;
        return amount > 0 ? amount : 0;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${getScrollAmount() - (window.innerWidth / 2)}`, 
          scrub: 0, 
          invalidateOnRefresh: true,
        }
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // Parallax
      if (bgText) tl.to(bgText, { x: -200, ease: "none" }, 0);
      if (shapes) tl.to(shapes.children, { x: () => -getScrollAmount() * 1.5, ease: "none", stagger: 0.1 }, 0);
      if (progressBar) tl.to(progressBar, { width: "100%", ease: "none" }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative h-screen bg-[#111] text-white overflow-hidden flex flex-col justify-center">
      
      {/* CAPA 0: TEXTO FONDO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 select-none overflow-hidden">
        <div ref={bgTextRef} className="whitespace-nowrap text-[20vw] font-black tracking-tighter text-gray-500 leading-none">
          PORTFOLIO — SELECTED
        </div>
      </div>

      {/* CAPA 1: SHAPES */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-24 h-24 border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-[20%] left-[50%] text-6xl text-white/10 font-thin">+</div>
        
        {/* --- AQUÍ ESTABA EL ERROR CORREGIDO --- */}
        <div className="absolute top-[40%] left-[80%] w-64 h-px bg-white/30"></div>
        {/* ------------------------------------- */}

        <div className="absolute bottom-[10%] left-[10%] w-40 h-40 border-l border-t border-white/10"></div>
      </div>

      {/* CAPA 2: TRACK IMÁGENES */}
      <div ref={trackRef} className="flex flex-nowrap items-center h-[70vh] w-max px-10 md:px-20 gap-16 relative z-20">
        
        {/* Intro Panel */}
        <div className="shrink-0 w-[80vw] md:w-[25vw] flex flex-col justify-center border-l border-white/20 pl-8">
          <h2 className="text-6xl font-bold leading-none mb-4">
            Obras<br/>Recientes
          </h2>
          <p className="text-gray-400 max-w-xs text-sm uppercase tracking-widest mb-8">
            Momentos capturados con luz natural y emoción genuina.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span>SCROLL DOWN</span>
            <div className="w-12 h-px bg-gray-500"></div>
            <span>EXPLORE RIGHT</span>
          </div>
        </div>

        {/* FOTOS */}
        {images.map((img, idx) => (
          <div key={img.id} className="group relative shrink-0 flex flex-col gap-4">
            <div className="w-[85vw] md:w-[45vh] h-[55vh] bg-gray-900 overflow-hidden relative">
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-mono border border-white/20">
                {(idx + 1).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="flex justify-between items-end border-b border-white/20 pb-4 transition-all duration-300 group-hover:border-white">
              <div>
                <h3 className="text-2xl font-light">{img.title}</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">{img.category}</p>
              </div>
              <span className="text-xs font-bold bg-white text-black px-2 py-1">
                {img.year}
              </span>
            </div>
          </div>
        ))}

        {/* TEXTO FINAL */}
        <div className="shrink-0 w-[50vw] md:w-[35vw] flex flex-col items-start justify-center pr-4">
            <h2 className="text-6xl md:text-8xl font-black text-transparent stroke-text leading-tight" style={{ WebkitTextStroke: '2px white' }}>
                CREAMOS<br/>ALGO<br/>JUNTOS?
            </h2>
            <div className="mt-8 flex items-center gap-4 animate-bounce">
                 <span className="text-xl font-mono">VER PAQUETES ABAJO</span>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </div>
      </div>

      {/* CAPA 3: PROGRESO */}
      <div className="absolute bottom-0 left-0 w-full h-20 border-t border-white/10 z-30 flex items-center px-10 bg-[#111]">
        <div className="w-full h-0.5 bg-gray-800 relative overflow-hidden">
            <div 
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-white w-0"
            ></div>
        </div>
        <div className="ml-6 font-mono text-xs whitespace-nowrap text-gray-500">
            SCROLL PROGRESS
        </div>
      </div>
    </section>
  );
};

export default GalleryHorizontal;