import React, { useState, useEffect } from 'react';
import LoginView from './LoginView';
import RegisterChoiceView from './RegisterChoiceView';
import ClientRegisterView from './ClientRegisterView';
import FreelancerRegisterView from './FreelancerRegisterView';
import { User } from '../../services/authService';

type AuthView = 'auth-choice-view' | 'login-view' | 'register-choice-view' | 'client-register-view' | 'freelancer-register-view';

interface AuthModalProps {
    initialView: string;
    onClose: () => void;
    onLoginSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ initialView, onClose, onLoginSuccess }) => {
    const [activeView, setActiveView] = useState<AuthView>(initialView as AuthView);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 400);
    };

    const switchView = (view: AuthView) => {
        setActiveView(view);
    };

    return (
        <div className={`fixed inset-0 bg-gray-100 z-[1000] flex justify-center items-center overflow-y-auto transition-opacity duration-400 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex overflow-hidden m-4 transition-transform duration-500 ${isExiting ? 'scale-95' : 'scale-100'}`}>
                <div className="flex-1 p-12 relative flex flex-col justify-center">
                    <button onClick={handleClose} className="absolute top-6 right-6 text-gray-500 hover:text-[var(--primary-dark)] transition-colors">
                        <i className="fas fa-times text-xl"></i>
                    </button>

                    {activeView === 'auth-choice-view' && (
                        <div>
                            <h1 className="text-3xl font-bold mb-4 text-[var(--primary-dark)]">مرحباً بك في SaaHla</h1>
                            <p className="text-gray-600 mb-8">اختر ما تريد القيام به للمتابعة.</p>
                            <div className="space-y-4">
                                <button onClick={() => switchView('login-view')} className="w-full text-lg font-bold py-3 rounded-lg transition-all duration-300 ease-in-out bg-[var(--primary-dark)] text-white hover:bg-[#1c347a]">تسجيل الدخول</button>
                                <button onClick={() => switchView('register-choice-view')} className="w-full text-lg font-bold py-3 rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white hover:opacity-90">إنشاء حساب جديد</button>
                            </div>
                        </div>
                    )}
                    
                    {activeView === 'register-choice-view' && <RegisterChoiceView onChoice={switchView} onBack={() => switchView('auth-choice-view')} />}
                    {activeView === 'login-view' && <LoginView onLoginSuccess={onLoginSuccess} onSwitchToRegister={() => switchView('auth-choice-view')} />}
                    {activeView === 'client-register-view' && <ClientRegisterView onRegisterSuccess={onLoginSuccess} onBack={() => switchView('register-choice-view')} />}
                    {activeView === 'freelancer-register-view' && <FreelancerRegisterView onRegisterSuccess={onLoginSuccess} onBack={() => switchView('register-choice-view')} />}

                </div>
                <div className="flex-1 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--secondary)] text-white hidden md:flex flex-col justify-center items-center text-center p-12">
                    <img src="https://i.ibb.co/FqCkWMNC/photo-2025-09-17-12-03-57.jpg" alt="SaaHla Logo" className="h-16 w-auto mb-6 rounded-lg" />
                    <h2 className="text-3xl font-bold mb-4">انضم إلى مجتمعنا</h2>
                    <p className="text-lg opacity-80">أكبر منصة للعمل الحر في الجزائر تجمع بين أفضل المستقلين وأصحاب المشاريع.</p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;