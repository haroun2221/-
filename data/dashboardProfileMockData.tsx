import React from 'react';
import type { FreelancerProfileData, InitialAvatarConfig } from '../types';

export const freelancerProfileData: FreelancerProfileData = {
  // Added missing id property to comply with FreelancerProfileData interface
  id: 1,
  avatar: { bgColor: '#1E3A8A', textColor: '#FFFFFF', borderColor: '#60A5FA', borderSize: 4, fontSize: 'large' },
  name: 'محمد أحمد',
  tagline: 'مطور ويب متخصص | خبير React و Node.js',
  location: 'الجزائر العاصمة, الجزائر',
  isAvailable: true,
  about: `مطور ويب بخبرة تزيد عن 5 سنوات in بناء حلول برمجية متكاملة للشركات الناشئة والكبرى.
- أركز على كتابة كود نظيف وقابل للتطوير.
- أؤمن بأهمية تجربة المستخدم السلسة.
- شغوف بتحويل الأفكار إلى منتجات رقمية ناجحة.`,
  skills: [
    { name: 'React', level: 'خبير' },
    { name: 'Node.js', level: 'خبير' },
    { name: 'TypeScript', level: 'خبير' },
    { name: 'GraphQL', level: 'متوسط' },
    { name: 'MongoDB', level: 'متوسط' },
    { name: 'Figma', level: 'مبتدئ' },
  ],
  services: [
    // Fix: IDs must be strings to satisfy the Service interface
    { id: '1', icon: 'fa-laptop-code', title: 'تطوير واجهات أمامية (Frontend)', price: 80000 },
    { id: '2', icon: 'fa-server', title: 'تطوير واجهات خلفية (Backend)', price: 100000 },
    { id: '3', icon: 'fa-database', title: 'تصميم وإدارة قواعد البيانات', price: 60000 },
  ],
  portfolio: [
    // Fix: IDs must be strings to satisfy the PortfolioItem interface
    { id: '1', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', title: 'لوحة تحكم لمتجر إلكتروني', category: 'تطوير ويب', date: '2024-06-15' },
    { id: '2', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', title: 'موقع تعريفي لشركة استشارات', category: 'تطوير ويب', date: '2024-04-20' },
    { id: '3', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', title: 'تطبيق حجوزات فندقية', category: 'تطوير ويب', date: '2023-12-10' },
  ],
  reviews: [
    { id: 1, clientName: 'شركة ABC', clientAvatar: 'https://i.ibb.co/vLYD2kC/p-woman-2.jpg', service: 'تطوير واجهات أمامية', rating: 5, comment: 'عمل احترافي وجودة عالية في التسليم. محمد كان متواصلاً بشكل ممتاز وقدم لنا منتجاً يفوق التوقعات.' },
    { id: 2, clientName: 'خالد يوسف', clientAvatar: 'https://i.ibb.co/3kM2C2f/p-man-2.jpg', service: 'تطوير واجهات خلفية', rating: 4, comment: 'مطور متمكن، لكن كان هناك تأخير بسيط في التسليم النهائي. بشكل عام راضٍ عن الخدمة.', reply: 'شكراً لك أستاذ خالد. أعتذر عن التأخير وأسعد بالتعامل معك مجدداً.' },
  ],
  stats: {
    rating: 4.9,
    reviewsCount: 42,
    completedProjects: 25,
    satisfactionRate: 98,
  },
};