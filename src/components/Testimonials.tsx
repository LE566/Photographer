import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const reviews = [
        {
            name: "Valeria & Santiago",
            role: "Boda",
            text: "¡Increíble experiencia! Gus logró capturar cada emoción de nuestra boda. Las fotos son simplemente mágicas.",
            stars: 5,
        },
        {
            name: "Marca de Ropa 'Essentials'",
            role: "Editorial",
            text: "Profesionalismo puro. Entendió la identidad de nuestra marca al instante y las fotos elevaron nuestra campaña.",
            stars: 5,
        },
        {
            name: "Carlos Méndez",
            role: "Retrato",
            text: "Nunca me había sentido tan cómodo frente a una cámara. El resultado superó mis expectativas por mucho.",
            stars: 5,
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current?.querySelectorAll('.review-card');

            if (cards) {
                gsap.fromTo(cards,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Lo que dicen mis clientes</h2>
                    <p className="mt-4 text-lg text-gray-500">Historias reales detrás de las fotos.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="review-card bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                            {/* Comillas decorativas */}
                            <div className="absolute top-4 right-6 text-6xl text-gray-200 font-serif leading-none">"</div>

                            <div className="flex mb-4">
                                {[...Array(review.stars)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 italic mb-6 relative z-10">"{review.text}"</p>

                            <div>
                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                <p className="text-sm text-blue-600 font-medium">{review.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
