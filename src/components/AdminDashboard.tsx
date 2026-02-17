import React, { useState } from 'react';

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [albums, setAlbums] = useState([
        { id: 1, name: 'Boda Ana y Carlos', code: 'BODA-ANA', date: '2023-10-15', photos: 120 },
        { id: 2, name: 'Sesión Editorial Vogue', code: 'VOGUE-23', date: '2023-11-02', photos: 45 },
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [newAlbumName, setNewAlbumName] = useState('');

    const handleCreateAlbum = (e: React.FormEvent) => {
        e.preventDefault();
        const code = newAlbumName.substring(0, 3).toUpperCase() + '-' + Math.floor(Math.random() * 1000);
        setAlbums([...albums, {
            id: albums.length + 1,
            name: newAlbumName,
            code: code,
            date: new Date().toISOString().split('T')[0],
            photos: 0
        }]);
        setNewAlbumName('');
        setIsCreating(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
                        <p className="text-gray-500">Gestiona tus álbumes y clientes.</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Cerrar Sesión
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-400 text-sm font-medium uppercase">Álbumes Activos</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{albums.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-400 text-sm font-medium uppercase">Total Fotos</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">165</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-400 text-sm font-medium uppercase">Visitas Mes</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">1.2k</p>
                    </div>
                </div>

                {/* Albums List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Tus Álbumes</h2>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            + Nuevo Álbum
                        </button>
                    </div>

                    {isCreating && (
                        <div className="p-6 bg-gray-50 border-b border-gray-100">
                            <form onSubmit={handleCreateAlbum} className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Nombre del Álbum (ej. Boda Sofia)"
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newAlbumName}
                                    onChange={(e) => setNewAlbumName(e.target.value)}
                                    autoFocus
                                    required
                                />
                                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Crear</button>
                                <button type="button" onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-gray-700 font-medium px-4">Cancelar</button>
                            </form>
                        </div>
                    )}

                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Código Acceso</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Fotos</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {albums.map((album) => (
                                <tr key={album.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{album.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold font-mono">
                                            {album.code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{album.date}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{album.photos}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Subir Fotos</button>
                                        <button className="text-red-400 hover:text-red-600 text-sm">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
