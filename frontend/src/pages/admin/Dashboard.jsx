import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    // Mock administrative stats
    const stats = [
        { label: 'Formations Publiées', value: '12', trend: '+2 ce mois' },
        { label: 'Dossiers en Attente', value: '45', trend: 'Urgent: 8', highlight: true },
        { label: 'Candidats Inscrits', value: '320', trend: '+15% vs N-1' },
        { label: 'Taux d\'Acceptation', value: '42%', trend: 'Stable' },
    ];

    const recentApps = [
        { id: 'APP-092', candidate: 'Fatima Z.', program: 'Master Data Engineering', date: 'Aujourd\'hui', status: 'UnderReview' },
        { id: 'APP-091', candidate: 'Youssef B.', program: 'Licence Pro Cyber', date: 'Aujourd\'hui', status: 'UnderReview' },
        { id: 'APP-089', candidate: 'Amina K.', program: 'Master Data Engineering', date: 'Hier', status: 'Accepted' },
        { id: 'APP-085', candidate: 'Rachid M.', program: 'DU Management', date: 'Il y a 2 jours', status: 'Rejected' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-28 pb-12 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-uni-900 mb-2">Tableau de Bord Administration</h1>
                        <p className="text-gray-600">Bienvenue, {user?.role || 'Admin'} - Gestion des Inscriptions</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn-secondary border-gray-300">Générer Rapport</button>
                        <button className="btn-primary">Nouvelle Formation</button>
                    </div>
                </div>

                {/* Global KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <div key={i} className={`p-6 rounded-2xl shadow-sm border ${stat.highlight ? 'bg-uni-900 text-white border-uni-800 shadow-float' : 'bg-white border-gray-100'}`}>
                            <div className={`text-sm font-semibold mb-3 tracking-wide ${stat.highlight ? 'text-uni-accent' : 'text-gray-500'}`}>
                                {stat.label}
                            </div>
                            <div className="text-4xl font-serif font-bold mb-2">
                                {stat.value}
                            </div>
                            <div className={`text-xs p-1.5 rounded inline-block ${stat.highlight ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                {stat.trend}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout for Grids */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Table: Applications Workflow */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-uni-900">Dossiers Récents à Traiter</h2>
                            <button className="text-sm text-uni-500 font-semibold hover:underline">Voir Tout &rarr;</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                                        <th className="px-6 py-4 font-semibold">Candidat</th>
                                        <th className="px-6 py-4 font-semibold">Programme</th>
                                        <th className="px-6 py-4 font-semibold">Soumis</th>
                                        <th className="px-6 py-4 font-semibold">Décision</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {recentApps.map((app, i) => (
                                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{app.candidate}</div>
                                                <div className="text-xs text-gray-500 font-mono">{app.id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">{app.program}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{app.date}</td>
                                            <td className="px-6 py-4">
                                                {app.status === 'UnderReview' ? (
                                                    <div className="flex gap-2">
                                                        <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded text-xs font-bold transition">Accepter</button>
                                                        <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded text-xs font-bold transition">Refuser</button>
                                                    </div>
                                                ) : (
                                                    <span className={`px-3 py-1 rounded text-xs font-bold ${app.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {app.status === 'Accepted' ? 'Validé' : 'Rejeté'}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions / Alerts */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-uni-900 text-lg mb-4">Actions Rapides</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border border-gray-200 transition-colors flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex justify-center items-center">📚</div>
                                    <div className="font-semibold text-gray-800">Catalogue Formations</div>
                                </button>
                                <button className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border border-gray-200 transition-colors flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-yellow-100 text-yellow-600 flex justify-center items-center">⏳</div>
                                    <div className="font-semibold text-gray-800">Gérer Périodes d'Inscription</div>
                                </button>
                                <button className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border border-gray-200 transition-colors flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex justify-center items-center">👥</div>
                                    <div className="font-semibold text-gray-800">Assigner Coordinateurs</div>
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-tr from-uni-800 to-uni-700 rounded-2xl shadow-float p-6 text-white">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                                <span>⚠️</span> Campagne 2026-2027
                            </h3>
                            <p className="text-gray-300 text-sm mb-4">La clôture des préinscriptions pour le cycle Master est prévue dans 5 jours.</p>
                            <button className="bg-white/20 hover:bg-white/30 text-white w-full py-2 rounded-lg text-sm font-semibold transition">
                                Gérer la campagne
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
