import React, { useState, useEffect } from 'react';
import type { Page } from '../App';
import type { User } from '../services/authService';
import { notificationsData } from '../data/mockData';
import type { Notification } from '../types';
import Avatar from './dashboard/Avatar';


interface NavbarProps {
    page: Page;
    onNavigate: (page: Page) => void;
    onAuthClick: (view: string) => void;
    currentUser: User | null;
    onLogout: () => void;
    onStartCommunication: (id: number) => void;
}

const NavLink: React.FC<{
    pageName: Page;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}> = ({ pageName, currentPage, onNavigate, children }) => (
    <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate(pageName); }}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
            currentPage === pageName
                ? 'bg-[var(--primary-lightest)] text-[var(--primary-dark)]'
                : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {children}
    </a>
);

const UserMenu: React.FC<{ user: User, onLogout: () => void, onNavigate: (page: Page) => void, onStartCommunication: (id: number) => void }> = ({ user, onLogout, onNavigate, onStartCommunication }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    
    const unreadCount = notificationsData.filter(n => !n.read).length;

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
        setIsNotificationsOpen(false);
    };

    const toggleNotifications = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsNotificationsOpen(!isNotificationsOpen);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const closeDropdowns = () => {
            setIsMenuOpen(false);
            setIsNotificationsOpen(false);
        };
        if (isMenuOpen || isNotificationsOpen) {
            window.addEventListener('click', closeDropdowns);
        }
        return () => window.removeEventListener('click', closeDropdowns);
    }, [isMenuOpen, isNotificationsOpen]);


    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <button onClick={toggleNotifications} className="text-gray-600 hover:text-[var(--primary-dark)] text-xl transition-colors">
                    <i className="fas fa-bell"></i>
                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">{unreadCount}</span>}
                </button>
                {isNotificationsOpen && (
                    <div onClick={(e) => e.stopPropagation()} className="absolute left-0 mt-3 w-80 bg-white rounded-lg shadow-xl z-50 animate-[fadeIn_0.2s_ease-out]">
                        <div className="p-3 font-bold border-b">الإشعارات</div>
                        <div className="max-h-80 overflow-y-auto">
                            {notificationsData.map((n: Notification) => {
                                const isClickable = user.type === 'client' && !!n.freelancerId;
                                return (
                                    <div
                                        key={n.id}
                                        onClick={isClickable ? (e) => {
                                            e.preventDefault();
                                            setIsNotificationsOpen(false);
                                            onStartCommunication(n.freelancerId!);
                                        } : undefined}
                                        className={`flex items-center gap-3 p-3 border-b last:border-b-0 ${isClickable ? 'cursor-pointer hover:bg-gray-100' : ''} ${!n.read ? 'bg-blue-50' : ''}`}
                                    >
                                        {n.avatar && typeof n.avatar === 'object' ? <Avatar src={n.avatar} name={n.from} size={40} /> : n.avatar ? <Avatar src={n.avatar as string} name={n.from} size={40} /> : <img src={n.image} alt={n.from} className="w-10 h-10 rounded-full" />}
                                        <div className="flex-grow">
                                            <p className="text-sm"><span className="font-bold">{n.from}</span>: {n.message}</p>
                                            <p className="text-xs text-gray-500">{n.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative">
                <button onClick={toggleMenu} className="flex items-center gap-2">
                    <Avatar src={user.avatar} name={user.name || user.email} size={40} />
                </button>
                {isMenuOpen && (
                     <div onClick={(e) => e.stopPropagation()} className="absolute left-0 mt-3 w-56 bg-white rounded-lg shadow-xl z-50 animate-[fadeIn_0.2s_ease-out]">
                        <div className="p-4 border-b">
                            <div className="font-bold truncate">{user.name}</div>
                            <div className="text-sm text-gray-500 capitalize">{user.type === 'client' ? 'زبون' : 'مستقل'}</div>
                        </div>
                        <div className="py-2">
                            {user.type === 'freelancer' && <a href="#" onClick={(e) => {e.preventDefault(); onNavigate('dashboard')}} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">لوحة التحكم</a>}
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">الملف الشخصي</a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">الإعدادات</a>
                        </div>
                        <div className="border-t">
                            <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block w-full text-right px-4 py-2 text-red-600 hover:bg-red-50">تسجيل الخروج</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const Navbar: React.FC<NavbarProps> = ({ page, onNavigate, onAuthClick, currentUser, onLogout, onStartCommunication }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const mainPages: Page[] = ['home', 'freelancers', 'products', 'how-it-works'];

    if (page === 'dashboard') {
        return null; // Don't render Navbar on dashboard page
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    <div className="hidden md:flex items-center gap-6">
                         <nav className="flex items-center space-x-2">
                            {mainPages.map(p => (
                                <NavLink key={p} pageName={p} currentPage={page} onNavigate={onNavigate}>
                                    {
                                        { 'home': 'الرئيسية', 'freelancers': 'المستقلون', 'products': 'المنتجات', 'how-it-works': 'كيف نعمل' }[p]
                                    }
                                </NavLink>
                            ))}
                        </nav>
                        
                        <div className="flex items-center">
                            {currentUser ? (
                                <UserMenu user={currentUser} onLogout={onLogout} onNavigate={onNavigate} onStartCommunication={onStartCommunication} />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => onAuthClick('login-view')} className="px-5 py-2 rounded-full font-semibold text-[var(--primary-dark)] hover:bg-gray-100 transition-colors">تسجيل الدخول</button>
                                    <button onClick={() => onAuthClick('auth-choice-view')} className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white hover:opacity-90 transition-opacity">حساب جديد</button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="block">
                           <img className="h-12 w-auto rounded-lg" src="https://i.ibb.co/FqCkWMNC/photo-2025-09-17-12-03-57.jpg" alt="SaaHla Logo" />
                        </a>
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 text-2xl">
                           <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-2 animate-[fadeIn_0.3s_ease-out]">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); setIsMobileMenuOpen(false); }} className="block px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-gray-100">الرئيسية</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('freelancers'); setIsMobileMenuOpen(false); }} className="block px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-gray-100">المستقلون</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); setIsMobileMenuOpen(false); }} className="block px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-gray-100">المنتجات</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('how-it-works'); setIsMobileMenuOpen(false); }} className="block px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-gray-100">كيف نعمل</a>
                    <div className="border-t pt-4 space-y-2">
                         {currentUser ? (
                            <>
                                <div className="px-4 py-2 font-semibold">{currentUser.name}</div>
                                <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-right px-4 py-2 text-red-600 hover:bg-red-50 rounded-md">تسجيل الخروج</a>
                            </>
                        ) : (
                            <>
                                <button onClick={() => {onAuthClick('login-view'); setIsMobileMenuOpen(false);}} className="w-full text-right px-4 py-2 rounded-md font-semibold text-[var(--primary-dark)] hover:bg-gray-100 transition-colors">تسجيل الدخول</button>
                                <button onClick={() => {onAuthClick('auth-choice-view'); setIsMobileMenuOpen(false);}} className="w-full text-right px-4 py-2 mt-2 rounded-md font-semibold bg-[var(--primary-dark)] text-white hover:bg-opacity-90 transition-opacity">حساب جديد</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;