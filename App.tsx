
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FreelancersPage from './pages/FreelancersPage';
import ProductsPage from './pages/ProductsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FreelancerProfilePage from './pages/FreelancerProfilePage';
import CommunicationPage from './pages/CommunicationPage';
import FreelancerDashboardPage from './pages/FreelancerDashboardPage';
import AuthModal from './components/auth/AuthModal';
import ProductDetailModal from './components/ProductDetailModal';
import AIChatPopup from './components/AIChatPopup';
import { getCurrentUser, logoutUser, User } from './services/authService';
import { freelancersData } from './data/mockData';
import { productsData } from './data/mockData';
import type { Freelancer, Product } from './types';

export type Page = 'home' | 'freelancers' | 'products' | 'how-it-works' | 'freelancer-profile' | 'communication' | 'dashboard';

const App: React.FC = () => {
    // State management
    const [page, setPage] = useState<Page>('home');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authModalView, setAuthModalView] = useState<string | null>(null);
    const [selectedFreelancerId, setSelectedFreelancerId] = useState<number | null>(null);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);

    // Effect to check for current user on initial load
    useEffect(() => {
        setCurrentUser(getCurrentUser());
    }, []);

    // Navigation handler
    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    // Auth handlers
    const handleAuthClick = (view: string) => setAuthModalView(view);
    const handleCloseAuth = () => setAuthModalView(null);
    const handleLoginSuccess = (user: User) => {
        setCurrentUser(user);
        setAuthModalView(null);
        if(user.type === 'freelancer') {
            handleNavigate('dashboard');
        }
    };
    const handleLogout = () => {
        logoutUser();
        setCurrentUser(null);
        handleNavigate('home');
    };

    // Detail page handlers
    const handleSelectFreelancer = (id: number) => {
        setSelectedFreelancerId(id);
        handleNavigate('freelancer-profile');
    };
    const handleStartCommunication = (id: number) => {
        setSelectedFreelancerId(id);
        handleNavigate('communication');
    };
    const handleSelectProduct = (id: number) => {
        setSelectedProductId(id);
    };

    // Render logic
    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage onHireTalentClick={() => handleNavigate('freelancers')} onStartNowClick={() => handleAuthClick('auth-choice-view')} />;
            case 'freelancers':
                return <FreelancersPage onSelectFreelancer={handleSelectFreelancer} />;
            case 'products':
                return <ProductsPage onSelectProduct={handleSelectProduct} />;
            case 'how-it-works':
                return <HowItWorksPage />;
            case 'freelancer-profile':
                const freelancer = freelancersData.find(f => f.id === selectedFreelancerId);
                return freelancer ? <FreelancerProfilePage freelancer={freelancer} onStartCommunication={handleStartCommunication} /> : <p>Freelancer not found.</p>;
            case 'communication':
                 const commsFreelancer = freelancersData.find(f => f.id === selectedFreelancerId);
                return commsFreelancer ? <CommunicationPage freelancer={commsFreelancer} onBackToProfile={() => handleNavigate('freelancer-profile')} /> : <p>Freelancer not found.</p>;
            case 'dashboard':
                 return currentUser && currentUser.type === 'freelancer' ? <FreelancerDashboardPage user={currentUser} onNavigate={handleNavigate} /> : <p>Access Denied</p>;
            default:
                return <HomePage onHireTalentClick={() => handleNavigate('freelancers')} onStartNowClick={() => handleAuthClick('auth-choice-view')} />;
        }
    };
    
    const selectedProduct = productsData.find(p => p.id === selectedProductId);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-cairo" dir="rtl">
            <Navbar 
                page={page} 
                onNavigate={handleNavigate} 
                onAuthClick={handleAuthClick}
                currentUser={currentUser}
                onLogout={handleLogout}
                onStartCommunication={handleStartCommunication}
            />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer page={page} onNavigate={handleNavigate} />

            {/* AI Chat Popup Button */}
            {page !== 'dashboard' && !isAiChatOpen && (
                <button 
                    onClick={() => setIsAiChatOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--secondary)] text-white rounded-full shadow-2xl flex items-center justify-center text-3xl z-40 transition-transform duration-300 hover:scale-110 animate-[bounceIn_0.5s_ease-out]"
                >
                    <i className="fas fa-robot"></i>
                </button>
            )}

            {isAiChatOpen && <AIChatPopup onClose={() => setIsAiChatOpen(false)} />}
            
            {authModalView && (
                <AuthModal 
                    initialView={authModalView}
                    onClose={handleCloseAuth}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
            
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProductId(null)}
                />
            )}
        </div>
    );
};

export default App;
