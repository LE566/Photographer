import React, { useState } from 'react';

interface ClientGalleryProps {
    albumCode: string;
    onLogout: () => void;
}

const ClientGallery: React.FC<ClientGalleryProps> = ({ albumCode, onLogout }) => {
    // Mock Data
    const mockImages = [
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511285560982-1356c11d4606?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520854221256-17451cc330e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522673607200-1645062ac2d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505932794465-14a5192092d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ];

    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Álbum: {albumCode}</h1>
                    <p className="text-gray-500 mt-1">{mockImages.length} Fotografías</p>
                </div>
                <div className="flex space-x-4 mt-4 sm:mt-0">
                    <button
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        onClick={() => alert("Descargando todas las fotos... (Simulación)")}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Descargar Todo
                    </button>
                    <button
                        className="text-gray-400 hover:text-gray-900 text-sm font-medium"
                        onClick={onLogout}
                    >
                        Salir
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockImages.map((src, index) => (
                    <div
                        key={index}
                        className="relative group aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                        onClick={() => setLightboxImage(src)}
                    >
                        <img
                            src={src}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/50 hover:text-white"
                        onClick={() => setLightboxImage(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    <img
                        src={lightboxImage}
                        alt="Full size"
                        className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                        onClick={(e) => {
                            e.stopPropagation();
                            alert("Descargando imagen...");
                        }}
                    >
                        Descargar esta foto
                    </button>
                </div>
            )}

        </div>
    );
};

export default ClientGallery;
