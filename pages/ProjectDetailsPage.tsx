
import React, { useState } from 'react';
import type { PortfolioItem, Freelancer } from '../types';
import Avatar from '../components/dashboard/Avatar';

interface ProjectDetailsPageProps {
    project: PortfolioItem;
    freelancer: Freelancer;
    onBack: () => void;
}

const ReadMoreDescription: React.FC<{ text: string }> = ({ text }) => {
    const WORDS_PER_STEP = 60;
    const words = text.split(' ');
    const [visibleCount, setVisibleCount] = useState(WORDS_PER_STEP);

    if (words.length <= WORDS_PER_STEP) {
        return <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{text}</p>;
    }

    const currentText = words.slice(0, visibleCount).join(' ');
    const isFull = visibleCount >= words.length;

    return (
        <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line animate-[fadeIn_0.3s]">
                {currentText}
                {!isFull && "..."}
            </p>
            {!isFull && (
                <button 
                    onClick={() => setVisibleCount(prev => prev + WORDS_PER_STEP)}
                    className="text-[var(--primary)] font-bold hover:underline flex items-center gap-2"
                >
                    <i className="fas fa-plus-circle"></i> عرض المزيد من الوصف
                </button>
            )}
        </div>
    );
};

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ project, freelancer, onBack }) => {
    const allImages = [project.image, ...(project.moreImages || [])];
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] bg-gray-50 min-h-screen pb-20">
            {/* Navigation Header */}
            <div className="bg-white border-b sticky top-20 z-20">
                <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
                    <button onClick={onBack} className="text-gray-500 hover:text-gray-800 font-bold flex items-center gap-2">
                        <i className="fas fa-arrow-right"></i> العودة لملف المستقل
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>معرض الأعمال</span>
                        <i className="fas fa-chevron-left text-[10px]"></i>
                        <span className="text-gray-800 font-bold">{project.title.substring(0, 30)}...</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Visual Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Image Viewer */}
                        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 p-2">
                            <div className="relative aspect-video group bg-gray-900 flex items-center justify-center rounded-[1.8rem] overflow-hidden">
                                <img 
                                    src={allImages[activeImgIndex]} 
                                    alt={project.title} 
                                    className="max-w-full max-h-full object-contain animate-[fadeIn_0.4s]" 
                                />
                                
                                {allImages.length > 1 && (
                                    <>
                                        <button 
                                            onClick={() => setActiveImgIndex(prev => (prev > 0 ? prev - 1 : allImages.length - 1))}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                        <button 
                                            onClick={() => setActiveImgIndex(prev => (prev < allImages.length - 1 ? prev + 1 : 0))}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            {/* Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="flex gap-4 p-4 overflow-x-auto pb-6 mt-2">
                                    {allImages.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setActiveImgIndex(idx)}
                                            className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImgIndex === idx ? 'border-[var(--primary)] scale-105 shadow-md' : 'border-transparent opacity-60'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Project Description */}
                        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-4">
                                <span className="w-2 h-10 bg-[var(--primary)] rounded-full"></span>
                                عن هذا المشروع
                            </h2>
                            <ReadMoreDescription text={project.description || 'لا يتوفر وصف تفصيلي للمشروع.'} />
                        </div>

                        {/* Project Features */}
                        {project.features && project.features.length > 0 && (
                            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-4">
                                    <span className="w-2 h-8 bg-[var(--secondary)] rounded-full"></span>
                                    مميزات المشروع والحلول المقدمة
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.features.map((feat, idx) => (
                                        <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-transform hover:-translate-y-1">
                                            <div className="w-10 h-10 bg-white text-green-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                                                <i className="fas fa-check"></i>
                                            </div>
                                            <p className="text-gray-700 font-bold leading-relaxed">{feat}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Sidebar Metadata */}
                    <div className="space-y-8">
                        {/* Summary Card */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
                             <span className="text-[var(--primary)] font-black text-xs uppercase tracking-[0.2em] mb-4 block">{project.category}</span>
                             <h1 className="text-3xl font-black text-gray-800 leading-tight mb-6">{project.title}</h1>
                             
                             <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                    <span className="text-gray-400 font-bold">تاريخ التنفيذ:</span>
                                    <span className="text-gray-800 font-bold">{project.date}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                    <span className="text-gray-400 font-bold">الحالة:</span>
                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-black">مكتمل بنجاح</span>
                                </div>
                             </div>

                             {project.projectLink && (
                                <a 
                                    href={project.projectLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-full bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white py-4 rounded-2xl font-black shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mb-4"
                                >
                                    <i className="fas fa-external-link-alt"></i> معاينة حية للمشروع
                                </a>
                             )}
                        </div>

                        {/* Freelancer Profile Short Card */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-md border border-gray-100 text-center">
                            <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase">تم العمل بواسطة</h3>
                            <div className="flex justify-center mb-4">
                                <Avatar src={freelancer.avatar} name={freelancer.name} size={90} className="border-4 border-gray-50 shadow-md" />
                            </div>
                            <h4 className="text-xl font-black text-gray-800">{freelancer.name}</h4>
                            <p className="text-gray-500 mb-6">{freelancer.title}</p>
                            <button onClick={onBack} className="w-full border-2 border-[var(--primary)] text-[var(--primary)] py-3 rounded-xl font-bold hover:bg-[var(--primary-lightest)] transition-colors">عرض ملف المستقل بالكامل</button>
                        </div>

                        {/* Tools Section */}
                        {project.toolsUsed && project.toolsUsed.length > 0 && (
                            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-200">
                                <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-tools text-[var(--primary)]"></i> الأدوات المستخدمة
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.toolsUsed.map(tool => (
                                        <span key={tool} className="bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
