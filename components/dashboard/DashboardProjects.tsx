
import React, { useState, useEffect } from 'react';
import { dashboardProjectsData } from '../../data/dashboardProjectsMockData';
import { DashboardProject, PortfolioItem } from '../../types';
import Avatar from './Avatar';
import { getFreelancerPortfolio, addProjectToPortfolio, deleteProjectFromPortfolio } from '../../services/portfolioService';
import { FREELANCER_CATEGORIES } from '../../constants';

const statusConfig = {
    'new': { label: 'جديد', icon: 'fa-sparkles', color: 'bg-blue-500' },
    'in-progress': { label: 'قيد التنفيذ', icon: 'fa-spinner fa-spin', color: 'bg-orange-500' },
    'in-review': { label: 'بانتظار المراجعة', icon: 'fa-search', color: 'bg-purple-500' },
    'completed': { label: 'مكتمل', icon: 'fa-check-circle', color: 'bg-green-500' },
    'cancelled': { label: 'ملغى', icon: 'fa-times-circle', color: 'bg-red-500' },
};

const DeleteConfirmationModal: React.FC<{ 
    isOpen: boolean; 
    projectName: string; 
    onClose: () => void; 
    onConfirm: () => void; 
}> = ({ isOpen, projectName, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-[fadeIn_0.2s]">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden p-8 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">تأكيد حذف المشروع</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    هل أنت متأكد من رغبتك في حذف مشروع <span className="font-bold text-gray-800">"{projectName}"</span>؟ 
                    <br />
                    علماً أن هذا الإجراء نهائي ولا يمكن التراجع عنه.
                </p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={onConfirm}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95"
                    >
                        نعم، احذف المشروع نهائياً
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all"
                    >
                        إلغاء وتراجع
                    </button>
                </div>
            </div>
        </div>
    );
};

