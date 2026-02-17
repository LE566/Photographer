import React, { useState } from 'react';

interface ClientAccessProps {
    onLogin: (code: string) => void;
}

const ClientAccess: React.FC<ClientAccessProps> = ({ onLogin }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim().toUpperCase() === 'ADMIN') {
            onLogin('ADMIN');
        } else if (code.trim().length > 3) {
            // Mock validation: any code longer than 3 chars works for now
            onLogin(code);
        } else {
            setError('Código inválido. Intenta de nuevo.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Área de Clientes
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Ingresa el código de tu álbum para acceder a tus fotos.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="code" className="sr-only">Código de Acceso</label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm text-center tracking-widest uppercase text-xl"
                                placeholder="CÓDIGO"
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value.toUpperCase());
                                    setError('');
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Entrar a la Galería
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-xs text-gray-400">
                        ¿Eres Gus? Ingresa tu código de administrador.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClientAccess;
