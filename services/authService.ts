
import type { User } from '../types';

const USERS_KEY = 'saaHlaUsers';
const CURRENT_USER_KEY = 'saaHlaCurrentUser';

export const getUsers = (): User[] => {
    try {
        const usersJson = localStorage.getItem(USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return [];
    }
};

export const saveUsers = (users: User[]): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUser = (identifier: string): User | undefined => {
    const users = getUsers();
    if (!identifier) return undefined;
    return users.find(user => 
        user.email.toLowerCase() === identifier.toLowerCase() || 
        (user.phone && user.phone === identifier)
    );
};

export const addUser = (newUser: User): { success: boolean, message?: string } => {
    if (findUser(newUser.email)) {
        return { success: false, message: 'هذا البريد الإلكتروني مسجل بالفعل.' };
    }
    if (newUser.phone && newUser.phone.trim() !== '' && findUser(newUser.phone)) {
        return { success: false, message: 'رقم الهاتف هذا مسجل بالفعل.' };
    }
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);
    return { success: true };
};

export const setCurrentUser = (email: string): void => {
    localStorage.setItem(CURRENT_USER_KEY, email);
};

export const getCurrentUser = (): User | null => {
    const email = localStorage.getItem(CURRENT_USER_KEY);
    if (!email) return null;
    const user = findUser(email);
    return user || null;
};

export const logoutUser = (): void => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export { type User };
