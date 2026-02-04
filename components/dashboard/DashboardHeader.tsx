import React, { useState, useEffect } from 'react';
import type { User } from '../../services/authService';
import type { FreelancerProfileData, Notification } from '../../types';
import Avatar from './Avatar';
import { dashboardNotificationsData } from '../../data/dashboardMockData';

interface DashboardHeaderProps {
    user: User;
    profile: FreelancerProfileData;
    onNotificationClick: (conversationId: number) => void;
    onToggleNavSidebar: () => void;
    onToggleProfileSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, profile, onNotificationClick, onToggleNavSidebar, onToggleProfileSidebar }) => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const unreadCount = dashboardNotificationsData.filter(n => !n.read).length;

    useEffect(() => {
        const closeDropdowns = () => setIsNotificationsOpen(false);
        if (isNotificationsOpen) {
            window.addEventListener('click', closeDropdowns);
        }
        return () => window.removeEventListener('click', closeDropdowns);
    }, [isNotificationsOpen]);

    return (
        <header className="bg-white p-4 flex justify-between items-center shadow-sm border-b border-gray-200 flex-shrink-0 z-20">
            {/* Right Side */}
            <div className="flex items-center gap-4">
                <button onClick={onToggleNavSidebar} className="xl:hidden text-2xl text-gray-500 hover:text-[var(--primary-dark)]" aria-label="فتح قائمة التنقل">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="relative w-full max-w-xs md:max-w-md hidden sm:block">
                    <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                        type="text" 
                        placeholder="ابحث عن مشروع، رسالة..." 
                        className="w-full bg-gray-100 rounded-full py-2 pr-12 pl-4 outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:bg-white"
                    />
                </div>
            </div>

            {/* Left Side */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <button onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); }} className="text-2xl text-gray-500 cursor-pointer hover:text-[var(--primary-dark)]" aria-label="الإشعارات">
                        <i className="fas fa-bell"></i>
                    </button>
                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">{unreadCount}</span>}
                    {isNotificationsOpen && (
                        <div onClick={(e) => e.stopPropagation()} className="absolute left-0 mt-3 w-80 bg-white rounded-lg shadow-xl z-50 animate-[fadeIn_0.2s_ease-out]">
                            <div className="p-3 font-bold border-b">الإشعارات</div>
                            <div className="max-h-80 overflow-y-auto">
                                {dashboardNotificationsData.map((n: Notification) => {
                                    const isClickable = !!n.conversationId;
                                    return (
                                        <div
                                            key={n.id}
                                            onClick={isClickable ? () => {
                                                onNotificationClick(n.conversationId!);
                                                setIsNotificationsOpen(false);
                                            } : undefined}
                                            className={`flex items-center gap-3 p-3 border-b last:border-b-0 ${isClickable ? 'cursor-pointer hover:bg-gray-100' : ''} ${!n.read ? 'bg-blue-50' : ''}`}
                                        >
                                            {n.avatar && typeof n.avatar === 'string' ? <Avatar src={n.avatar} name={n.from} size={40} /> : n.image ? <img src={n.image} alt={n.from} className="w-10 h-10 rounded-full" /> : null }
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
                <div className="hidden xl:flex items-center gap-3">
                    <Avatar src={profile.avatar} name={profile.name} size={40} />
                    <div>
                        <div className="font-bold">{profile.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{user.type === 'freelancer' ? 'مستقل' : 'زبون'}</div>
                    </div>
                </div>
                <button onClick={onToggleProfileSidebar} className="xl:hidden text-2xl text-gray-500 hover:text-[var(--primary-dark)]" aria-label="فتح الشريط الجانبي للملف الشخصي">
                     <i className="fas fa-user-circle"></i>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;