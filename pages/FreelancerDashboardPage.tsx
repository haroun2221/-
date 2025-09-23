
import React, { useState } from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import DashboardProjects from '../components/dashboard/DashboardProjects';
import DashboardEarnings from '../components/dashboard/DashboardEarnings';
import DashboardMessages from '../components/dashboard/DashboardMessages';
import DashboardProfile from '../components/dashboard/DashboardProfile';
import DashboardProfileSidebar from '../components/dashboard/DashboardProfileSidebar';
import type { User } from '../services/authService';
import type { Page } from '../App';
import { freelancerProfileData } from '../data/dashboardProfileMockData';
import type { FreelancerProfileData } from '../types';

interface FreelancerDashboardPageProps {
    user: User;
    onNavigate: (page: Page) => void;
}

const FreelancerDashboardPage: React.FC<FreelancerDashboardPageProps> = ({ user, onNavigate }) => {
    const [activeView, setActiveView] = useState('overview');
    const [profile, setProfile] = useState<FreelancerProfileData>(freelancerProfileData);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);

    const handleNotificationClick = (conversationId: number) => {
        setActiveView('messages');
        setSelectedConversationId(conversationId);
    };

    const handleMessageSelected = () => {
        setSelectedConversationId(null); // Reset after selection to allow re-triggering
    };

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return <DashboardOverview />;
            case 'projects':
                return <DashboardProjects />;
            case 'earnings':
                return <DashboardEarnings />;
            case 'messages':
                return <DashboardMessages selectedConversationId={selectedConversationId} onMessageSelected={handleMessageSelected} />;
            case 'profile':
                return <DashboardProfile profile={profile} onProfileChange={setProfile} />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800" dir="rtl">
            <DashboardSidebar activeView={activeView} setActiveView={setActiveView} onNavigate={onNavigate} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader user={user} profile={profile} onNotificationClick={handleNotificationClick} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
                    <div className="flex gap-8">
                       <div className="flex-grow">
                           {renderContent()}
                       </div>
                       <div className="w-80 flex-shrink-0 lg:block hidden">
                           <DashboardProfileSidebar user={user} profile={profile} setActiveView={setActiveView} />
                       </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FreelancerDashboardPage;
