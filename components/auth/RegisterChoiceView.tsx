
import React from 'react';

interface RegisterChoiceViewProps {
    onChoice: (view: 'client-register-view' | 'freelancer-register-view') => void;
    onBack: () => void;
}

const ChoiceCard: React.FC<{ icon: string, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="border-2 border-slate-200 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden group hover:border-[var(--primary)] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[var(--primary-lightest)]"
    >
        <i className={`fas ${icon} text-5xl mb-4 text-[var(--primary)] transition-all duration-300 group-hover:text-[var(--secondary)] group-hover:scale-110 group-hover:-rotate-6`}></i>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 mt-2">{description}</p>
    </div>
);


const RegisterChoiceView: React.FC<RegisterChoiceViewProps> = ({ onChoice, onBack }) => {
    return (
        <div className="animate-[fadeIn_0.6s_ease-out]">
            <h1 className="text-3xl font-bold mb-4">انضم إلينا</h1>
            <p className="text-gray-600 mb-8">اختر نوع الحساب الذي يناسبك.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChoiceCard 
                    icon="fa-user-tie"
                    title="أنا زبون"
                    description="أبحث عن مستقلين لمشاريعي."
                    onClick={() => onChoice('client-register-view')}
                />
                <ChoiceCard 
                    icon="fa-user-cog"
                    title="أنا مستقل"
                    description="أبحث عن مشاريع للعمل عليها."
                    onClick={() => onChoice('freelancer-register-view')}
                />
            </div>
            <button onClick={onBack} className="text-gray-600 mt-8 hover:text-[var(--primary)] transition-colors">
                <i className="fas fa-chevron-right ml-2"></i> رجوع
            </button>
        </div>
    );
};

export default RegisterChoiceView;
