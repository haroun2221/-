
import type { User, InitialAvatarConfig } from '../types.ts';

const USERS_KEY = 'saaHlaUsers';
const CURRENT_USER_KEY = 'saaHlaCurrentUser';

// Helper to generate a random professional color
const getRandomColor = () => {
    const letters = '89ABCDEF'; 
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
};

// Helper to get contrasting text color
const getTextColor = (bgColor: string): string => {
    const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 125 ? '#1f2937' : '#FFFFFF'; 
};

// توليد أيقونة رمزية تعتمد على الحرف الأول
const createDefaultInitialAvatar = (type: 'client' | 'freelancer'): InitialAvatarConfig => {
    const bgColor = getRandomColor();
    const textColor = getTextColor(bgColor);
    // إطار أزرق للمستقلين وإطار برتقالي للزبائن للتمييز البصري الخفيف
    const borderColor = type === 'freelancer' ? '#3B82F6' : '#F97316';
    
    return {
        bgColor,
        textColor,
        borderColor,
        fontSize: 'large',
        borderSize: 2,
    };
};

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

export const addUser = (newUser: Omit<User, 'avatar'>): { success: boolean, message?: string, user?: User } => {
    if (findUser(newUser.email)) {
        return { success: false, message: 'هذا البريد الإلكتروني مسجل بالفعل.' };
    }
    if (newUser.phone && newUser.phone.trim() !== '' && findUser(newUser.phone)) {
        return { success: false, message: 'رقم الهاتف هذا مسجل بالفعل.' };
    }
    
    // توليد أيقونة رمزية للكل (زبائن ومستقلين) لضمان جمالية الواجهة
    const avatar = createDefaultInitialAvatar(newUser.type);
      
    const userWithAvatar: User = {
        ...newUser,
        avatar,
    };

    const users = getUsers();
    users.push(userWithAvatar);
    saveUsers(users);
    return { success: true, user: userWithAvatar };
};

export const updateUser = (email: string, updatedData: Partial<User>): { success: boolean, user?: User } => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
        return { success: false };
    }

    const updatedUser = { ...users[userIndex], ...updatedData };
    users[userIndex] = updatedUser;
    saveUsers(users);
    
    return { success: true, user: updatedUser };
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
