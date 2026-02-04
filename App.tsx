
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import FreelancersPage from './pages/FreelancersPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import HowItWorksPage from './pages/HowItWorksPage.tsx';
import FreelancerProfilePage from './pages/FreelancerProfilePage.tsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage.tsx';
import CommunicationPage from './pages/CommunicationPage.tsx';
import FreelancerDashboardPage from './pages/FreelancerDashboardPage.tsx';
import AuthModal from './components/auth/AuthModal.tsx';
import ProductDetailModal from './components/ProductDetailModal.tsx';
import AIChatPopup from './components/AIChatPopup.tsx';
import { getCurrentUser, logoutUser, User } from './services/authService.ts';
import { productsData } from './data/mockData.ts';
import { getFreelancerById } from './services/freelancerService.ts';
import { getFreelancerPortfolio } from './services/portfolioService.ts';
import type { Freelancer, Product, PortfolioItem } from './types.ts';

export type Page = 'home' | 'freelancers' | 'products' | 'how-it-works' | 'freelancer-profile' | 'project-details' | 'communication' | 'dashboard';

const App: React.FC = () => {
    // State management
    const [page, setPage] = useState<Page>('home');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authModalView, setAuthModalView] = useState<string | null>(null);
    const [selectedFreelancerId, setSelectedFreelancerId] = useState<number | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);

    // Effect to check for current user on initial load
    useEffect(() => {
        setCurrentUser(getCurrentUser());
    }, []);

    // Navigation handler
    const handleNavigate = (page: Page) => {
        setPage(page);
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

    const handleSelectProject = (projectId: string) => {
        setSelectedProjectId(projectId);
        handleNavigate('project-details');
    };

    const handleStartCommunication = (id: number) => {
        if (currentUser) {
            setSelectedFreelancerId(id);
            handleNavigate('communication');
        } else {
            handleAuthClick('auth-choice-view');
        }
    };
    const handleSelectProduct = (id: number) => {
        setSelectedProductId(id);
    };
    
    const handlePurchaseAttempt = () => {
        if (!currentUser) {
            setSelectedProductId(null); // Close product modal before showing auth
            handleAuthClick('auth-choice-view');
        } else {
            alert('تمت الإضافة إلى السلة بنجاح! (وظيفة تجريبية)');
        }
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
                const freelancer = selectedFreelancerId ? getFreelancerById(selectedFreelancerId) : null;
                return freelancer ? <FreelancerProfilePage freelancer={freelancer} onSelectProject={handleSelectProject} onStartCommunication={handleStartCommunication} /> : <div className="p-20 text-center"><p>عذراً، المستقل غير موجود.</p><button onClick={() => handleNavigate('freelancers')} className="text-blue-500 underline mt-4">العودة لقائمة المستقلين</button></div>;
            case 'project-details':
                if (!selectedFreelancerId || !selectedProjectId) return <p>Project not found.</p>;
                const pFreelancer = getFreelancerById(selectedFreelancerId);
                const portfolio = getFreelancerPortfolio(selectedFreelancerId);
                const project = portfolio.find(p => p.id === selectedProjectId);
                return (pFreelancer && project) ? <ProjectDetailsPage project={project} freelancer={pFreelancer} onBack={() => handleNavigate('freelancer-profile')} /> : <p>Project not found.</p>;
            case 'communication':
                 const commsFreelancer = selectedFreelancerId ? getFreelancerById(selectedFreelancerId) : null;
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
                    onPurchaseAttempt={handlePurchaseAttempt}
                />
            )}
        </div>
    );
};

export default App;
