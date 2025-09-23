
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: string;
    change?: string;
    color: 'blue' | 'green' | 'orange' | 'yellow';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, color }) => {
    const colorClasses = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        green: { bg: 'bg-green-100', text: 'text-green-600' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    };

    const selectedColor = colorClasses[color];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
                {change && <p className="text-xs text-green-500 mt-1">{change} عن الشهر الماضي</p>}
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedColor.bg}`}>
                <i className={`fas ${icon} ${selectedColor.text} text-xl`}></i>
            </div>
        </div>
    );
};

export default StatCard;
