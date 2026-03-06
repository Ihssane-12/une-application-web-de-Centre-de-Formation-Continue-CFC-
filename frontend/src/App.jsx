import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';

// Pages
import Home from './pages/public/Home';
import TrainingDetails from './pages/public/TrainingDetails';
import Login from './pages/public/Login';
import CandidateDashboard from './pages/candidate/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Chargement...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col font-sans">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog/:id" element={<TrainingDetails />} />
                        <Route path="/login" element={<Login />} />

                        {/* Candidate Routes */}
                        <Route
                            path="/candidate/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['Candidate', 'SuperAdmin']}>
                                    <CandidateDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin/Coordinator Routes */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['EstablishmentAdmin', 'Coordinator', 'SuperAdmin']}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
