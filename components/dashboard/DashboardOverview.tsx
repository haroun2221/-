import React from 'react';
import StatCard from './StatCard';
import EarningsChart from './EarningsChart';
import { dashboardData } from '../../data/dashboardMockData';

const DashboardOverview: React.FC = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">نظرة عامة</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="الأرباح الشهرية" value={`${dashboardData.monthlyEarnings.toLocaleString()} دج`} icon="fa-wallet" change="+12.5%" color="green" />
                <StatCard title="المشاريع المكتملة" value={dashboardData.completedProjects.toString()} icon="fa-check-circle" change="+5" color="blue" />
                <StatCard title="المشاريع قيد التنفيذ" value={dashboardData.ongoingProjects.toString()} icon="fa-spinner" color="orange" />
                <StatCard title="التقييم العام" value={dashboardData.overallRating.toFixed(1)} icon="fa-star" color="yellow" />
            </div>

            {/* Earnings Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">أداء الأرباح (آخر 6 أشهر)</h2>
                <div className="h-72">
                    <EarningsChart data={dashboardData.earningsData} />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">آخر النشاطات</h2>
                <div className="space-y-4">
                    {dashboardData.recentActivities.map(activity => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.iconColor}`}>
                                <i className={`fas ${activity.icon} text-white`}></i>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-700">{activity.description}</p>
                                <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
