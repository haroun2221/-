
import React, { useState } from 'react';

interface FaqItemProps {
    question: string;
    children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-300">
            <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-lg text-gray-800">{question}</h3>
                <i className={`fas fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}></i>
            </div>
            <div 
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{ maxHeight: isOpen ? '200px' : '0px', paddingTop: isOpen ? '1rem' : '0px' }}
            >
                <div className="text-gray-600">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FaqItem;
