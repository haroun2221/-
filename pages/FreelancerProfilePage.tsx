
import React, { useState, useEffect } from 'react';
import type { Freelancer, PortfolioItem } from '../types';
import Avatar from '../components/dashboard/Avatar';
import { getFreelancerPortfolio } from '../services/portfolioService';

interface FreelancerProfilePageProps {
    freelancer: Freelancer;
    onSelectProject: (id: string) => void;
    onStartCommunication: (id: number) => void;
}

const FreelancerProfilePage: React.FC<FreelancerProfilePageProps> = ({ freelancer, onSelectProject, onStartCommunication }) => {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        const savedProjects = getFreelancerPortfolio(freelancer.id);
        setPortfolio(savedProjects);
    }, [freelancer.id]);

    return (
        <div className="animate-[profileZoomIn_0.4s_ease-out] bg-gray-50 min-h-screen pb-20">
            {/* Header Banner */}
            <div className="h-80 bg-cover bg-center relative" style={{ backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(249, 115, 22, 0.4)), url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&h=600&fit=crop')` }}>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 -mt-32 relative z-10 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-8">
                        <div className="relative -mt-24 flex-shrink-0">
                           <Avatar src={freelancer.avatar} name={freelancer.name} size={160} className="border-8 border-white shadow-2xl ring-1 ring-gray-100" />
                           <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>
                        <div className="flex-grow">
                            <h1 className="text-4xl font-black text-[var(--primary-dark)] tracking-tight">{freelancer.name}</h1>
                            <p className="text-2xl text-gray-500 font-medium mt-1">{freelancer.title}</p>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mt-4">
                                <div className="flex items-center gap-2 text-yellow-500 font-black">
                                    <i className="fas fa-star"></i>
                                    <span className="text-gray-800 text-lg">{freelancer.rating > 0 ? freelancer.rating.toFixed(1) : 'جديد'}</span>
                                    <span className="text-gray-400 font-normal">({freelancer.reviews} تقييم)</span>
                                </div>
                                <div className="text-gray-400 font-bold text-sm">
                                    <i className="fas fa-map-marker-alt ml-1 text-[var(--primary)]"></i> الجزائر
                                </div>
                                <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-black uppercase tracking-wider">
                                    {freelancer.category}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <button onClick={() => onStartCommunication(freelancer.id)} className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white px-8 py-4 rounded-2xl text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                                <i className="fas fa-paper-plane ml-2"></i> تواصل معي
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                        <div className="lg:col-span-2 space-y-12">
                             <div>
                                <h3 className="text-2xl font-black mb-6 text-gray-800 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-[var(--primary)] rounded-full"></span>
                                    نبذة عني
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                                    {freelancer.bio || 'هذا المستقل لم يقم بإضافة نبذة شخصية مفصلة بعد، ولكن أعماله تتحدث عن احترافيته.'}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black mb-8 text-gray-800 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-[var(--primary)] rounded-full"></span>
                                    معرض الأعمال ({portfolio.length})
                                </h3>
                                {portfolio.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        {portfolio.map(p => (
                                            <div 
                                                key={p.id} 
                                                onClick={() => onSelectProject(p.id)}
                                                className="rounded-3xl overflow-hidden shadow-sm transition-all cursor-pointer hover:shadow-2xl hover:-translate-y-2 group bg-white border border-gray-100"
                                            >
                                                <div className="relative overflow-hidden aspect-[4/3]">
                                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="bg-white text-[var(--primary-dark)] px-6 py-2.5 rounded-2xl font-black shadow-xl">عرض تفاصيل المشروع</span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h4 className="font-black text-xl text-gray-800 group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                                                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase">{p.category}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                                        <i className="fas fa-briefcase text-5xl text-gray-300 mb-4"></i>
                                        <p className="text-xl text-gray-400 font-bold tracking-tight">لا توجد أعمال منشورة حالياً في المعرض.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                                <h3 className="text-xl font-black mb-6 text-gray-800">المهارات والخبرات</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {freelancer.skills.length > 0 ? freelancer.skills.map(skill => (
                                        <span key={skill} className="bg-white text-[var(--primary-dark)] font-black px-4 py-2 rounded-2xl text-sm shadow-sm border border-gray-100 transition-all hover:bg-[var(--primary)] hover:text-white">{skill}</span>
                                    )) : <span className="text-gray-400 italic">لا توجد مهارات محددة.</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerProfilePage;
