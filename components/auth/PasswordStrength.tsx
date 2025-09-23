
import React from 'react';

interface PasswordStrengthProps {
    password?: string;
}

export const checkPasswordStrength = (p?: string): { score: number; text: string } => {
    if (!p) return { score: 0, text: '' };
    let score = 0;
    if (/.{8,}/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    const finalScore = Math.min(score, 4);
    const text = 'يجب أن تحتوي على: 8 أحرف، حرف كبير، حرف صغير، رقم ورمز.';
    
    return { score: finalScore, text };
};


const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const { score, text } = checkPasswordStrength(password);
    const colors = ['#e2e8f0', '#ef4444', '#f59e0b', '#10b981', '#10b981'];

    return (
        <div>
            <div className="flex gap-1 mt-2 h-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-full transition-all duration-400 ease-in-out"
                        style={{ backgroundColor: colors[i < score ? score : 0] }}
                    ></div>
                ))}
            </div>
            {password && password.length > 0 && <p className="text-xs text-gray-500 mt-1">{text}</p>}
        </div>
    );
};

export default PasswordStrength;
