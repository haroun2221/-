
import React, { useState } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="relative">
            <input
                {...props}
                type={isVisible ? 'text' : 'password'}
                className="w-full pr-10 pl-4 py-3 border border-slate-300 rounded-lg transition-all duration-200 ease-in-out bg-slate-50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] focus:bg-white"
            />
            <i
                onClick={toggleVisibility}
                className={`fas ${isVisible ? 'fa-eye-slash' : 'fa-eye'} absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-slate-400`}
            ></i>
        </div>
    );
};

export default PasswordInput;
