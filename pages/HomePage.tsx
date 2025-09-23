
import React from 'react';
import FaqItem from '../components/FaqItem';

interface HomePageProps {
    onHireTalentClick: () => void;
    onStartNowClick: () => void;
}

const ServiceCard: React.FC<{ icon: string, title: string, description: string, projects: number, rating: number, color: 'primary' | 'secondary' }> = ({ icon, title, description, projects, rating, color }) => (
    <div className="bg-gray-50 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-xl">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${color === 'primary' ? 'bg-[var(--primary-lightest)]' : 'bg-[var(--secondary-light)]'}`}>
            <i className={`fas ${icon} text-3xl ${color === 'primary' ? 'text-[var(--primary-dark)]' : 'text-[var(--secondary)]'}`}></i>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-[var(--primary-dark)]">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex justify-center space-x-2 text-sm text-gray-500">
            <span><i className="fas fa-briefcase ml-1 text-gray-400"></i>{projects}+ مشاركة</span>
            <span>•</span>
            <span><i className="fas fa-star ml-1 text-gray-400"></i>{rating} تقييم</span>
        </div>
    </div>
);

const ReviewCard: React.FC<{ name: string, role: string, avatar: string, review: string, color: 'primary' | 'secondary' }> = ({ name, role, avatar, review, color }) => (
    <div className="bg-gray-50 rounded-xl p-8 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-center mb-4">
            <img src={avatar} alt="Testimonial" className="w-12 h-12 rounded-full ml-4" />
            <div>
                <h4 className="font-bold text-[var(--primary-dark)]">{name}</h4>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
        <div className="text-yellow-400 mb-4">
            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
        </div>
        <div className="relative">
            <i className={`fas fa-quote-right opacity-10 text-3xl absolute right-0 top-0 ${color === 'primary' ? 'text-[var(--primary-dark)]' : 'text-[var(--secondary)]'}`}></i>
            <p className="text-gray-600 z-10 relative">{review}</p>
        </div>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ onHireTalentClick, onStartNowClick }) => {
    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--secondary)] text-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">اكتشف أفضل المواهب الحرية في الجزائر</h1>
                        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">تواصل مع آلاف المستقلين المحترفين لتنفيذ مشاريعك بأعلى جودة وأفضل الأسعار</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={onHireTalentClick} className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white px-8 py-4 rounded-full text-lg font-medium transition-transform duration-300 hover:scale-105 shadow-lg">
                                <i className="fas fa-briefcase ml-2"></i> توظيف المواهب
                            </button>
                            <button className="btn border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white hover:text-[var(--primary-dark)]">
                                <i className="fas fa-user ml-2"></i> البحث عن عمل
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6"><h3 className="text-4xl font-bold mb-2"><i className="fas fa-rocket text-[var(--secondary)]"></i> 10,000+</h3><p className="text-lg">مشاركة منجزة</p></div>
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6"><h3 className="text-4xl font-bold mb-2"><i className="fas fa-user-friends text-[var(--secondary)]"></i> 5,000+</h3><p className="text-lg">مستقلين نشطين</p></div>
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6"><h3 className="text-4xl font-bold mb-2"><i className="fas fa-star text-[var(--secondary)]"></i> 98%</h3><p className="text-lg">رضا العملاء</p></div>
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6"><h3 className="text-4xl font-bold mb-2"><i className="fas fa-headset text-[var(--secondary)]"></i> 24/7</h3><p className="text-lg">دعم متواصل</p></div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4 text-[var(--primary-dark)]">خدماتنا المميزة</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">اكتشف خدمات متنوعة تلبي جميع احتياجاتك المهنية</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ServiceCard icon="fa-code" title="تطوير المواقع" description="مواقع احترافية وتطبيقات ويب متقدمة" projects={500} rating={4.9} color="primary" />
                        <ServiceCard icon="fa-mobile-alt" title="تطوير التطبيقات" description="تطبيقات iOS و Android احترافية" projects={300} rating={4.8} color="secondary" />
                        <ServiceCard icon="fa-paint-brush" title="التصميم الجرافيكي" description="شعارات وهوية بصرية احترافية" projects={400} rating={4.9} color="primary" />
                        <ServiceCard icon="fa-chart-line" title="التسويق الرقمي" description="استراتيجيات تسويق ناجحة للنمو" projects={200} rating={4.7} color="secondary" />
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4 text-[var(--primary-dark)]">كيف نعمل معاً</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">خطوات سهلة للوصول إلى أفضل النتائج</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center"><div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--secondary)] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl font-bold text-white">1</span></div><h3 className="text-2xl font-bold mb-4 text-[var(--primary-dark)]"><i className="fas fa-paper-plane text-[var(--primary)] mr-2"></i>نشر مشروعك</h3><p className="text-gray-600">صف متطلباتك والميزانية، وسنقوم بمطابقتك مع أفضل المواهب</p></div>
                        <div className="text-center"><div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--secondary)] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl font-bold text-white">2</span></div><h3 className="text-2xl font-bold mb-4 text-[var(--primary-dark)]"><i className="fas fa-search-dollar text-[var(--secondary)] mr-2"></i>مراجعة العروض</h3><p className="text-gray-600">استقبل عروض من أفضل المستقلين وقارن المهارات والأسعار</p></div>
                        <div className="text-center"><div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--secondary)] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl font-bold text-white">3</span></div><h3 className="text-2xl font-bold mb-4 text-[var(--primary-dark)]"><i className="fas fa-rocket text-[var(--primary)] mr-2"></i>ابدأ العمل</h3><p className="text-gray-600">ابدأ التعامل بأمان عبر منصتنا مع ضمان الجودة والدفع عند الرضا</p></div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4 text-[var(--primary-dark)]">ماذا يقول عملاؤنا</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">تجارب حقيقية من عملاء راضين</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ReviewCard name="أحمد محمد" role="مدير شركة تقنية" avatar="https://placehold.co/60x60/2E3D80/ffffff?text=k" review="منصة ممتازة وجدت المطور المناسب لمشروعي في وقت قياسي. الجودة استثنائية والدعم متواصل." color="primary" />
                        <ReviewCard name="فاطمة علي" role="مصممة جرافيك" avatar="https://placehold.co/60x60/F28123/ffffff?text=F" review="المنصة أعطتني فرصة للعمل مع عملاء من مختلف أنحاء الجزائر. الدفع آمن والمشاريع متنوعة." color="secondary" />
                        <ReviewCard name="يوسف خالد" role="مسوق رقمي" avatar="https://placehold.co/60x60/2E3D80/ffffff?text=Y" review="أفضل منصة للعمل الحر في الجزائر. سهولة الاستخدام وجودة المشاريع ممتازة." color="primary" />
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-20 bg-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4 text-[var(--primary-dark)]">الأسئلة الشائعة</h2><p className="text-xl text-gray-600">أجوبة لأكثر الأسئلة التي قد تخطر ببالك.</p></div>
                    <div className="space-y-4">
                        <FaqItem question="كيف أضمن جودة العمل من المستقل؟"><p>في SaaHla، يمكنك مراجعة تقييمات المستقل السابقة وأعماله السابقة. كما أننا لا نسلم المبلغ للمستقل إلا بعد أن تؤكد رضاك عن العمل المُنجز، مما يضمن لك أعلى مستويات الجودة.</p></FaqItem>
                        <FaqItem question="ما هي طرق الدفع المتاحة؟"><p>نوفر عدة طرق دفع آمنة وموثوقة، بما في ذلك البطاقات البنكية والتحويلات. جميع المعاملات المالية محمية بالكامل لضمان أمان أموالك.</p></FaqItem>
                        <FaqItem question="هل يمكنني طلب تعديلات بعد استلام العمل؟"><p>بالتأكيد. يمكنك التواصل مع المستقل لطلب أي تعديلات ضمن نطاق الاتفاق الأولي. هدفنا هو رضاك الكامل عن الخدمة المقدمة.</p></FaqItem>
                        <FaqItem question="ماذا لو حدث خلاف مع المستقل؟"><p>في حال حدوث أي خلاف، يتدخل فريق الدعم لدينا كوسيط لحل المشكلة بشكل عادل لكلا الطرفين. يمكنك فتح نزاع من خلال صفحة المشروع، وسيقوم فريقنا بمراجعة الموقف.</p></FaqItem>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--secondary)] py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">جاهز لبدء رحلتك؟</h2>
                    <p className="text-xl text-white mb-8 opacity-90">انضم لمئات العملاء والمستقلين الذين حققوا نجاحهم على منصتنا</p>
                    <div className="flex justify-center space-x-4">
                        <button onClick={onStartNowClick} className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white px-8 py-4 rounded-full text-lg font-medium transition-transform duration-300 hover:scale-105 shadow-lg"><i className="fas fa-rocket ml-2"></i> ابدأ الآن</button>
                        <button className="btn border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white hover:text-[var(--primary-dark)]"><i className="fas fa-info-circle ml-2"></i> تعرف على المزيد</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;