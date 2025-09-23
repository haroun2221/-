
import React, { useState, useMemo, useEffect } from 'react';
import { freelancersData } from '../data/mockData';
import type { Freelancer } from '../types';
import Pagination from '../components/Pagination';
import { FREELANCER_CATEGORIES, FREELANCER_SUBCATEGORIES } from '../constants';

interface FreelancersPageProps {
    onSelectFreelancer: (id: number) => void;
}

const FreelancerCard: React.FC<{ freelancer: Freelancer; onSelect: (id: number) => void }> = ({ freelancer, onSelect }) => (
    <div 
        onClick={() => onSelect(freelancer.id)} 
        className="bg-white rounded-xl overflow-hidden shadow-sm border border-transparent p-5 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:border-[var(--primary)] hover:-translate-y-2"
    >
        <div className="flex items-center mb-4">
            <img src={freelancer.image} alt={freelancer.name} className="w-16 h-16 rounded-full ml-4" />
            <div>
                <h3 className="font-bold text-lg text-[var(--primary-dark)]">{freelancer.name}</h3>
                <div className="text-yellow-400 text-sm flex items-center gap-1">
                    <span>{freelancer.rating.toFixed(1)}</span>
                    <i className="fas fa-star"></i>
                    <span className="text-gray-500">({freelancer.reviews} مراجعة)</span>
                </div>
            </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{freelancer.description}</p>
        <div className="flex flex-wrap gap-2">
            {freelancer.skills.slice(0, 3).map(skill => 
                <span key={skill} className="bg-[var(--primary-lightest)] text-[var(--primary-dark)] px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
            )}
        </div>
    </div>
);

const FilterDropdown: React.FC<{ options: { [key: string]: string }, value: string, label: string, icon: string, onChange: (value: string) => void }> = ({ options, value, label, icon, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentLabel = options[value];

    useEffect(() => {
        const close = () => setIsOpen(false);
        if (isOpen) {
            window.addEventListener('click', close);
        }
        return () => window.removeEventListener('click', close);
    }, [isOpen]);

    return (
        <div className="relative">
            <div 
                className={`flex items-center gap-2 bg-gray-100 border-2 border-transparent rounded-lg px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-300 min-w-[180px] hover:bg-white hover:border-[var(--primary-dark)] ${value !== 'all' ? 'bg-gradient-to-l from-[var(--primary-dark)] to-[var(--secondary)] text-white border-transparent' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
            >
                <i className={`fas ${icon}`}></i>
                <span className="flex-grow">{currentLabel}</span>
                <i className="fas fa-chevron-down ml-auto"></i>
            </div>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[220px] max-h-60 overflow-y-auto z-50">
                    {Object.entries(options).map(([key, name]) => (
                        <div key={key} onClick={() => onChange(key)} className={`p-3 cursor-pointer hover:bg-gray-100 ${key === value ? 'bg-[var(--primary-lightest)] text-[var(--primary-dark)]' : ''}`}>
                            {name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FreelancersPage: React.FC<FreelancersPageProps> = ({ onSelectFreelancer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [subcategory, setSubcategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredFreelancers = useMemo(() => {
        return freelancersData.filter(f =>
            (searchTerm.length < 2 || 
             f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             f.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
             f.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (category === 'all' || f.category === category) &&
            (subcategory === 'all' || f.subcategory === subcategory)
        );
    }, [searchTerm, category, subcategory]);

    const paginatedFreelancers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredFreelancers.slice(start, start + itemsPerPage);
    }, [currentPage, filteredFreelancers, itemsPerPage]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setCategory('all');
        setSubcategory('all');
        setCurrentPage(1);
    };
    
    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, category, subcategory]);

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-shadow duration-300 hover:shadow-xl">
                    <div className="relative mb-4">
                        <button className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--primary-dark)] text-xl"><i className="fas fa-search"></i></button>
                        <input 
                            type="text" 
                            className="w-full pl-8 pr-14 py-4 border-2 border-transparent rounded-full text-base bg-gray-100 focus:bg-white focus:border-[var(--primary-dark)] focus:ring-2 focus:ring-[var(--primary-lightest)] outline-none transition-all duration-300"
                            placeholder="ابحث بالاسم، المهارة أو الوصف..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap items-center">
                        <FilterDropdown options={FREELANCER_CATEGORIES} value={category} label="التصنيفات الرئيسية" icon="fa-th-large" onChange={setCategory} />
                        <FilterDropdown options={FREELANCER_SUBCATEGORIES} value={subcategory} label="التصنيفات الفرعية" icon="fa-list" onChange={setSubcategory} />
                        <button onClick={handleClearFilters} className="text-gray-600 hover:text-[var(--primary-dark)] transition-colors text-sm font-medium">
                            <i className="fas fa-times mr-2"></i>إلغاء الفلاتر
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[var(--primary-dark)]">{filteredFreelancers.length} مستقل</h2>
                </div>

                {paginatedFreelancers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {paginatedFreelancers.map(f => (
                            <FreelancerCard key={f.id} freelancer={f} onSelect={onSelectFreelancer} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <i className="fas fa-search text-5xl mb-4"></i>
                        <h3 className="text-2xl font-bold">لا توجد نتائج</h3>
                        <p>حاول تعديل كلمات البحث أو الفلاتر.</p>
                    </div>
                )}
                
                <Pagination 
                    currentPage={currentPage}
                    totalItems={filteredFreelancers.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default FreelancersPage;