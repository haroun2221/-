import React from 'react';
import type { Page } from '../App';

interface FooterProps {
    page: Page;
    onNavigate: (page: Page) => void;
}

const ProfessionalFooter: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <footer className="bg-[var(--primary-dark)] text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="mb-8 md:mb-0">
                    <img src="https://i.ibb.co/FqCkWMNC/photo-2025-09-17-12-03-57.jpg" alt="SaaHla Logo" className="h-12 w-auto mb-4 rounded-lg" />
                    <p className="text-gray-400">منصة SaaHla هي وجهتك الأولى للعثور على أفضل المستقلين في الجزائر لتنفيذ مشاريعك بكل احترافية وجودة.</p>
                    <div className="flex space-x-4 mt-6">
                        <a href="#" className="text-gray-400 hover:text-white text-2xl transition-transform duration-300 hover:scale-110"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-2xl transition-transform duration-300 hover:scale-110"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-2xl transition-transform duration-300 hover:scale-110"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-2xl transition-transform duration-300 hover:scale-110"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4"><i className="fas fa-link ml-2"></i>روابط سريعة</h3>
                    <ul className="space-y-3">
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onNavigate('freelancers')}} className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>تصفح المستقلين</a></li>
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onNavigate('products')}} className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>المنتجات الجاهزة</a></li>
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onNavigate('how-it-works')}} className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>كيف يعمل الموقع</a></li>
                        <li><a href="#" className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>المدونة</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4"><i className="fas fa-life-ring ml-2"></i>الدعم</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>مركز المساعدة</a></li>
                        <li><a href="#" className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>الأسئلة الشائعة</a></li>
                        <li><a href="#" className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>سياسة الخصوصية</a></li>
                        <li><a href="#" className="hover:text-[var(--secondary)] transition-colors"><i className="fas fa-chevron-left ml-2 text-xs"></i>شروط الاستخدام</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4"><i className="fas fa-envelope-open-text ml-2"></i>اشترك في نشرتنا</h3>
                    <p className="text-gray-400 mb-4">كن أول من يعرف عن آخر المشاريع والنصائح في عالم العمل الحر.</p>
                    <form className="flex">
                        <input type="email" placeholder="بريدك الإلكتروني" className="bg-white/10 border border-white/20 w-full px-4 py-2 rounded-r-md focus:ring-2 focus:ring-[var(--secondary)] outline-none text-white" />
                        <button type="submit" className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-4 py-2 rounded-l-md transition-colors"><i className="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} SaaHla. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>
);

const SimpleFooter: React.FC = () => (
    <footer className="bg-gray-100 text-gray-600 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} SaaHla. جميع الحقوق محفوظة.</p>
    </footer>
);


const Footer: React.FC<FooterProps> = ({ page, onNavigate }) => {
    const simplePages: Page[] = ['freelancers', 'products', 'how-it-works', 'freelancer-profile', 'communication'];
    
    if (page === 'home') {
        return <ProfessionalFooter onNavigate={onNavigate} />;
    }
    
    if (simplePages.includes(page)) {
        return <SimpleFooter />;
    }

    return null;
};

export default Footer;