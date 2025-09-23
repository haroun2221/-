
import React, { useState, useMemo } from 'react';
import { dashboardProjectsData } from '../../data/dashboardProjectsMockData';
import type { DashboardProject } from '../../types';

// Helper objects for styling and labels
const statusConfig = {
    'new': { label: 'جديد', icon: 'fa-sparkles', color: 'bg-blue-500' },
    'in-progress': { label: 'قيد التنفيذ', icon: 'fa-spinner fa-spin', color: 'bg-orange-500' },
    'in-review': { label: 'بانتظار المراجعة', icon: 'fa-search', color: 'bg-purple-500' },
    'completed': { label: 'مكتمل', icon: 'fa-check-circle', color: 'bg-green-500' },
    'cancelled': { label: 'ملغى', icon: 'fa-times-circle', color: 'bg-red-500' },
};

const paymentStatusConfig = {
    'pending': { label: 'معلق', color: 'text-orange-600 bg-orange-100' },
    'paid': { label: 'مدفوع', color: 'text-green-600 bg-green-100' },
    'in-review': { label: 'تحت المراجعة', color: 'text-purple-600 bg-purple-100' },
};

const FilterButton: React.FC<{ label: string; count: number; active: boolean; onClick: () => void; }> = ({ label, count, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${active ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
    >
        {label}
        <span className={`px-2 py-0.5 rounded-full text-xs ${active ? 'bg-white/20' : 'bg-gray-300'}`}>{count}</span>
    </button>
);


const ProjectCard: React.FC<{ project: DashboardProject }> = ({ project }) => {
    const sConf = statusConfig[project.status];
    const pConf = paymentStatusConfig[project.paymentStatus];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)] hover:-translate-y-1">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <img src={project.clientAvatar} alt={project.clientName} className="w-6 h-6 rounded-full" />
                        <span>{project.clientName}</span>
                    </div>
                </div>
                <div className={`text-xs font-bold text-white px-3 py-1 rounded-full flex items-center gap-2 ${sConf.color}`}>
                    <i className={`fas ${sConf.icon}`}></i>
                    <span>{sConf.label}</span>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <div>
                    <span className="text-gray-500">الميزانية:</span>
                    <span className="font-bold text-green-600 mr-1">{project.budget.toLocaleString()} دج</span>
                </div>
                <div>
                    <span className="text-gray-500">الموعد النهائي:</span>
                    <span className="font-bold text-red-600 mr-1">{project.deadline}</span>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-600">تقدم الإنجاز</span>
                    <span className="text-xs font-bold text-[var(--primary-dark)]">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <div>
                    <span className="text-sm text-gray-500">حالة الدفع: </span>
                    <span className={`text-sm font-bold px-2 py-1 rounded-md ${pConf.color}`}>{pConf.label}</span>
                </div>
                <button className="text-sm font-semibold bg-[var(--primary-dark)] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-opacity">
                    <i className="fas fa-eye ml-2"></i>
                    عرض التفاصيل
                </button>
            </div>
        </div>
    );
};


const DashboardProjects: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<'all' | DashboardProject['status']>('all');
    const [sortOrder, setSortOrder] = useState('newest');

    const filteredAndSortedProjects = useMemo(() => {
        let projects = dashboardProjectsData;

        // Filtering
        if (statusFilter !== 'all') {
            projects = projects.filter(p => p.status === statusFilter);
        }

        // Sorting
        projects.sort((a, b) => {
            switch (sortOrder) {
                case 'newest':
                    return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
                case 'oldest':
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                case 'highest':
                    return b.budget - a.budget;
                case 'lowest':
                    return a.budget - b.budget;
                default:
                    return 0;
            }
        });

        return projects;
    }, [statusFilter, sortOrder]);
    
    const statusCounts = useMemo(() => {
        const counts = { all: dashboardProjectsData.length } as Record<string, number>;
        for(const status in statusConfig) {
            counts[status] = dashboardProjectsData.filter(p => p.status === status).length;
        }
        return counts;
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h1 className="text-3xl font-bold text-gray-800">إدارة المشاريع</h1>
                 <div className="relative">
                    <select
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)]"
                    >
                        <option value="newest">الأحدث أولاً</option>
                        <option value="oldest">الأقدم أولاً</option>
                        <option value="highest">الأعلى سعراً</option>
                        <option value="lowest">الأقل سعراً</option>
                    </select>
                    <i className="fas fa-sort-amount-down absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap items-center gap-3">
                <FilterButton label="الكل" count={statusCounts.all} active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
                {Object.entries(statusConfig).map(([key, {label}]) => (
                     <FilterButton key={key} label={label} count={statusCounts[key] || 0} active={statusFilter === key} onClick={() => setStatusFilter(key as DashboardProject['status'])} />
                ))}
            </div>

            {/* Projects List */}
            {filteredAndSortedProjects.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredAndSortedProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-gray-200">
                    <i className="fas fa-folder-open text-5xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-700">لا توجد مشاريع</h3>
                    <p className="text-gray-500">لا توجد مشاريع تطابق الفلاتر المحددة.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardProjects;
