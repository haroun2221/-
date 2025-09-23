
import React, { useState, useMemo, useEffect } from 'react';
import { productsData } from '../data/mockData';
import type { Product } from '../types';
import Pagination from '../components/Pagination';
import { PRODUCT_CATEGORIES } from '../constants';

interface ProductsPageProps {
    onSelectProduct: (id: number) => void;
}

const ProductCard: React.FC<{ product: Product; onSelect: (id: number) => void }> = ({ product, onSelect }) => (
    <div 
        onClick={() => onSelect(product.id)}
        className="bg-white rounded-xl overflow-hidden shadow-sm border border-transparent flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:border-[var(--primary-dark)] hover:-translate-y-2 group"
    >
        <div className="h-48 overflow-hidden">
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5 flex-grow flex flex-col">
            <h3 className="font-bold text-lg h-14 text-[var(--primary-dark)]">{product.title}</h3>
            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-[var(--primary-dark)] bg-[var(--primary-lightest)] px-3 py-1 rounded-full">{product.category}</span>
                <span className="text-lg font-bold text-[var(--primary-dark)]">{product.price.toLocaleString()} دج</span>
            </div>
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

const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectProduct }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredProducts = useMemo(() => {
        return productsData.filter(p =>
            (searchTerm.length < 2 || 
             p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             p.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (category === 'all' || p.category === category)
        );
    }, [searchTerm, category]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [currentPage, filteredProducts, itemsPerPage]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setCategory('all');
        setCurrentPage(1);
    };
    
    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, category]);

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-shadow duration-300 hover:shadow-xl">
                    <div className="relative mb-4">
                        <button className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--primary-dark)] text-xl"><i className="fas fa-search"></i></button>
                        <input 
                            type="text" 
                            className="w-full pl-8 pr-14 py-4 border-2 border-transparent rounded-full text-base bg-gray-100 focus:bg-white focus:border-[var(--primary-dark)] focus:ring-2 focus:ring-[var(--primary-lightest)] outline-none transition-all duration-300"
                            placeholder="ابحث بالاسم، الوصف أو التصنيف..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap items-center">
                        <FilterDropdown options={PRODUCT_CATEGORIES} value={category} label="التصنيفات الرئيسية" icon="fa-th-large" onChange={setCategory} />
                        <button onClick={handleClearFilters} className="text-gray-600 hover:text-[var(--primary-dark)] transition-colors text-sm font-medium">
                            <i className="fas fa-times mr-2"></i>إلغاء الفلاتر
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[var(--primary-dark)]">{filteredProducts.length} منتج</h2>
                </div>

                {paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {paginatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <i className="fas fa-box-open text-5xl mb-4"></i>
                        <h3 className="text-2xl font-bold">لا توجد منتجات</h3>
                        <p>حاول تعديل كلمات البحث أو الفلاتر.</p>
                    </div>
                )}
                
                <Pagination 
                    currentPage={currentPage}
                    totalItems={filteredProducts.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ProductsPage;