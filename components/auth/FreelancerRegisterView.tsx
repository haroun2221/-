
import React, { useState } from 'react';
import { addUser, setCurrentUser } from '../../services/authService';
import PasswordInput from './PasswordInput';
import PasswordStrength, { checkPasswordStrength } from './PasswordStrength';
import { WILAYAS } from '../../constants';
import type { User } from '../../services/authService';

interface FreelancerRegisterViewProps {
    onRegisterSuccess: (user: User) => void;
    onBack: () => void;
}

const FreelancerRegisterView: React.FC<FreelancerRegisterViewProps> = ({ onRegisterSuccess, onBack }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [wilaya, setWilaya] = useState('');
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
        
        if (!wilaya) {
            setError('الرجاء اختيار الولاية.');
            return;
        }

        const newUser: User = { email, phone, password, wilaya, type: 'freelancer' };
        const result = addUser(newUser);

        if (result.success) {
            setCurrentUser(newUser.email);
            onRegisterSuccess(newUser);
        } else {
            setError(result.message || 'حدث خطأ غير متوقع.');
        }
    };

    return (
        <div className="animate-[fadeIn_0.6s_ease-out] max-h-[70vh] overflow-y-auto pr-4">
            <h1 className="text-3xl font-bold mb-4 text-[var(--primary-dark)]">إنشاء حساب مستقل</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="font-semibold block mb-2">البريد الإلكتروني</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] focus:bg-white" required />
                    </div>
                    <div>
                        <label className="font-semibold block mb-2">رقم الهاتف</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] focus:bg-white" required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="font-semibold block mb-2">كلمة المرور</label>
                        <PasswordInput value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label className="font-semibold block mb-2">تأكيد كلمة المرور</label>
                        <PasswordInput value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                </div>
                <div className="mb-4">
                    <PasswordStrength password={password} />
                </div>
                <div className="mb-4">
                    <label className="font-semibold block mb-2">الولاية</label>
                    <select value={wilaya} onChange={e => setWilaya(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] focus:bg-white" required>
                        <option value="">اختر ولايتك</option>
                        {WILAYAS.map((w, i) => <option key={i} value={w}>{i + 1} - {w}</option>)}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="font-semibold block mb-2">ارفع 3 من أعمالك السابقة (اختياري)</label>
                    <input type="file" className="form-input block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary-lightest)] file:text-[var(--primary-dark)] hover:file:bg-[var(--primary)] hover:file:text-white" />
                    <input type="file" className="form-input mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary-lightest)] file:text-[var(--primary-dark)] hover:file:bg-[var(--primary)] hover:file:text-white" />
                    <input type="file" className="form-input mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary-lightest)] file:text-[var(--primary-dark)] hover:file:bg-[var(--primary)] hover:file:text-white" />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button type="submit" className="w-full mt-2 text-lg font-bold py-3 rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white hover:opacity-90">سجل كمستقل</button>
            </form>
            <button onClick={onBack} className="text-gray-600 mt-6 hover:text-[var(--primary-dark)] transition-colors">
                <i className="fas fa-chevron-right ml-2"></i>رجوع
            </button>
        </div>
    );
};

export default FreelancerRegisterView;