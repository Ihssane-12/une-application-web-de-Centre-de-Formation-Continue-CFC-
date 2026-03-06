import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Mock fetch candidate's applications
        const fetchApps = async () => {
            try {
                const res = await api.get('/applications');
                setApplications(res.data.filter(a => a.candidateId === user.id) || []);
            } catch (err) {
                // Fallback for UI demonstration if DB isn't running
                setApplications([
                    { id: 'APP-2026-001', trainingId: 1, title: 'Master en Ingénierie des Données', status: 'UnderReview', submittedOn: '2026-03-01' },
                    { id: 'APP-2026-004', trainingId: 3, title: 'Diplôme U. en Management Innovant', status: 'Accepted', submittedOn: '2026-02-15' },
                ]);
            }
        };

        if (user?.id) fetchApps();
        else {
            // Dummy data for design view if not logged in via real backend
            setApplications([
                { id: 'APP-2026-001', trainingId: 1, title: 'Master en Ingénierie des Données', status: 'UnderReview', submittedOn: '2026-03-01' },
            ]);
        }
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'bg-green-100 text-green-800 border border-green-200';
            case 'Rejected': return 'bg-red-100 text-red-800 border border-red-200';
            case 'UnderReview': return 'bg-purple-100 text-purple-800 border border-purple-200';
            case 'FileSubmitted': return 'bg-blue-100 text-blue-800 border border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'Accepted': return 'Accepté';
            case 'Rejected': return 'Refusé';
            case 'UnderReview': return 'En Cours d\'Étude';
            case 'FileSubmitted': return 'Dossier Soumis';
            case 'PreRegistered': return 'Préinscrit';
            default: return status;
        }
    };

    return (
        <div className="bg-background min-h-screen pt-28 pb-12 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Dashboard Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-uni-500 to-uni-700 text-white flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
                            {user?.email ? user.email.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-uni-900 mb-2">Espace Candidat</h1>
                            <p className="text-gray-600 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Connecté en tant que: <strong className="text-gray-900">{user?.email || 'Étudiant'}</strong>
                            </p>
                        </div>
                    </div>
                    <Link to="/" className="btn-secondary flex items-center gap-2">
                        <span>+</span> Nouvelle Candidature
                    </Link>
                </div>

                {/* Action Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-uni-900 to-uni-800 text-white p-6 rounded-2xl shadow-float flex flex-col justify-between h-40">
                        <div className="text-uni-accent font-medium tracking-wider text-sm uppercase">Candidatures Actives</div>
                        <div className="text-5xl font-bold font-serif">{applications.length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center h-40">
                        <div className="text-gray-500 font-medium mb-1">Dossier Administratif</div>
                        <div className="text-xl font-bold text-uni-900 mb-4">Complet à 100%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-xl font-serif font-bold text-uni-900">Historique des Demandes</h2>
                    </div>

                    {applications.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                                        <th className="p-6 font-semibold">Réf.</th>
                                        <th className="p-6 font-semibold">Programme de Formation</th>
                                        <th className="p-6 font-semibold">Date de Soumission</th>
                                        <th className="p-6 font-semibold">Statut</th>
                                        <th className="p-6 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {applications.map((app, index) => (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-6 text-gray-500 font-mono text-sm">{app.id}</td>
                                            <td className="p-6">
                                                <div className="font-bold text-uni-900 mb-1">{app.title || `Programme #${app.trainingId}`}</div>
                                                <div className="text-xs text-gray-500">Formation Continue</div>
                                            </td>
                                            <td className="p-6 text-gray-600">{app.submittedOn}</td>
                                            <td className="p-6">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm ${getStatusColor(app.status)}`}>
                                                    {getStatusLabel(app.status)}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button className="text-uni-500 font-semibold hover:text-uni-800 transition-colors px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg">
                                                    Consulter
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16 px-6">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-gray-400 text-3xl">📭</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune candidature trouvée</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">Vous n'avez pas encore soumis de dossier de candidature pour cette année universitaire.</p>
                            <Link to="/" className="btn-primary">
                                Parcourir les Formations
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
