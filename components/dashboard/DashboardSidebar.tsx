import React from 'react';
import type { Page } from '../../App';

interface DashboardSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    onNavigate: (page: Page) => void;
    isOpen: boolean;
    onClose: () => void;
}

const NavItem: React.FC<{
    icon: string;
    label: string;
    viewName: string;
    activeView: string;
    onClick: (view: string) => void;
}> = ({ icon, label, viewName, activeView, onClick }) => (
    <a
        href="#"
        onClick={(e) => { e.preventDefault(); onClick(viewName); }}
        className={`flex items-center gap-4 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
            activeView === viewName
                ? 'bg-gradient-to-l from-[var(--secondary)] to-[var(--secondary-dark)] text-white shadow-lg'
                : 'text-gray-500 hover:bg-gray-200 hover:text-[var(--primary-dark)]'
        }`}
    >
        <i className={`fas ${icon} w-6 text-center`}></i>
        <span>{label}</span>
    </a>
);


const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeView, setActiveView, onNavigate, isOpen, onClose }) => {
    
    const handleViewChange = (view: string) => {
        setActiveView(view);
        onClose(); // Close sidebar on mobile after navigation
    };

    return (
        <aside className={`
            w-72 bg-white h-full flex flex-col shadow-lg border-l border-gray-200 
            transition-transform duration-300 ease-in-out z-40
            fixed top-0 right-0 xl:static
            xl:translate-x-0 
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
            <div className="p-6 text-center border-b flex justify-between items-center xl:justify-center">
                 <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="block">
                   <img className="h-14 w-auto rounded-lg" src="https://i.ibb.co/FqCkWMNC/photo-2025-09-17-12-03-57.jpg" alt="SaaHla Logo" />
                </a>
                <button onClick={onClose} className="xl:hidden text-2xl text-gray-500 hover:text-gray-800" aria-label="إغلاق القائمة">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <nav className="flex-grow p-6 space-y-4">
                <NavItem icon="fa-tachometer-alt" label="نظرة عامة" viewName="overview" activeView={activeView} onClick={handleViewChange} />
                <NavItem icon="fa-briefcase" label="مشاريعي" viewName="projects" activeView={activeView} onClick={handleViewChange} />
                <NavItem icon="fa-wallet" label="الأرباح" viewName="earnings" activeView={activeView} onClick={handleViewChange} />
                <NavItem icon="fa-envelope" label="الرسائل" viewName="messages" activeView={activeView} onClick={handleViewChange} />
                <NavItem icon="fa-user-edit" label="تعديل الملف الشخصي" viewName="profile" activeView={activeView} onClick={handleViewChange} />
            </nav>
            <div className="p-6 border-t">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-4 px-6 py-3 rounded-lg text-lg font-semibold text-gray-500 hover:bg-gray-200 hover:text-[var(--primary-dark)]">
                    <i className="fas fa-sign-out-alt w-6 text-center"></i>
                    <span>العودة للموقع</span>
                </a>
            </div>
        </aside>
    );
};

export default DashboardSidebar;