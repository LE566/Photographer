import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';

registerLocale('es', es);

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage: string | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedPackage }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [addOns, setAddOns] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    // Extras disponibles
    const availableAddOns = [
        "Hora extra (+ $100 USD)",
        "Álbum impreso (+ $250 USD)",
        "Sesión previa (+ $150 USD)",
        "Entrega express (+ $100 USD)",
        "Segundo fotógrafo (+ $300 USD)",
        "Video Highlights (3-5 min) (+ $500 USD)",
        "Drone (tomas aéreas) (+ $200 USD)"
    ];

    // Reset internal state when opening fresh
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const toggleAddOn = (addOn: string) => {
        if (addOns.includes(addOn)) {
            setAddOns(addOns.filter(a => a !== addOn));
        } else {
            setAddOns([...addOns, addOn]);
        }
    };

    const handleWhatsAppClick = () => {
        const phone = "5214959024476";
        let text = `Hola Gustavo, quiero reservar el paquete: *${selectedPackage}*.\n`;

        text += `\n👤 Nombre: ${name}`;
        if (startDate) text += `\n📅 Fecha: ${startDate.toLocaleDateString()}`;
        if (email) text += `\n📧 Email: ${email}`;

        if (addOns.length > 0) {
            text += `\n\n✨ Extras:\n- ${addOns.join('\n- ')}`;
        }

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleEmailClick = () => {
        const subject = `Reserva: ${selectedPackage}`;
        let body = `Hola Gustavo, me interesa reservar el paquete: ${selectedPackage}.\n\n`;
        body += `👤 Nombre: ${name}\n`;
        if (startDate) body += `📅 Fecha estimada: ${startDate.toLocaleDateString()}\n`;
        if (email) body += `📧 Mi Email: ${email}\n`;
        if (addOns.length > 0) body += `\n✨ Extras deseados:\n- ${addOns.join('\n- ')}\n`;

        window.location.href = `mailto:contacto@gusvelasco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh] transition-transform duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>

                {/* Header */}
                <div className="bg-[#111] text-white p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-1">Tu Selección</h3>
                    <h2 className="text-2xl font-bold">{selectedPackage}</h2>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">

                    {/* 1. Extras */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Personaliza (Extras)</label>
                        <div className="grid grid-cols-1 gap-2">
                            {availableAddOns.map(addOn => (
                                <label key={addOn} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${addOns.includes(addOn) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                        checked={addOns.includes(addOn)}
                                        onChange={() => toggleAddOn(addOn)}
                                    />
                                    <span className="ml-3 text-sm text-gray-700">{addOn}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 2. Fechas */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Fecha Estimada</label>
                            <div className="relative">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date | null) => setStartDate(date)}
                                    locale="es"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    placeholderText="Selecciona una fecha"
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full"
                                />
                                <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Datos Básicos */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Tu Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ej. Ana García"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Email (Opcional)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="ana@correo.com"
                            />
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-3">
                    <button
                        onClick={handleWhatsAppClick}
                        disabled={!name}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-1 ${!name ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25D366] hover:bg-[#128C7E]'}`}
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        <span>Confirmar en WhatsApp</span>
                    </button>

                    <button
                        onClick={handleEmailClick}
                        disabled={!name}
                        className="w-full py-3 px-6 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <span>Prefiero enviar Email</span>
                    </button>

                    <p className="text-center text-xs text-gray-400">Sin compromiso de compra inmediata.</p>
                </div>

            </div>
        </div>
    );
};

export default BookingModal;
