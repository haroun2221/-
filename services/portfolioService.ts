
import { Project, PortfolioItem } from '../types';

const PORTFOLIO_KEY_PREFIX = 'saaHla_portfolio_';

export const getFreelancerPortfolio = (freelancerId: number): PortfolioItem[] => {
    const saved = localStorage.getItem(`${PORTFOLIO_KEY_PREFIX}${freelancerId}`);
    return saved ? JSON.parse(saved) : [];
};

export const saveFreelancerPortfolio = (freelancerId: number, portfolio: PortfolioItem[]): void => {
    localStorage.setItem(`${PORTFOLIO_KEY_PREFIX}${freelancerId}`, JSON.stringify(portfolio));
};

export const addProjectToPortfolio = (freelancerId: number, project: Omit<PortfolioItem, 'id' | 'date'>): PortfolioItem => {
    const portfolio = getFreelancerPortfolio(freelancerId);
    const newProject: PortfolioItem = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toLocaleDateString('ar-DZ'),
    };
    const updated = [newProject, ...portfolio];
    saveFreelancerPortfolio(freelancerId, updated);
    return newProject;
};

export const deleteProjectFromPortfolio = (freelancerId: number, projectId: string): void => {
    const portfolio = getFreelancerPortfolio(freelancerId);
    const updated = portfolio.filter(p => p.id !== projectId);
    saveFreelancerPortfolio(freelancerId, updated);
};
