import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';

// Registramos el idioma español para el calendario
registerLocale('es', es);

interface ContactProps {
  preSelectedPackage?: string;
}

const Contact = ({ preSelectedPackage }: ContactProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efecto para autocompletar el mensaje si viene de un paquete
  useEffect(() => {
    if (preSelectedPackage) {
      setMessage(`Hola Gustavo, estoy muy interesado en reservar el paquete "${preSelectedPackage}". Me gustaría consultar disponibilidad para...`);
    }
  }, [preSelectedPackage]);

  // Fechas ocupadas (Ejemplo)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const bookedDates = [tomorrow, nextWeek];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      alert(`¡Gracias! Solicitud enviada para: ${preSelectedPackage || 'Consulta General'} \nFecha: ${startDate?.toLocaleDateString()}`);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
            Hablemos de tu Proyecto
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            ¿Listo para crear algo memorable? Cuéntame tu idea y hagamos magia juntos.
          </p>
        </div>

        {/* Contenedor Principal con Sombra y Bordes Redondeados */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
          
          {/* COLUMNA IZQUIERDA: Información y FAQs (Fondo Oscuro) */}
          <div className="lg:w-2/5 bg-[#111] text-white p-10 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            
            {/* Elemento decorativo de fondo */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-white">Información de Contacto</h3>
              <p className="text-gray-400 mb-8 font-light">
                Respondo generalmente en menos de 24 horas. Si es una urgencia, por favor contáctame vía WhatsApp.
              </p>

              {/* Datos de Contacto con Iconos SVG */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="ml-4 text-base text-gray-300">
                    <p>contacto@gusvelasco.com</p>
                    <p className="text-sm text-gray-500 mt-1">Consultas generales</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div className="ml-4 text-base text-gray-300">
                    <p>+52 (55) 1234 5678</p>
                    <p className="text-sm text-gray-500 mt-1">Lunes a Viernes, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="ml-4 text-base text-gray-300">
                    <p>Ciudad de México, MX</p>
                    <p className="text-sm text-gray-500 mt-1">Disponible para viajar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini FAQ */}
            <div className="mt-12 pt-8 border-t border-gray-800 relative z-10">
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Preguntas Frecuentes</h4>
                <div className="space-y-4 text-sm text-gray-400">
                    <div>
                        <p className="text-white font-medium">¿Con cuánta anticipación debo reservar?</p>
                        <p>Recomiendo al menos 3 semanas antes para asegurar la fecha.</p>
                    </div>
                    <div>
                        <p className="text-white font-medium">¿Entregas fotos editadas?</p>
                        <p>Sí, todas las fotos seleccionadas pasan por un proceso de edición profesional.</p>
                    </div>
                </div>
            </div>
            
            {/* Redes Sociales */}
            <div className="mt-8 flex space-x-6">
                {/* Instagram Icon */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario (Fondo Blanco) */}
          <div className="lg:w-3/5 p-10 sm:p-12 bg-white flex flex-col justify-center">
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Notificación de Paquete Seleccionado - Estilo Ticket */}
              {preSelectedPackage && (
                <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm flex items-start animate-fade-in-down">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Estás solicitando el paquete: <span className="font-bold block text-lg">{preSelectedPackage}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:bg-white" 
                    placeholder="Ej. Ana García" 
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:bg-white" 
                    placeholder="ana@correo.com" 
                  />
                </div>
              </div>

              {/* Fecha y Teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha Estimada</label>
                  <div className="relative">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      locale="es"
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      excludeDates={bookedDates}
                      placeholderText="Selecciona día"
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:bg-white cursor-pointer"
                      wrapperClassName="w-full"
                    />
                    {/* Icono Calendario absoluto */}
                    <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                   <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Teléfono (Opcional)</label>
                   <input 
                    type="tel" 
                    id="phone" 
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:bg-white" 
                    placeholder="+52 55..." 
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Cuéntame los detalles</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:bg-white resize-none" 
                  placeholder="Tipo de evento, lugar, ideas específicas..."
                ></textarea>
              </div>
              
              {/* Botón Submit */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-bold py-4 px-6 rounded-xl transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center
                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#111] hover:bg-black text-white hover:shadow-xl'}
                `}
              >
                {isSubmitting ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                    </span>
                ) : (
                    "Enviar Mensaje"
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;