import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-uni-accent rounded-lg flex items-center justify-center text-uni-900 font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                        CFC
                    </div>
                    <span className={`text-xl font-serif font-bold tracking-wide ${scrolled ? 'text-white' : 'text-uni-900'}`}>
                        Université
                    </span>
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-uni-accent' : scrolled ? 'text-gray-200 hover:text-white' : 'text-uni-800 hover:text-uni-500'}`}>
                        Catalogue
                    </Link>
                    {user ? (
                        <>
                            <Link
                                to={user.role === 'Candidate' ? '/candidate/dashboard' : '/admin/dashboard'}
                                className={`font-medium transition-colors ${isActive('/candidate/dashboard') || isActive('/admin/dashboard') ? 'text-uni-accent' : scrolled ? 'text-gray-200 hover:text-white' : 'text-uni-800 hover:text-uni-500'}`}
                            >
                                Mon Espace
                            </Link>
                            <button
                                onClick={handleLogout}
                                className={`px-5 py-2 rounded-lg font-semibold transition-all shadow-md transform hover:-translate-y-0.5 ${scrolled ? 'bg-white text-uni-900 hover:bg-gray-100' : 'bg-uni-900 text-white hover:bg-uni-800'}`}
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className={`px-6 py-2 rounded-lg font-semibold transition-all shadow-md transform hover:-translate-y-0.5 ${scrolled ? 'bg-uni-accent text-uni-900 hover:bg-yellow-400' : 'bg-uni-500 text-white hover:bg-uni-700'}`}
                        >
                            Se Connecter
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
