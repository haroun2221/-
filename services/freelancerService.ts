
import { Freelancer, User, InitialAvatarConfig } from '../types';
import { freelancersData } from '../data/mockData';
import { getUsers } from './authService';
import { getFreelancerPortfolio } from './portfolioService';

// دالة لتوليد ID عددي ثابت من البريد الإلكتروني
export const generateIdFromEmail = (email: string): number => {
    return Math.abs(email.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0));
};

export const getAllFreelancers = (): Freelancer[] => {
    const registeredUsers = getUsers();
    const registeredFreelancers: Freelancer[] = registeredUsers
        .filter(user => user.type === 'freelancer')
        .map((user) => {
            const fId = generateIdFromEmail(user.email);
            // جلب المشاريع المحفوظة لهذا المستخدم تحديداً
            const savedPortfolio = getFreelancerPortfolio(fId);
            
            return {
                id: fId,
                name: user.name,
                title: user.wilaya ? `مستقل من ${user.wilaya}` : 'مستقل محترف',
                rating: 0,
                reviews: 0,
                avatar: typeof user.avatar === 'object' ? user.avatar : { bgColor: '#3B82F6', textColor: '#FFF', borderColor: '#FFF', borderSize: 2, fontSize: 'large' },
                description: user.wilaya ? `مستقل متخصص من ولاية ${user.wilaya}.` : 'عضو جديد في منصة سهلة.',
                skills: [],
                category: 'web',
                subcategory: 'webdev',
                bio: '',
                projects: savedPortfolio.map(p => ({ id: p.id, title: p.title, img: p.image, description: p.description }))
            } as Freelancer;
        });

    // دمج البيانات مع المستقلين الافتراضيين
    const combined = [...registeredFreelancers];
    freelancersData.forEach(mockF => {
        if (!combined.find(f => f.name === mockF.name)) {
            combined.push(mockF);
        }
    });

    return combined;
};

export const getFreelancerById = (id: number): Freelancer | undefined => {
    return getAllFreelancers().find(f => f.id === id);
};
