
import type { Transaction, EarningsSource, Notification } from '../types';

export const dashboardData = {
    monthlyEarnings: 75000,
    completedProjects: 8,
    ongoingProjects: 2,
    overallRating: 4.9,
    earningsData: [
        { month: 'مارس', earnings: 65000 },
        { month: 'أبريل', earnings: 72000 },
        { month: 'مايو', earnings: 68000 },
        { month: 'يونيو', earnings: 85000 },
        { month: 'يوليو', earnings: 78000 },
        { month: 'أغسطس', earnings: 92000 },
    ],
    recentActivities: [
        { id: 1, icon: 'fa-check', iconColor: 'bg-green-500', description: 'تم إكمال مشروع "تصميم شعار لشركة ناشئة".', time: 'منذ ساعتين' },
        { id: 2, icon: 'fa-comment', iconColor: 'bg-blue-500', description: 'رسالة جديدة من العميل "أحمد علي".', time: 'منذ 5 ساعات' },
        { id: 3, icon: 'fa-file-alt', iconColor: 'bg-orange-500', description: 'تلقيت عرضاً جديداً لمشروع "تطوير موقع".', time: 'أمس' },
        { id: 4, icon: 'fa-star', iconColor: 'bg-yellow-500', description: 'تقييم جديد 5 نجوم من "فاطمة ب.".', time: 'منذ يومين' },
    ],
    profileCompletion: 85,
};

export const earningsPageData = {
    summary: {
        availableBalance: 125000,
        pendingBalance: 50000,
        totalEarnings: 850000,
        monthlyEarnings: 92000,
    },
    earningsBySource: [
        { category: 'تطوير المواقع', amount: 425000, percentage: 50, color: '#3B82F6' },
        { category: 'التصميم والجرافيك', amount: 255000, percentage: 30, color: '#F97316' },
        { category: 'الكتابة والترجمة', amount: 170000, percentage: 20, color: '#10b981' },
    ] as EarningsSource[],
    transactions: [
        { id: 1, date: '2024-08-28', description: 'إيداع أرباح مشروع "تصميم واجهة مستخدم"', type: 'income', amount: 30000, status: 'completed' },
        { id: 2, date: '2024-08-25', description: 'سحب أرباح إلى الحساب البنكي', type: 'withdrawal', amount: -100000, status: 'completed' },
        { id: 3, date: '2024-08-22', description: 'عمولة الموقع لمشروع "كتابة مقالات"', type: 'fee', amount: -2500, status: 'completed' },
        { id: 4, date: '2024-08-20', description: 'إيداع أرباح مشروع "كتابة 5 مقالات"', type: 'income', amount: 25000, status: 'completed' },
        { id: 5, date: '2024-08-18', description: 'سحب أرباح (قيد المراجعة)', type: 'withdrawal', amount: -50000, status: 'pending' },
        { id: 6, date: '2024-08-15', description: 'إيداع أرباح مشروع "إدارة حملة إعلانية"', type: 'income', amount: 50000, status: 'completed' },
    ] as Transaction[],
};

export const dashboardNotificationsData: Notification[] = [
    { id: 1, from: 'أحمد صالح', message: 'مرحباً، هل هناك أي تحديث بخصوص المقالات؟', time: 'منذ دقيقتين', read: false, image: 'https://placehold.co/40x40/F28123/ffffff?text=A', conversationId: 1 },
    { id: 2, from: 'إدارة الموقع', message: 'عرض جديد لمشروع "تطوير صفحة هبوط".', time: 'منذ ساعة', read: false, image: 'https://i.ibb.co/9gq85f4/photo-2025-09-17-12-03-57.jpg' },
    { id: 3, from: 'يوسف إبراهيم', message: 'أود الاستفسار عن عرضك.', time: 'منذ 5 ساعات', read: true, image: 'https://placehold.co/40x40/2E3D80/ffffff?text=Y', conversationId: 4 },
    { id: 4, from: 'شركة تقنية ناشئة', message: 'شكراً، التصميم يبدو رائعاً!', time: 'أمس', read: true, image: 'https://placehold.co/40x40/2E3D80/ffffff?text=T', conversationId: 2 },
];
