import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Home = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        // Mock call for trainings catalog if backend is empty
        const fetchTrainings = async () => {
            try {
                const res = await api.get('/trainings');
                if (res.data && res.data.length > 0) {
                    setTrainings(res.data);
                } else {
                    // Fallback static data for beautiful presentation if DB is empty
                    setTrainings([
                        { id: 1, title: 'Master en Ingénierie des Données', description: 'Une formation académique exhaustive couvrant le Big Data, le Machine Learning et la Business Intelligence.', status: 'Published', category: 'Informatique', duration: '2 Ans' },
                        { id: 2, title: 'Licence Pro en Cybersécurité', description: 'Devenez expert en sécurité des systèmes d\'information et en cryptographie appliquée.', status: 'Published', category: 'Réseaux', duration: '1 An' },
                        { id: 3, title: 'Diplôme U. en Management Innovant', description: 'Maîtrisez les stratégies de leadership moderne et d\'agilité d\'entreprise.', status: 'Published', category: 'Gestion', duration: '6 Mois' },
                        { id: 4, title: 'Master Spécialisé en IA', description: 'Intelligence artificielle avancée, réseaux de neurones et traitement du langage naturel.', status: 'Published', category: 'Informatique', duration: '2 Ans' },
                    ]);
                }
            } catch (err) {
                console.error("Failed fetching trainings", err);
            }
        };
        fetchTrainings();
    }, []);

    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-uni-900 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-uni-800/50 blur-[100px]"></div>
                    <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-uni-500/30 blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center animate-fade-in">
                    <span className="inline-block py-1 px-3 rounded-full bg-uni-800 border border-white/20 text-uni-accent text-sm font-semibold tracking-wider uppercase mb-6 shadow-glass">
                        Formation Continue
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                        Propulsez Votre Carrière<br />Vers De <span className="text-uni-accent">Nouveaux Horizons</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Découvrez nos programmes d'excellence conçus pour les professionnels ambitieux. Rejoignez l'élite universitaire et certifiez vos compétences.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#catalog" className="bg-uni-accent text-uni-900 hover:bg-yellow-400 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-float transition-all duration-300 transform hover:-translate-y-1">
                            Explorer le Catalogue
                        </a>
                    </div>
                </div>
            </div>

            {/* Catalog Section */}
            <div id="catalog" className="container mx-auto px-6 md:px-12 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-uni-900 mb-2">Programmes Disponibles</h2>
                        <p className="text-gray-600">Choisissez la spécialité qui correspond à vos objectifs.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trainings.map((t, index) => (
                        <div
                            key={t.id}
                            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-float-lg transition-all duration-500 transform hover:-translate-y-2 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-uni-500 flex items-center justify-center font-bold text-xl group-hover:bg-uni-500 group-hover:text-white transition-colors duration-300">
                                    {t.title.charAt(0)}
                                </div>
                                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {t.category || 'Formation'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-uni-900 mb-3 line-clamp-2">{t.title}</h3>
                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm">
                                {t.description}
                            </p>

                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <div className="text-sm font-semibold text-gray-900">
                                    <span className="text-gray-400 font-normal mr-2">Durée:</span>
                                    {t.duration || 'N/A'}
                                </div>
                                <Link
                                    to={`/catalog/${t.id}`}
                                    className="text-uni-500 font-bold hover:text-uni-900 transition-colors flex items-center gap-1 group-hover:gap-2"
                                >
                                    Détails <span className="text-xl leading-none">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
