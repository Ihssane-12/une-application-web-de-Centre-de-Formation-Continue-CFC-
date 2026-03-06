import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const TrainingDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [training, setTraining] = useState(null);

    useEffect(() => {
        // Mock fetch for training details
        // For demo purposes we simulate a realistic response
        setTraining({
            id,
            title: 'Master en Ingénierie des Données',
            description: 'Une formation académique exhaustive couvrant le Big Data, le Machine Learning et la Business Intelligence. Ce programme de 2 ans est conçu pour vous préparer aux métiers de data scientist et data engineer, très recherchés sur le marché.',
            objectives: [
                "Maîtriser les écosystèmes Hadoop et Spark",
                "Concevoir des architectures décisionnelles",
                "Appliquer le Deep Learning aux problèmes métiers"
            ],
            status: 'Published',
            category: 'Informatique',
            duration: '2 Ans',
            startDate: '1 Octobre 2026',
            registrationOpen: true
        });
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            // API call to pre-register
            await api.post('/applications', { trainingId: id });
            navigate('/candidate/dashboard'); // send them to dashboard where they can upload docs
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la candidature.");
        }
    };

    if (!training) return <div className="pt-32 text-center">Chargement...</div>;

    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            {/* Header Banner */}
            <div className="bg-uni-900 text-white py-16">
                <div className="container mx-auto px-6 md:px-12">
                    <Link to="/" className="text-gray-400 hover:text-white mb-6 inline-block font-medium">&larr; Retour au catalogue</Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="max-w-3xl">
                            <span className="bg-uni-accent/20 text-uni-accent px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4 inline-block">
                                {training.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{training.title}</h1>
                            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                                <span>⏱ Durée: <strong className="text-white">{training.duration}</strong></span>
                                <span>📅 Début: <strong className="text-white">{training.startDate}</strong></span>
                            </div>
                        </div>

                        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md text-center shrink-0 w-full md:w-64">
                            <div className="text-sm text-gray-300 mb-2">Statut des Inscriptions</div>
                            {training.registrationOpen ? (
                                <>
                                    <div className="text-green-400 font-bold text-xl mb-4 flex items-center justify-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span> Ouvertes
                                    </div>
                                    <button
                                        onClick={handleApply}
                                        className="w-full bg-uni-accent text-uni-900 font-bold py-3 rounded-xl hover:bg-yellow-400 shadow-lg hover:shadow-float transition"
                                    >
                                        Postuler Maintenant
                                    </button>
                                </>
                            ) : (
                                <div className="text-red-400 font-bold text-xl mb-2">Fermées</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-serif font-bold text-uni-900 mb-4">Description du Programme</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {training.description}
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-serif font-bold text-uni-900 mb-6">Objectifs de formation</h2>
                        <ul className="space-y-4">
                            {training.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1 bg-blue-50 text-uni-500 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                        &check;
                                    </div>
                                    <span className="text-gray-700 text-lg">{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <h3 className="font-bold text-uni-900 text-lg mb-4 text-center">Besoin d'aide ?</h3>
                        <p className="text-gray-600 text-sm text-center mb-6">Le coordinateur pédagogique est disponible pour répondre à vos questions concernant ce programme.</p>
                        <button className="w-full btn-secondary py-2 border-uni-500 text-uni-500 hover:bg-uni-50">
                            Contacter le Coordinateur
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingDetails;