const PortfolioManager: React.FC<{ freelancerId: number }> = ({ freelancerId }) => {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; projectId: string; projectName: string }>({
        isOpen: false,
        projectId: '',
        projectName: ''
    });
    
    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('web');
    const [image, setImage] = useState('');
    const [moreImages, setMoreImages] = useState(''); // Comma separated
    const [description, setDescription] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [toolsUsed, setToolsUsed] = useState('');
    const [features, setFeatures] = useState(''); // Newline separated

    useEffect(() => {
        setPortfolio(getFreelancerPortfolio(freelancerId));
    }, [freelancerId]);

    const wordCount = (str: string) => str.trim().split(/\s+/).length;

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (wordCount(title) > 16) {
            alert('عنوان المشروع يجب ألا يتجاوز 16 كلمة لضمان وضوحه للزبائن.');
            return;
        }

        const tools = toolsUsed.split(',').map(t => t.trim()).filter(t => t !== '');
        const imagesList = moreImages.split(',').map(img => img.trim()).filter(img => img !== '');
        const featuresList = features.split('\n').map(f => f.trim()).filter(f => f !== '');
        
        addProjectToPortfolio(freelancerId, { 
            title, 
            category: FREELANCER_CATEGORIES[category] || category, 
            image, 
            moreImages: imagesList,
            description,
            projectLink,
            toolsUsed: tools,
            features: featuresList
        });

        setPortfolio(getFreelancerPortfolio(freelancerId));
        setIsAddModalOpen(false);
        // Reset form
        setTitle(''); setImage(''); setDescription(''); setProjectLink(''); setToolsUsed(''); setMoreImages(''); setFeatures('');
    };

    const triggerDelete = (id: string, name: string) => {
        setDeleteModal({ isOpen: true, projectId: id, projectName: name });
    };

    const handleConfirmDelete = () => {
        deleteProjectFromPortfolio(freelancerId, deleteModal.projectId);
        setPortfolio(getFreelancerPortfolio(freelancerId));
        setDeleteModal({ isOpen: false, projectId: '', projectName: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">معرض الأعمال ({portfolio.length})</h2>
                    <p className="text-sm text-gray-500">حدث معرضك باستمرار لجذب انتباه أصحاب المشاريع.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                    <i className="fas fa-plus-circle ml-2"></i> إضافة عمل جديد
                </button>
            </div>

            {portfolio.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolio.map(item => (
                        <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm group hover:shadow-2xl transition-all duration-500">
                            <div className="relative h-56 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                                     <div className="flex gap-2">
                                        <button 
                                            onClick={() => triggerDelete(item.id, item.title)}
                                            className="bg-white/20 backdrop-blur-xl text-white hover:bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                                            title="حذف المشروع"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                     </div>
                                     <span className="text-white font-black text-xs bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
                                        تم النشر
                                     </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-black text-lg text-gray-800 leading-tight group-hover:text-[var(--primary)] transition-colors">{item.title}</h4>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-black uppercase tracking-wider">{item.category}</span>
                                    <span className="text-[10px] text-gray-400 font-bold">{item.date}</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border-4 border-dashed border-gray-100 rounded-[3rem] p-20 text-center">
                    <div className="w-32 h-32 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
                        <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <h3 className="text-3xl font-black text-gray-800 mb-4">معرض أعمالك ينتظر إبداعاتك</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">أضف أفضل مشاريعك الآن لتبرز خبراتك وتبني ثقة الزبائن بك من أول نظرة.</p>
                    <button onClick={() => setIsAddModalOpen(true)} className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white px-12 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">
                        ابدأ ببناء معرضك الآن
                    </button>
                </div>
            )}

            {/* Add Project Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-[fadeIn_0.3s]">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-3xl font-black text-gray-800">إضافة مشروع احترافي</h3>
                                <p className="text-sm text-gray-500 mt-1">صف مشروعك بوضوح وأضف صوراً توضيحية لزيادة فرصك.</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 bg-gray-200 text-gray-500 rounded-2xl hover:bg-gray-300 transition-colors flex items-center justify-center">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleAdd} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 block mr-2">عنوان العمل (بحد أقصى 16 كلمة)</label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={e => setTitle(e.target.value)} 
                                        className={`w-full px-5 py-3.5 border-2 border-gray-100 rounded-2xl focus:border-[var(--primary)] outline-none transition-all bg-gray-50 focus:bg-white ${wordCount(title) > 16 ? 'border-red-400' : ''}`} 
                                        placeholder="مثال: تطوير تطبيق لخدمات التوصيل الذكي" 
                                        required 
                                    />
                                    <div className="flex justify-between text-[10px] px-2 font-bold">
                                        <span className={wordCount(title) > 16 ? 'text-red-500' : 'text-gray-400'}>{wordCount(title)} / 16 كلمة</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 block mr-2">تصنيف العمل</label>
                                    <select 
                                        value={category} 
                                        onChange={e => setCategory(e.target.value)} 
                                        className="w-full px-5 py-3.5 border-2 border-gray-100 rounded-2xl focus:border-[var(--primary)] outline-none bg-gray-50 focus:bg-white transition-all appearance-none"
                                    >
                                        {Object.entries(FREELANCER_CATEGORIES).map(([key, name]) => (
                                            <option key={key} value={key}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 block mr-2">الصورة الأساسية (رابط مباشر)</label>
                                    <input 
                                        type="url" 
                                        value={image} 
                                        onChange={e => setImage(e.target.value)} 
                                        className="w-full px-5 py-3.5 border-2 border-gray-100 rounded-2xl focus:border-[var(--primary)] outline-none transition-all bg-gray-50" 
                                        placeholder="رابط الصورة الرئيسية" 
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 block mr-2">صور إضافية (روابط تفصل بينها فاصلة)</label>
                                    <input 
                                        type="text" 
                                        value={moreImages} 
                                        onChange={e => setMoreImages(e.target.value)} 
                                        className="w-full px-5 py-3.5 border-2 border-gray-100 rounded-2xl focus:border-[var(--primary)] outline-none transition-all bg-gray-50" 
                                        placeholder="link1, link2, link3" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 block mr-2">مميزات المشروع (كل ميزة في سطر جديد)</label>
                                <textarea 
                                    value={features} 
                                    onChange={e => setFeatures(e.target.value)} 
                                    className="w-full h-24 px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-[var(--primary)] outline-none bg-gray-50 resize-none" 
                                    placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 block mr-2">وصف تفصيلي كامل</label>
                                <textarea 
                                    value={description} 
                                    onChange={e => setDescription(e.target.value)} 
                                    className="w-full h-40 px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-[var(--primary)] outline-none transition-all bg-gray-50 focus:bg-white resize-none" 
                                    placeholder="اشرح المشروع بالتفصيل..." 
                                    required
                                />
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button type="submit" className="flex-grow bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                    حفظ ونشر المشروع
                                </button>
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-10 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all">
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DeleteConfirmationModal 
                isOpen={deleteModal.isOpen}
                projectName={deleteModal.projectName}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

const DashboardProjects: React.FC<{ currentFreelancerId: number }> = ({ currentFreelancerId }) => {
    const [activeTab, setActiveTab] = useState<'requests' | 'portfolio'>('portfolio');

    return (
        <div className="space-y-8 animate-[fadeIn_0.4s] pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-800 tracking-tight">إدارة أعمالي</h1>
                    <p className="text-gray-500 mt-1 font-medium">نظم مشاريعك الحالية واعرض مهاراتك للعالم.</p>
                </div>
                <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <button 
                        onClick={() => setActiveTab('requests')} 
                        className={`px-10 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'requests' ? 'bg-gradient-to-l from-[var(--primary-dark)] to-[var(--primary)] text-white shadow-xl' : 'text-gray-400 hover:text-gray-800'}`}
                    >
                        <i className="fas fa-stream"></i> طلبات المشاريع
                    </button>
                    <button 
                        onClick={() => setActiveTab('portfolio')} 
                        className={`px-10 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'portfolio' ? 'bg-gradient-to-l from-[var(--primary-dark)] to-[var(--primary)] text-white shadow-xl' : 'text-gray-400 hover:text-gray-800'}`}
                    >
                        <i className="fas fa-layer-group"></i> معرض الأعمال
                    </button>
                </div>
            </div>

            {activeTab === 'requests' ? (
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {dashboardProjectsData.map(project => (
                        <div key={project.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                             <div className="flex justify-between items-start mb-8">
                                <h3 className="font-black text-gray-800 text-xl max-w-[70%] leading-tight">{project.title}</h3>
                                <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full text-white shadow-sm ${statusConfig[project.status].color}`}>{statusConfig[project.status].label}</span>
                             </div>
                             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
                                <Avatar src={project.clientAvatar} name={project.clientName} size={44} />
                                <div>
                                    <p className="text-sm font-black text-gray-800">{project.clientName}</p>
                                    <p className="text-xs text-green-600 font-black">الميزانية: {project.budget.toLocaleString()} دج</p>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            ) : <PortfolioManager freelancerId={currentFreelancerId} />}
        </div>
    );
};

export default DashboardProjects;
