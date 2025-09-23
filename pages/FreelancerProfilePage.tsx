
import React from 'react';
import type { Freelancer } from '../types';

interface FreelancerProfilePageProps {
    freelancer: Freelancer;
    onStartCommunication: (id: number) => void;
}

const FreelancerProfilePage: React.FC<FreelancerProfilePageProps> = ({ freelancer, onStartCommunication }) => {
    return (
        <div className="animate-[profileZoomIn_0.4s_ease-out]">
            <div 
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://placehold.co/1200x400/2E3D80/A8B0D1?text=Portfolio+Banner')` }}
            ></div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 -mt-20 relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right">
                        <img 
                            src={freelancer.image} 
                            alt={freelancer.name} 
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-24 mb-4 md:mb-0 md:ml-8"
                        />
                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-[var(--primary-dark)]">{freelancer.name}</h1>
                            <p className="text-xl text-gray-500 mt-1">{freelancer.title}</p>
                            <div className="flex items-center justify-center md:justify-start text-yellow-400 mt-2">
                                <span className="font-bold text-lg ml-1 text-gray-800">{freelancer.rating.toFixed(1)}</span>
                                <i className="fas fa-star ml-2"></i>
                                <span className="text-gray-600">({freelancer.reviews} مراجعة)</span>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <button 
                                onClick={() => onStartCommunication(freelancer.id)}
                                className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                <i className="fas fa-paper-plane ml-2"></i> تواصل معي
                            </button>
                        </div>
                    </div>
                    <div className="border-t my-8"></div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[var(--primary-dark)]">نبذة عني</h3>
                        <p className="text-gray-600 leading-relaxed">{freelancer.bio}</p>
                    </div>
                    <div className="border-t my-8"></div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[var(--primary-dark)]">المهارات</h3>
                        <div className="flex flex-wrap gap-3">
                            {freelancer.skills.map(skill => (
                                <span key={skill} className="bg-[var(--primary-lightest)] text-[var(--primary-dark)] font-medium px-4 py-2 rounded-full text-md cursor-pointer transition-all duration-200 hover:bg-[var(--primary-dark)] hover:text-white hover:scale-105">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="border-t my-8"></div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-[var(--primary-dark)]">أعمالي ومشاريعي</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {freelancer.projects.map(p => (
                                <div key={p.title} className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group">
                                    <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
                                    <div className="p-4 bg-white">
                                        <h4 className="font-bold text-lg text-gray-800 group-hover:text-[var(--primary-dark)] transition-colors">{p.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerProfilePage;