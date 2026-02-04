import type { Conversation, InitialAvatarConfig } from '../types';

const clientAvatars: { [key: string]: InitialAvatarConfig } = {
    ahmed: { bgColor: '#3B82F6', textColor: '#FFFFFF', borderColor: '#93c5fd', borderSize: 2, fontSize: 'large' },
    company: { bgColor: '#10b981', textColor: '#FFFFFF', borderColor: '#6ee7b7', borderSize: 2, fontSize: 'large' },
    fatima: { bgColor: '#F97316', textColor: '#FFFFFF', borderColor: '#fdba74', borderSize: 2, fontSize: 'large' },
    youssef: { bgColor: '#6366f1', textColor: '#FFFFFF', borderColor: '#a5b4fc', borderSize: 2, fontSize: 'large' },
};

export const conversationsData: Conversation[] = [
    {
        id: 1,
        clientName: 'أحمد صالح',
        clientAvatar: clientAvatars.ahmed,
        isOnline: true,
        projectTitle: 'كتابة 5 مقالات تسويقية',
        projectStatus: 'active',
        lastMessage: 'تمام، سأقوم بإرسال المقالة الأولى للمراجعة.',
        lastMessageTime: 'الآن',
        unreadCount: 2,
        messages: [
            { id: 1, senderId: 'client', content: 'مرحباً، هل هناك أي تحديث بخصوص المقالات؟', timestamp: '10:30 ص', status: 'read' },
            { id: 2, senderId: 'freelancer', content: 'أهلاً بك أستاذ أحمد. نعم، لقد انتهيت من المقالة الأولى وجاري العمل على الثانية.', timestamp: '10:32 ص', status: 'read' },
            { id: 3, senderId: 'client', content: 'ممتاز! متى يمكنني مراجعتها؟', timestamp: '10:33 ص', status: 'read' },
            { id: 4, senderId: 'freelancer', content: 'تمام، سأقوم بإرسال المقالة الأولى للمراجعة.', timestamp: '10:35 ص', status: 'sent' },
        ],
    },
    {
        id: 2,
        clientName: 'شركة تقنية ناشئة',
        clientAvatar: clientAvatars.company,
        isOnline: false,
        projectTitle: 'تصميم واجهة مستخدم لتطبيق',
        projectStatus: 'active',
        lastMessage: 'بالتأكيد، الملف بالمرفقات.',
        lastMessageTime: 'أمس',
        unreadCount: 0,
        messages: [
            { id: 1, senderId: 'client', content: 'رائع، هل يمكنك إرسال التصميم بصيغة PNG أيضاً؟', timestamp: 'أمس 3:15 م', status: 'read' },
            { id: 2, senderId: 'freelancer', content: 'بالتأكيد، الملف بالمرفقات.', timestamp: 'أمس 3:20 م', status: 'read' },
            { id: 3, senderId: 'freelancer', content: { name: 'Dashboard_Design.png', size: '2.3 MB' }, timestamp: 'أمس 3:21 م', status: 'read' },
        ],
    },
    {
        id: 3,
        clientName: 'فاطمة الزهراء',
        clientAvatar: clientAvatars.fatima,
        isOnline: false,
        projectTitle: 'تصميم شعار وهوية بصرية',
        projectStatus: 'completed',
        lastMessage: 'شكراً جزيلاً على العمل الرائع!',
        lastMessageTime: 'منذ 3 أيام',
        unreadCount: 0,
        messages: [
            { id: 1, senderId: 'freelancer', content: 'تم تسليم المشروع، آمل أن ينال إعجابك.', timestamp: 'منذ 3 أيام', status: 'read' },
            { id: 2, senderId: 'client', content: 'شكراً جزيلاً على العمل الرائع!', timestamp: 'منذ 3 أيام', status: 'read' },
        ],
    },
    {
        id: 4,
        clientName: 'يوسف إبراهيم',
        clientAvatar: clientAvatars.youssef,
        isOnline: true,
        projectTitle: 'تطوير صفحة هبوط',
        projectStatus: 'active',
        lastMessage: 'مرحباً، أود الاستفسار عن عرضك.',
        lastMessageTime: 'منذ أسبوع',
        unreadCount: 1,
        messages: [
            { id: 1, senderId: 'client', content: 'مرحباً، أود الاستفسار عن عرضك.', timestamp: 'منذ أسبوع', status: 'delivered' },
        ],
    },
];