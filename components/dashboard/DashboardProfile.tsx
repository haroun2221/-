
import React, { useState, useEffect } from 'react';
import type { FreelancerProfileData, Service, Skill, PortfolioItem, ProfileReview, InitialAvatarConfig } from '../../types';
import Avatar from './Avatar';
import AvatarEditorModal from './AvatarEditorModal';
import { getFreelancerPortfolio, addProjectToPortfolio, deleteProjectFromPortfolio } from '../../services/portfolioService';
import { WILAYAS } from '../../constants';

const SectionHeader: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 bg-[var(--primary-lightest)] text-[var(--primary-dark)] rounded-xl flex items-center justify-center">
            <i className={`fas ${icon} text-lg`}></i>
        </div>
        <h2 className="text-xl font-black text-gray-800">{title}</h2>
    </div>
);

const DashboardProfile: React.FC<{ profile: FreelancerProfileData; onProfileChange: (newProfile: FreelancerProfileData) => void }> = ({ profile, onProfileChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);
    
    // Edit States
    const [editData, setEditData] = useState<FreelancerProfileData>(profile);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillLevel, setNewSkillLevel] = useState<'مبتدئ' | 'متوسط' | 'خبير'>('متوسط');
    
    // Service Form
    const [servTitle, setServTitle] = useState('');
    const [servPrice, setServPrice] = useState(0);
    const [servIcon, setServIcon] = useState('fa-laptop-code');

    useEffect(() => {
        setEditData(profile);
    }, [profile]);

    const handleSave = () => {
        onProfileChange(editData);
        setIsEditing(false);
    };

    const addSkill = () => {
        if (!newSkillName.trim()) return;
        if (editData.skills.find(s => s.name === newSkillName)) return;
        
        setEditData({
            ...editData,
            skills: [...editData.skills, { name: newSkillName, level: newSkillLevel }]
        });
        setNewSkillName('');
    };

    const removeSkill = (name: string) => {
        setEditData({
            ...editData,
            skills: editData.skills.filter(s => s.name !== name)
        });
    };

    const addService = () => {
        if (!servTitle.trim()) return;
        const newService: Service = {
            id: Math.random().toString(36).substr(2, 9),
            title: servTitle,
            price: servPrice,
            icon: servIcon
        };
        setEditData({
            ...editData,
            services: [...editData.services, newService]
        });
        setServTitle(''); setServPrice(0);
    };

    const removeService = (id: string) => {
        setEditData({
            ...editData,
            services: editData.services.filter(s => s.id !== id)
        });
    };

    return (
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out] pb-20">
            {/* Header Hero */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 z-0"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <Avatar src={editData.avatar} name={editData.name} size={140} className="ring-4 ring-white shadow-2xl" />
                        {isEditing && (
                            <button 
                                onClick={() => setIsAvatarEditorOpen(true)}
                                className="absolute bottom-1 right-1 w-12 h-12 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-[var(--primary-dark)] hover:scale-110 transition-all"
                            >
                                <i className="fas fa-camera text-lg"></i>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow text-center md:text-right space-y-3">
                         {isEditing ? (
                             <div className="space-y-3 max-w-md">
                                <input 
                                    type="text" 
                                    value={editData.name} 
                                    onChange={e => setEditData({...editData, name: e.target.value})} 
                                    className="text-3xl font-black w-full bg-gray-50 border-2 border-gray-100 px-4 py-2 rounded-xl focus:border-[var(--primary)] outline-none" 
                                />
                                <input 
                                    type="text" 
                                    value={editData.tagline} 
                                    onChange={e => setEditData({...editData, tagline: e.target.value})} 
                                    className="text-lg text-gray-500 w-full bg-gray-50 border-2 border-gray-100 px-4 py-1 rounded-xl focus:border-[var(--primary)] outline-none" 
                                />
                             </div>
                         ) : (
                             <>
                                <h1 className="text-4xl font-black text-gray-800 tracking-tight">{editData.name}</h1>
                                <p className="text-xl text-gray-500 font-medium">{editData.tagline}</p>
                             </>
                         )}
                         <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 font-bold">
                            <span><i className="fas fa-map-marker-alt text-[var(--primary)] ml-1"></i> {editData.location}</span>
                            <span className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${editData.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span> {editData.isAvailable ? 'متاح لاستلام المشاريع' : 'مشغول حالياً'}</span>
                         </div>
                    </div>
                    <div>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <button onClick={handleSave} className="btn bg-green-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">حفظ البيانات</button>
                                <button onClick={() => setIsEditing(false)} className="btn bg-gray-100 text-gray-600 px-8 py-3 rounded-2xl font-bold">إلغاء</button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="btn bg-[var(--primary-dark)] text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                <i className="fas fa-edit ml-2"></i> تعديل البروفايل
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About Section */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <SectionHeader title="من أنا؟" icon="fa-user-astronaut" />
                        {isEditing ? (
                            <textarea 
                                value={editData.about} 
                                onChange={e => setEditData({...editData, about: e.target.value})} 
                                className="w-full h-48 bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[var(--primary)] outline-none transition-all resize-none"
                                placeholder="اكتب نبذة احترافية عن خبراتك وطريقة عملك..."
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                                {editData.about || 'لا توجد نبذة تعريفية بعد. أخبر العملاء عن مهاراتك الرائعة!'}
                            </p>
                        )}
                    </div>

                    {/* Services Section */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <SectionHeader title="خدماتي الاحترافية" icon="fa-gem" />
                        {isEditing && (
                            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100 space-y-4">
                                <h4 className="font-bold text-gray-700">إضافة خدمة جديدة</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input type="text" placeholder="اسم الخدمة" value={servTitle} onChange={e => setServTitle(e.target.value)} className="col-span-1 md:col-span-2 px-4 py-2 rounded-xl border-2 border-white focus:border-[var(--primary)] outline-none" />
                                    <input type="number" placeholder="السعر دج" value={servPrice} onChange={e => setServPrice(parseInt(e.target.value))} className="px-4 py-2 rounded-xl border-2 border-white focus:border-[var(--primary)] outline-none" />
                                </div>
                                <div className="flex justify-between items-center">
                                     <div className="flex gap-4">
                                        {['fa-laptop-code', 'fa-palette', 'fa-pen-nib', 'fa-video', 'fa-bullhorn'].map(ic => (
                                            <button key={ic} onClick={() => setServIcon(ic)} className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 ${servIcon === ic ? 'border-[var(--primary)] text-[var(--primary)] bg-white' : 'border-transparent text-gray-400'}`}>
                                                <i className={`fas ${ic}`}></i>
                                            </button>
                                        ))}
                                     </div>
                                     <button onClick={addService} className="bg-[var(--primary-dark)] text-white px-6 py-2 rounded-xl font-bold text-sm">أضف الخدمة</button>
                                </div>
                            </div>
                        )}
                        <div className="space-y-4">
                            {editData.services.map(s => (
                                <div key={s.id} className="flex items-center gap-6 p-5 bg-gray-50 rounded-2xl group border border-transparent hover:border-blue-100 transition-all">
                                    <div className="w-14 h-14 bg-white text-[var(--primary)] rounded-2xl flex items-center justify-center shadow-sm text-2xl">
                                        <i className={`fas ${s.icon}`}></i>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-gray-800 text-lg">{s.title}</h4>
                                        <p className="text-green-600 font-black">يبدأ من {s.price.toLocaleString()} دج</p>
                                    </div>
                                    {isEditing && <button onClick={() => removeService(s.id)} className="text-red-400 hover:text-red-600 transition-colors"><i className="fas fa-trash"></i></button>}
                                </div>
                            ))}
                            {editData.services.length === 0 && !isEditing && <p className="text-gray-400 italic text-center py-4">لم تقم بإضافة خدمات محددة بعد.</p>}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                     {/* Availability Section */}
                     <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <SectionHeader title="حالة العمل" icon="fa-toggle-on" />
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <span className="font-bold text-gray-700">متاح للمشاريع</span>
                            <button 
                                onClick={() => setEditData({...editData, isAvailable: !editData.isAvailable})}
                                disabled={!isEditing}
                                className={`w-14 h-8 rounded-full transition-colors relative ${editData.isAvailable ? 'bg-green-500' : 'bg-gray-300'} ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${editData.isAvailable ? 'right-7' : 'right-1'}`}></div>
                            </button>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <SectionHeader title="المهارات" icon="fa-star" />
                        {isEditing && (
                            <div className="space-y-3 mb-6">
                                <input 
                                    type="text" 
                                    placeholder="أدخل مهارة (مثلاً: React)..." 
                                    value={newSkillName} 
                                    onChange={e => setNewSkillName(e.target.value)} 
                                    className="w-full px-4 py-2 bg-gray-50 rounded-xl border-2 border-gray-100 outline-none focus:border-[var(--primary)]"
                                    onKeyPress={e => e.key === 'Enter' && addSkill()}
                                />
                                <div className="flex gap-2">
                                    {(['مبتدئ', 'متوسط', 'خبير'] as const).map(lvl => (
                                        <button key={lvl} onClick={() => setNewSkillLevel(lvl)} className={`flex-1 py-1.5 text-xs font-bold rounded-lg border-2 transition-all ${newSkillLevel === lvl ? 'bg-[var(--primary)] text-white border-transparent' : 'bg-white text-gray-400 border-gray-100'}`}>{lvl}</button>
                                    ))}
                                </div>
                                <button onClick={addSkill} className="w-full bg-gray-800 text-white py-2 rounded-xl text-sm font-bold">إضافة مهارة</button>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2.5">
                            {editData.skills.map(skill => (
                                <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100 group">
                                    <span className="text-sm font-bold text-gray-700">{skill.name}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md text-white font-black ${skill.level === 'خبير' ? 'bg-orange-500' : skill.level === 'متوسط' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                        {skill.level}
                                    </span>
                                    {isEditing && <button onClick={() => removeSkill(skill.name)} className="text-gray-300 hover:text-red-500 transition-colors"><i className="fas fa-times"></i></button>}
                                </div>
                            ))}
                            {editData.skills.length === 0 && !isEditing && <p className="text-gray-400 text-xs italic">لم تضف أي مهارات بعد.</p>}
                        </div>
                    </div>

                    {/* Quick Stats Edit (Simulated) */}
                    <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] p-8 rounded-[2rem] shadow-xl text-white">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><i className="fas fa-chart-pie"></i> إحصائياتي</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="opacity-70">المشاريع المكتملة</span>
                                <span className="font-black">{editData.stats.completedProjects}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="opacity-70">التقييم</span>
                                <span className="font-black">{editData.stats.rating} <i className="fas fa-star text-yellow-300"></i></span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70">رضا العملاء</span>
                                <span className="font-black">{editData.stats.satisfactionRate}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isAvatarEditorOpen && (
                <AvatarEditorModal
                    currentConfig={editData.avatar}
                    name={editData.name}
                    onClose={() => setIsAvatarEditorOpen(false)}
                    onSave={(conf) => setEditData({...editData, avatar: conf})}
                />
            )}
        </div>
    );
};

export default DashboardProfile;
