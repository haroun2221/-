
import type { Freelancer, Product, Notification } from '../types';

export const freelancersData: Freelancer[] = [
     { id: 1, name: 'محمد أحمد', title: 'مطور ويب متخصص', rating: 4.8, reviews: 42, image: 'https://placehold.co/80x80/2E3D80/ffffff?text=M', description: 'خبير في React و Node.js لبناء تطبيقات ويب متقدمة.', skills: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'TypeScript'], category: 'web', subcategory: 'webdev', bio: 'مطور ويب بخبرة تزيد عن 5 سنوات في بناء حلول برمجية متكاملة للشركات الناشئة والكبرى. أركز على كتابة كود نظيف وقابل للتطوير، وأؤمن بأهمية تجربة المستخدم السلسة. شغوف بتحويل الأفكار إلى منتجات رقمية ناجحة.', projects: [{title: 'لوحة تحكم لمتجر', img: 'https://placehold.co/600x400/212B5A/ffffff?text=Project1'}, {title: 'موقع تعريفي لشركة', img: 'https://placehold.co/600x400/212B5A/ffffff?text=Project2'}, {title: 'تطبيق حجوزات فندقية', img: 'https://placehold.co/600x400/212B5A/ffffff?text=Project3'}] },
     { id: 2, name: 'سارة علي', title: 'مصممة جرافيك محترفة', rating: 5.0, reviews: 28, image: 'https://placehold.co/80x80/F28123/ffffff?text=S', description: 'متخصصة في الهوية البصرية والتصميم التفاعلي باستخدام Figma.', skills: ['Adobe Illustrator', 'Figma', 'Photoshop', 'Branding', 'UI/UX'], category: 'design', subcategory: 'ui', bio: 'مصممة شغوفة بالتفاصيل والألوان. أساعد العلامات التجارية على التميز من خلال هويات بصرية فريدة وتجارب مستخدم لا تُنسى. أعمل بشكل وثيق مع العملاء لفهم رؤيتهم وتحويلها إلى تصاميم جذابة وفعالة.', projects: [{title: 'هوية بصرية لعلامة تجارية', img: 'https://placehold.co/600x400/D86B10/ffffff?text=Project1'}, {title: 'تصميم واجهة تطبيق', img: 'https://placehold.co/600x400/D86B10/ffffff?text=Project2'}] },
     { id: 3, name: 'يوسف خالد', title: 'مسوق رقمي وخبير SEO', rating: 4.2, reviews: 35, image: 'https://placehold.co/80x80/2E3D80/ffffff?text=Y', description: 'أساعدك على تصدر نتائج البحث وزيادة مبيعاتك عبر الإنترنت.', skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Content Marketing'], category: 'marketing', subcategory: 'seo', bio: 'خبير تسويق رقمي معتمد من جوجل. أمتلك خبرة واسعة في تحسين محركات البحث (SEO) وإدارة الحملات الإعلانية المدفوعة. أهدف إلى تحقيق نتائج ملموسة لعملائي من خلال استراتيجيات تسويقية مبنية على البيانات.', projects: [{title: 'حملة إعلانية ناجحة', img: 'https://placehold.co/600x400/212B5A/ffffff?text=Project1'}]},
     { id: 4, name: 'نورا بوعزة', title: 'كاتبة محتوى إبداعي', rating: 4.7, reviews: 56, image: 'https://placehold.co/80x80/F28123/ffffff?text=N', description: 'كتابة مقالات تسويقية إبداعية تجذب القراء وتحقق الأهداف.', skills: ['كتابة محتوى', 'SEO', 'ترجمة', 'Copywriting'], category: 'writing', subcategory: 'copywriting', bio: 'أصنع الكلمات التي تروي قصة علامتك التجارية وتتواصل مع جمهورك. متخصصة في كتابة المحتوى التسويقي والمقالات المتوافقة مع محركات البحث (SEO) التي تزيد من الوعي والتفاعل.', projects: [{title: 'محتوى لمدونة تقنية', img: 'https://placehold.co/600x400/D86B10/ffffff?text=Project1'}, {title: 'كتابة إعلانات سوشيال ميديا', img: 'https://placehold.co/600x400/D86B10/ffffff?text=Project2'}]},
     { id: 5, name: 'عمر سالم', title: 'مطور تطبيقات Flutter', rating: 5.0, reviews: 31, image: 'https://placehold.co/80x80/2E3D80/ffffff?text=O', description: 'أقوم ببناء تطبيقات هواتف احترافية وسريعة لكلا النظامين.', skills: ['Flutter', 'React Native', 'Dart', 'Firebase'], category: 'programming', subcategory: 'mobile', bio: 'مطور تطبيقات محترف متخصص في Flutter. أقوم ببناء تطبيقات جميلة وعالية الأداء تعمل بسلاسة على أنظمة iOS و Android من قاعدة كود واحدة. أسعى دائمًا لتقديم أفضل تجربة مستخدم ممكنة.', projects: [{title: 'تطبيق توصيل طعام', img: 'https://placehold.co/600x400/212B5A/ffffff?text=Project1'}, {title: 'تطبيق رياضي', img: 'https://placehold.co/600x400/212B5A/ffffff?text=Project2'}]},
     { id: 6, name: 'فاطمة بوضياف', title: 'مصممة واجهات UI/UX', rating: 4.3, reviews: 19, image: 'https://placehold.co/80x80/F28123/ffffff?text=F', description: 'تصميم واجهات مستخدم سهلة وجميلة تضمن أفضل تجربة.', skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'], category: 'design', subcategory: 'ui', bio: 'أصمم تجارب رقمية تتمحور حول الإنسان. أجمع بين البحث العميق للمستخدمين والتصميم الجذاب لإنشاء منتجات سهلة الاستخدام وممتعة. هدفي هو سد الفجوة بين أهداف العمل واحتياجات المستخدم.', projects: [{title: 'إعادة تصميم موقع إخباري', img: 'https://placehold.co/600x400/D86B10/ffffff?text=Project1'}]}
];

export const productsData: Product[] = [
    {
        id: 1,
        title: 'قالب متجر إلكتروني احترافي',
        category: 'مواقع جاهزة',
        price: 15000,
        old_price: 20000,
        rating: 4.8,
        images: [
            'https://placehold.co/800x600/2E3D80/ffffff?text=Main+View',
            'https://placehold.co/800x600/3c4d99/ffffff?text=Products+Page',
            'https://placehold.co/800x600/5063b3/ffffff?text=Shopping+Cart',
            'https://placehold.co/800x600/6b7fcc/ffffff?text=Admin+Dashboard'
        ],
        description: 'قالب متكامل مع جميع المميزات اللازمة لبدء متجرك الإلكتروني. تصميم عصري ومتجاوب مع جميع الأجهزة، لوحة تحكم سهلة الاستخدام، ودعم فني متكامل. مبني بأحدث التقنيات لضمان سرعة الأداء. مثالي لعرض منتجاتك بطريقة احترافية وجذابة لزيادة المبيعات.',
        sales: 125,
        reviews: [
            { name: 'علي حسن', rating: 5, comment: 'قالب رائع وسهل التخصيص. الدعم الفني كان ممتازاً ومتجاوباً جداً. أنصح به بشدة!' },
            { name: 'فاطمة الزهراء', rating: 4, comment: 'تصميم جميل جداً، لكن واجهت بعض الصعوبة في تركيب إضافة الدفع. بشكل عام منتج جيد.' },
            { name: 'يوسف إبراهيم', rating: 5, comment: 'من أفضل القوالب التي استخدمتها. كل شيء يعمل كما هو متوقع والتوثيق واضح.' }
        ]
    },
    {
        id: 2,
        title: 'مجموعة شعارات احترافية',
        category: 'تصاميم جاهزة',
        price: 8000,
        old_price: 10000,
        rating: 5.0,
        images: [
            'https://placehold.co/800x600/F28123/ffffff?text=Logo+Collection',
            'https://placehold.co/800x600/f3923a/ffffff?text=Tech+Logo',
            'https://placehold.co/800x600/f5a352/ffffff?text=Food+Logo',
            'https://placehold.co/800x600/f7b46a/ffffff?text=Real+Estate+Logo'
        ],
        description: 'مجموعة تضم 50 شعار احترافي جاهز للاستخدام والتعديل. مثالية للشركات الناشئة والمشاريع الصغيرة التي تحتاج إلى هوية بصرية سريعة ومميزة. الملفات بصيغة AI و SVG قابلة للتعديل بالكامل.',
        sales: 210,
        reviews: [
            { name: 'خديجة مراد', rating: 5, comment: 'وفرت علي الكثير من الوقت والجهد. الشعارات متنوعة وجميلة جداً.' },
            { name: 'أمين بلقاسم', rating: 5, comment: 'جودة عالية وتصاميم عصرية. قيمة ممتازة مقابل السعر.' }
        ]
    },
    { id: 3, title: 'كتاب عن التسويق الرقمي', category: 'كتب جاهزة', price: 5000, rating: 4.2, images: ['https://placehold.co/800x600/2E3D80/ffffff?text=eBook+Cover', 'https://placehold.co/800x600/3c4d99/ffffff?text=Chapter+1', 'https://placehold.co/800x600/5063b3/ffffff?text=Infographics', 'https://placehold.co/800x600/6b7fcc/ffffff?text=Conclusion'], description: 'دليل شامل للتسويق الرقمي للمبتدئين والمحترفين. يغطي الكتاب استراتيجيات SEO، التسويق عبر وسائل التواصل الاجتماعي، والحملات الإعلانية.', sales: 88, reviews: [{name: 'أحمد صالح', rating: 4, comment: 'محتوى قيم ومفيد.'}] },
    { id: 4, title: 'قوالب عروض تقديمية', category: 'قوالب جاهزة', price: 12000, old_price: 15000, rating: 4.7, images: ['https://placehold.co/800x600/F28123/ffffff?text=Presentation', 'https://placehold.co/800x600/f3923a/ffffff?text=Slide+1', 'https://placehold.co/800x600/f5a352/ffffff?text=Slide+2', 'https://placehold.co/800x600/f7b46a/ffffff?text=Slide+3'], description: '20 قالب عروض تقديمية احترافية جاهزة للاستخدام على PowerPoint و Google Slides. تتميز بتصاميم عصرية ورسوم بيانية قابلة للتعديل.', sales: 95, reviews: [{name: 'نورة كريم', rating: 5, comment: 'تصاميم حديثة واحترافية.'}] },
    { id: 5, title: 'مجموعة أيقونات احترافية', category: 'رسوميات جاهزة', price: 7000, rating: 4.9, images: ['https://placehold.co/800x600/2E3D80/ffffff?text=Icon+Set', 'https://placehold.co/800x600/3c4d99/ffffff?text=Business+Icons', 'https://placehold.co/800x600/5063b3/ffffff?text=Tech+Icons', 'https://placehold.co/800x600/6b7fcc/ffffff?text=Medical+Icons'], description: '500 أيقونة احترافية بصيغة PNG و SVG. تغطي مجالات مختلفة مثل الأعمال، التكنولوجيا، والتعليم.', sales: 150, reviews: [{name: 'سالم محمد', rating: 5, comment: 'جودة عالية جداً ومجموعة شاملة.'}] },
    { id: 6, title: 'سكريبت إدارة مهام', category: 'سكريبتات جاهزة', price: 10000, rating: 4.6, images: ['https://placehold.co/800x600/F28123/ffffff?text=Task+Manager', 'https://placehold.co/800x600/f3923a/ffffff?text=Dashboard', 'https://placehold.co/800x600/f5a352/ffffff?text=Projects', 'https://placehold.co/800x600/f7b46a/ffffff?text=Users'], description: 'نظام لإدارة المشاريع والمهام لفريق عملك. مبني بلغة PHP و MySQL. سهل التركيب والاستخدام.', sales: 64, reviews: [{name: 'شركة الابتكار', rating: 4, comment: 'ساعدنا في تنظيم عملنا بشكل كبير.'}] }
];

export const notificationsData: Notification[] = [
    { id: 1, from: 'سارة علي', message: 'مرحباً، لقد أرسلت لك الملفات المطلوبة.', time: 'منذ 5 دقائق', read: false, image: 'https://placehold.co/80x80/F28123/ffffff?text=S', freelancerId: 2 },
    { id: 2, from: 'يوسف خالد', message: 'هل يمكنك مراجعة التعديلات الجديدة؟', time: 'منذ 20 دقيقة', read: false, image: 'https://placehold.co/80x80/2E3D80/ffffff?text=Y', freelancerId: 3 },
    { id: 3, from: 'إدارة الموقع', message: 'مرحباً بك في SaaHla! ملفك الشخصي مكتمل.', time: 'منذ 1 ساعة', read: true, image: 'https://i.ibb.co/9gq85f4/photo-2025-09-17-12-03-57.jpg' }
];
