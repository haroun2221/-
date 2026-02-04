
import React from 'react';

export interface InitialAvatarConfig {
  bgColor: string;
  textColor: string;
  borderColor: string;
  fontSize: 'small' | 'large';
  borderSize: number;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  type: 'client' | 'freelancer';
  wilaya?: string;
  avatar: string | InitialAvatarConfig;
}

export interface Project {
  id: string;
  title: string;
  img: string;
  description?: string;
  projectLink?: string;
  toolsUsed?: string[];
}

export interface Freelancer {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  avatar: InitialAvatarConfig; 
  description: string;
  skills: string[];
  category: string;
  subcategory: string;
  bio: string;
  projects: Project[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  title:string;
  category: string;
  price: number;
  old_price?: number;
  rating: number;
  images: string[];
  description: string;
  sales: number;
  reviews: Review[];
}

export interface Notification {
    id: number;
    from: string;
    message: string;
    time: string;
    read: boolean;
    image?: string; 
    avatar?: string | InitialAvatarConfig; 
    freelancerId?: number;
    conversationId?: number;
}

export interface DashboardProject {
  id: number;
  clientName: string;
  clientAvatar: string; 
  title: string;
  budget: number;
  deadline: string;
  progress: number;
  status: 'new' | 'in-progress' | 'in-review' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'in-review';
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'income' | 'withdrawal' | 'fee';
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface EarningsSource {
    category: string;
    amount: number;
    percentage: number;
    color: string;
}

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: number;
  senderId: 'freelancer' | 'client';
  content: string | { name: string; size: string };
  timestamp: string;
  status: MessageStatus;
}

export interface Conversation {
  id: number;
  clientName: string;
  clientAvatar: string | InitialAvatarConfig; 
  isOnline: boolean;
  projectTitle: string;
  projectStatus: 'active' | 'completed';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface Skill {
  name: string;
  level: 'مبتدئ' | 'متوسط' | 'خبير';
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  price: number;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  image: string;
  moreImages?: string[]; // صور إضافية
  title: string;
  category: string;
  date: string;
  description?: string;
  projectLink?: string;
  toolsUsed?: string[];
  features?: string[]; // مميزات المشروع
}

export interface ProfileReview {
  id: number;
  clientName: string;
  clientAvatar: string; 
  service: string;
  rating: number;
  comment: string;
  reply?: string;
}

export interface FreelancerProfileData {
  id: number;
  avatar: InitialAvatarConfig; 
  name: string;
  tagline: string;
  location: string;
  isAvailable: boolean;
  about: string;
  skills: Skill[];
  services: Service[];
  portfolio: PortfolioItem[];
  reviews: ProfileReview[];
  stats: {
    rating: number;
    reviewsCount: number;
    completedProjects: number;
    satisfactionRate: number;
  };
}
