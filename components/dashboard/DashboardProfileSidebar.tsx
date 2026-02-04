import React from 'react';
import type { User } from '../../services/authService';
import type { FreelancerProfileData } from '../../types';
import { dashboardData } from '../../data/dashboardMockData';
import CircularProgress from './CircularProgress';
import Avatar from './Avatar';

interface DashboardProfileSidebarProps {
    user: User;
    profile: FreelancerProfileData;
    setActiveView: (view: string) => void;
}

const DashboardProfileSidebar: React.FC<DashboardProfileSidebarProps> = ({ user, profile, setActiveView }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                 <div className="flex justify-center mb-4">
                    <Avatar src={profile.avatar} name={profile.name} size={96} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                <p className="text-gray-500">مستقل</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">اكتمال الملف الشخصي</h3>
                <div className="flex justify-center my-4">
                    <CircularProgress percentage={dashboardData.profileCompletion} />
                </div>
                <p className="text-center text-sm text-gray-500 mb-4">
                    ملفك الشخصي مكتمل بنسبة {dashboardData.profileCompletion}%. أكمله الآن لزيادة فرصك.
                </p>
                <button 
                    onClick={() => setActiveView('profile')}
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    أكمل ملفك الشخصي
                </button>
            </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">مقالات مفيدة</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li className="hover:text-[var(--primary-dark)] cursor-pointer"><i className="fas fa-file-alt text-gray-400 ml-2"></i>كيف تكتب عرضاً احترافياً؟</li>
                    <li className="hover:text-[var(--primary-dark)] cursor-pointer"><i className="fas fa-file-alt text-gray-400 ml-2"></i>5 نصائح لإدارة وقتك كمستقل</li>
                    <li className="hover:text-[var(--primary-dark)] cursor-pointer"><i className="fas fa-file-alt text-gray-400 ml-2"></i>بناء معرض أعمال يجذب العملاء</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardProfileSidebar;