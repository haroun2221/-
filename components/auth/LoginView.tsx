
import React, { useState } from 'react';
import { findUser, setCurrentUser } from '../../services/authService';
import PasswordInput from './PasswordInput';
import type { User } from '../../services/authService';


interface LoginViewProps {
    onLoginSuccess: (user: User) => void;
    onSwitchToRegister: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const user = findUser(identifier);
        
        if (user && user.password === password) {
            setCurrentUser(user.email);
            onLoginSuccess(user);
        } else {
            setError('البيانات المدخلة غير صحيحة.');
        }
    };

    return (
        <div className="animate-[fadeIn_0.6s_ease-out]">
            <h1 className="text-3xl font-bold mb-4 text-[var(--primary-dark)]">تسجيل الدخول</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="login-identifier" className="font-semibold block mb-2 text-slate-700">البريد الإلكتروني أو رقم الهاتف</label>
                    <input
                        type="text"
                        id="login-identifier"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-all duration-200 ease-in-out bg-slate-50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] focus:bg-white"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="login-password" className="font-semibold block mb-2 text-slate-700">كلمة المرور</label>
                    <PasswordInput
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button type="submit" className="w-full mt-4 text-lg font-bold py-3 rounded-lg transition-all duration-300 ease-in-out bg-[var(--primary-dark)] text-white hover:bg-[#1c347a]">
                    سجل الآن
                </button>
            </form>
            <button onClick={onSwitchToRegister} className="text-gray-600 mt-8 hover:text-[var(--primary-dark)] transition-colors">
                <i className="fas fa-chevron-right ml-2"></i> أنشئ حسابك الآن
            </button>
        </div>
    );
};

export default LoginView;