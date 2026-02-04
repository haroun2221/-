
import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar.tsx';
import DashboardHeader from '../components/dashboard/DashboardHeader.tsx';
import DashboardOverview from '../components/dashboard/DashboardOverview.tsx';
import DashboardProjects from '../components/dashboard/DashboardProjects.tsx';
import DashboardEarnings from '../components/dashboard/DashboardEarnings.tsx';
import DashboardMessages from '../components/dashboard/DashboardMessages.tsx';
import DashboardProfile from '../components/dashboard/DashboardProfile.tsx';
import DashboardProfileSidebar from '../components/dashboard/DashboardProfileSidebar.tsx';
import type { User } from '../services/authService.ts';
import { updateUser } from '../services/authService.ts';
import type { Page } from '../App.tsx';
import type { FreelancerProfileData } from '../types.ts';
import { generateIdFromEmail } from '../services/freelancerService.ts';

interface FreelancerDashboardPageProps {
    user: User;
    onNavigate: (page: Page) => void;
}

const FreelancerDashboardPage: React.FC<FreelancerDashboardPageProps> = ({ user, onNavigate }) => {
    const [activeView, setActiveView] = useState('overview');
    const fId = generateIdFromEmail(user.email);

    // إنشاء بروفايل فارغ يعتمد على بيانات اليوزر الحالية
    const [profile, setProfile] = useState<FreelancerProfileData>({
        id: fId,
        name: user.name,
        avatar: typeof user.avatar === 'object' ? user.avatar : { bgColor: '#1E3A8A', textColor: '#FFFFFF', borderColor: '#60A5FA', borderSize: 4, fontSize: 'large' },
        tagline: user.wilaya ? `مستقل من ولاية ${user.wilaya}` : 'مستقل محترف',
        location: user.wilaya || 'الجزائر',
        isAvailable: true,
        about: '',
        skills: [],
        services: [],
        portfolio: [],
        reviews: [],
        stats: {
            rating: 0,
            reviewsCount: 0,
            completedProjects: 0,
            satisfactionRate: 0,
        }
    });

    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
    const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

    const handleNotificationClick = (conversationId: number) => {
        setActiveView('messages');
        setSelectedConversationId(conversationId);
    };

    const handleMessageSelected = () => {
        setSelectedConversationId(null);
    };
    
    const closeSidebars = () => {
        setIsNavSidebarOpen(false);
        setIsProfileSidebarOpen(false);
    };

    const handleProfileUpdate = (newProfileData: FreelancerProfileData) => {
        setProfile(newProfileData);
        if (user && user.name !== newProfileData.name) {
            updateUser(user.email, { name: newProfileData.name });
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case 'overview': return <DashboardOverview />;
            case 'projects': return <DashboardProjects currentFreelancerId={fId} />;
            case 'earnings': return <DashboardEarnings />;
            case 'messages': return <DashboardMessages selectedConversationId={selectedConversationId} onMessageSelected={handleMessageSelected} />;
            case 'profile': return <DashboardProfile profile={profile} onProfileChange={handleProfileUpdate} />;
            default: return <DashboardOverview />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800" dir="rtl">
            {(isNavSidebarOpen || isProfileSidebarOpen) && (
                <div className="fixed inset-0 bg-black/40 z-30 xl:hidden" onClick={closeSidebars}></div>
            )}
            <DashboardSidebar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                onNavigate={onNavigate}
                isOpen={isNavSidebarOpen}
                onClose={() => setIsNavSidebarOpen(false)}
            />
            <div className="flex-1 flex flex-col">
                <DashboardHeader 
                    user={user} 
                    profile={profile} 
                    onNotificationClick={handleNotificationClick}
                    onToggleNavSidebar={() => setIsNavSidebarOpen(true)}
                    onToggleProfileSidebar={() => setIsProfileSidebarOpen(true)}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-8">
                    <div className="flex gap-8">
                       <div className="flex-grow">{renderContent()}</div>
                       <aside className={`w-80 flex-shrink-0 transition-transform duration-300 xl:translate-x-0 xl:static xl:block fixed top-0 left-0 h-full z-40 ${isProfileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                           <div className="h-full overflow-y-auto bg-white shadow-lg p-6 xl:p-0 xl:bg-transparent xl:shadow-none">
                               <DashboardProfileSidebar user={user} profile={profile} setActiveView={setActiveView} />
                           </div>
                       </aside>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FreelancerDashboardPage;
