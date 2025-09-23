import React, { useState } from 'react';
import type { FreelancerProfileData, Service, Skill, PortfolioItem, AvatarConfig, ProfileReview } from '../../types';
import AvatarEditorModal from './AvatarEditorModal';
import Avatar from './Avatar';

const ProfileCard: React.FC<{ title: string; icon: string; children: React.ReactNode; actions?: React.ReactNode }> = ({ title, icon, children, actions }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <i className={`fas ${icon} text-[var(--primary)]`}></i>
                {title}
            </h2>
            {actions && <div>{actions}</div>}
        </div>
        <div>{children}</div>
    </div>
);

const SkillTag: React.FC<{ skill: Skill, isEditing?: boolean, onRemove?: () => void }> = ({ skill, isEditing, onRemove }) => {
    const levelColor = {
        'مبتدئ': 'bg-blue-100 text-blue-800',
        'متوسط': 'bg-green-100 text-green-800',
        'خبير': 'bg-orange-100 text-orange-800',
    };
    return (
        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-3">
            <span className="font-semibold text-gray-700">{skill.name}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${levelColor[skill.level]}`}>{skill.level}</span>
            {isEditing && (
                <button onClick={onRemove} className="text-red-500 hover:text-red-700">
                    <i className="fas fa-times-circle"></i>
                </button>
            )}
        </div>
    );
};

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className={`fas ${service.icon} text-2xl text-[var(--primary-dark)]`}></i>
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-gray-800">{service.title}</h4>
            <p className="text-sm text-green-600 font-semibold">يبدأ من {service.price} دج</p>
        </div>
        <button className="text-sm font-semibold bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
            اطلب الآن
        </button>
    </div>
);

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group">
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
        <div className="p-4 bg-white">
            <h4 className="font-bold text-lg text-gray-800 group-hover:text-[var(--primary-dark)] transition-colors">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.category} - {item.date}</p>
        </div>
    </div>
);

const ReviewCard: React.FC<{ review: ProfileReview }> = ({ review }) => {
    const stars = Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
    ));
    return (
        <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
            <div className="flex items-start gap-4">
                <img src={review.clientAvatar} alt={review.clientName} className="w-10 h-10 rounded-full" />
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-bold">{review.clientName}</h4>
                            <p className="text-xs text-gray-500">طلب خدمة "{review.service}"</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">{stars}</div>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                    {review.reply && (
                        <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm font-bold text-gray-800">ردك:</p>
                            <p className="text-sm text-gray-600">{review.reply}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface DashboardProfileProps {
    profile: FreelancerProfileData;
    onProfileChange: (newProfile: FreelancerProfileData) => void;
}

const DashboardProfile: React.FC<DashboardProfileProps> = ({ profile, onProfileChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    
    const [editableTagline, setEditableTagline] = useState(profile.tagline);
    const [editableAbout, setEditableAbout] = useState(profile.about);

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            onProfileChange({
                ...profile,
                tagline: editableTagline,
                about: editableAbout,
            });
        } else {
            // Enter edit mode
            setEditableTagline(profile.tagline);
            setEditableAbout(profile.about);
        }
        setIsEditing(!isEditing);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };
    
    const handleAvatarSave = (newAvatarConfig: AvatarConfig) => {
        onProfileChange({ ...profile, avatar: newAvatarConfig });
        setIsAvatarModalOpen(false);
    };

    return (
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
            {isAvatarModalOpen && (
                <AvatarEditorModal
                    currentConfig={profile.avatar}
                    onClose={() => setIsAvatarModalOpen(false)}
                    onSave={handleAvatarSave}
                />
            )}
            
            {/* Profile Header Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative flex-shrink-0">
                         <Avatar config={profile.avatar} size={128} />
                        {isEditing && (
                             <button onClick={() => setIsAvatarModalOpen(true)} className="absolute bottom-1 right-1 w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm shadow-md hover:bg-[var(--primary-dark)] transition-transform hover:scale-110">
                                <i className="fas fa-camera"></i>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow text-center sm:text-right">
                        <div className="flex justify-between items-start">
                             <div>
                                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                                {isEditing ? (
                                    <input 
                                        type="text"
                                        value={editableTagline}
                                        onChange={(e) => setEditableTagline(e.target.value)}
                                        className="w-full mt-1 px-2 py-1 border rounded-md"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-500 mt-1">{profile.tagline}</p>
                                )}
                                <div className="text-sm text-gray-500 mt-2 flex items-center justify-center sm:justify-start gap-4">
                                    <span><i className="fas fa-map-marker-alt ml-1"></i>{profile.location}</span>
                                    <span className={profile.isAvailable ? 'text-green-500' : 'text-gray-400'}>
                                        <i className="fas fa-circle ml-1"></i>{profile.isAvailable ? 'متاح للعمل' : 'غير متاح'}
                                    </span>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                {isEditing ? (
                                    <>
                                        <button onClick={handleEditToggle} className="btn bg-green-500 text-white px-4 py-2 rounded-lg">حفظ التغييرات</button>
                                        <button onClick={handleCancelEdit} className="btn bg-gray-500 text-white px-4 py-2 rounded-lg">إلغاء</button>
                                    </>
                                ) : (
                                    <button onClick={handleEditToggle} className="btn bg-[var(--primary-dark)] text-white px-4 py-2 rounded-lg">تعديل الملف الشخصي</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* About Card */}
                    <ProfileCard title="نبذة عني" icon="fa-user">
                         {isEditing ? (
                            <textarea
                                value={editableAbout}
                                onChange={(e) => setEditableAbout(e.target.value)}
                                className="w-full h-40 p-2 border rounded-md"
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profile.about}</p>
                        )}
                    </ProfileCard>
                    
                     {/* Services Card */}
                    <ProfileCard title="خدماتي" icon="fa-concierge-bell">
                        <div className="space-y-4">
                            {profile.services.map(service => <ServiceCard key={service.id} service={service} />)}
                        </div>
                    </ProfileCard>

                    {/* Portfolio Card */}
                    <ProfileCard title="أعمالي السابقة" icon="fa-briefcase">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {profile.portfolio.map(item => <PortfolioCard key={item.id} item={item} />)}
                        </div>
                    </ProfileCard>

                    {/* Reviews Card */}
                    <ProfileCard title="التقييمات" icon="fa-star">
                         <div>
                            {profile.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                        </div>
                    </ProfileCard>
                </div>
                <div className="space-y-8">
                     {/* Stats Card */}
                    <ProfileCard title="إحصائياتي" icon="fa-chart-bar">
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex justify-between items-center"><span>التقييم العام</span><span className="font-bold text-yellow-500">{profile.stats.rating} <i className="fas fa-star"></i> ({profile.stats.reviewsCount})</span></li>
                            <li className="flex justify-between items-center"><span>المشاريع المكتملة</span><span className="font-bold">{profile.stats.completedProjects}</span></li>
                            <li className="flex justify-between items-center"><span>رضا العملاء</span><span className="font-bold text-green-600">{profile.stats.satisfactionRate}%</span></li>
                        </ul>
                    </ProfileCard>

                    {/* Skills Card */}
                    <ProfileCard title="مهاراتي" icon="fa-cogs">
                        <div className="flex flex-wrap gap-3">
                            {profile.skills.map(skill => <SkillTag key={skill.name} skill={skill} isEditing={isEditing} />)}
                        </div>
                    </ProfileCard>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
