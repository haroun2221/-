
import React, { useState } from 'react';
import { addUser, setCurrentUser } from '../../services/authService';
import PasswordInput from './PasswordInput';
import PasswordStrength, { checkPasswordStrength } from './PasswordStrength';
import type { User } from '../../services/authService';


interface ClientRegisterViewProps {
    onRegisterSuccess: (user: User) => void;
    onBack: () => void;
}

const ClientRegisterView: React.FC<ClientRegisterViewProps> = ({ onRegisterSuccess, onBack }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('كلمتا المرور غير متطابقتين.');
            return;
        }

        if (checkPasswordStrength(password).score < 3) {
            setError('كلمة المرور ضعيفة. يرجى اتباع التعليمات.');
            return;
        }

        const newUser: User = { email, phone, password, type: 'client' };
        const result = addUser(newUser);

        if (result.success) {
            setCurrentUser(newUser.email);
            onRegisterSuccess(newUser);
        } else {
            setError(result.message || 'حدث خطأ غير متوقع.');
        }
    };

    return (
        <div className="animate-[fadeIn_0.6s_ease-out]">
            <h1 className="text-3xl font-bold mb-4 text-[var(--primary-dark)]">إنشاء حساب زبون</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="font-semibold block mb-2">البريد الإلكتروني</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-all duration-200 ease-in-out bg-slate-50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] focus:bg-white" required />
                </div>
                <div className="mb-4">
                    <label className="font-semibold block mb-2">رقم الهاتف (اختياري)</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-all duration-200 ease-in-out bg-slate-50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] focus:bg-white" />
                </div>
                <div className="mb-4">
                    <label className="font-semibold block mb-2">كلمة المرور</label>
                    <PasswordInput value={password} onChange={e => setPassword(e.target.value)} required />
                    <PasswordStrength password={password} />
                </div>
                <div className="mb-6">
                    <label className="font-semibold block mb-2">تأكيد كلمة المرور</label>
                    <PasswordInput value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button type="submit" className="w-full mt-2 text-lg font-bold py-3 rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white hover:opacity-90">انشئ حسابك</button>
            </form>
            <button onClick={onBack} className="text-gray-600 mt-6 hover:text-[var(--primary-dark)] transition-colors">
                <i className="fas fa-chevron-right ml-2"></i>رجوع
            </button>
        </div>
    );
};

export default ClientRegisterView;