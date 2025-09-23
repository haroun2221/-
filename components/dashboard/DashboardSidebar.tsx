
import React from 'react';
import type { Page } from '../../App';

interface DashboardSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    onNavigate: (page: Page) => void;
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


const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeView, setActiveView, onNavigate }) => {
    return (
        <div className="w-72 bg-white h-full flex flex-col shadow-lg border-l border-gray-200">
            <div className="p-6 text-center border-b">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                   <img className="h-14 w-auto mx-auto" src="https://i.ibb.co/9gq85f4/photo-2025-09-17-12-03-57.jpg" alt="SaaHla Logo" />
                </a>
            </div>
            <nav className="flex-grow p-6 space-y-4">
                <NavItem icon="fa-tachometer-alt" label="نظرة عامة" viewName="overview" activeView={activeView} onClick={setActiveView} />
                <NavItem icon="fa-briefcase" label="مشاريعي" viewName="projects" activeView={activeView} onClick={setActiveView} />
                <NavItem icon="fa-wallet" label="الأرباح" viewName="earnings" activeView={activeView} onClick={setActiveView} />
                <NavItem icon="fa-envelope" label="الرسائل" viewName="messages" activeView={activeView} onClick={setActiveView} />
                <NavItem icon="fa-user-edit" label="تعديل الملف الشخصي" viewName="profile" activeView={activeView} onClick={setActiveView} />
            </nav>
            <div className="p-6 border-t">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-4 px-6 py-3 rounded-lg text-lg font-semibold text-gray-500 hover:bg-gray-200 hover:text-[var(--primary-dark)]">
                    <i className="fas fa-sign-out-alt w-6 text-center"></i>
                    <span>العودة للموقع</span>
                </a>
            </div>
        </div>
    );
};

export default DashboardSidebar;
