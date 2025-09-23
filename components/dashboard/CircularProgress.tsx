import React from 'react';

interface CircularProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, size = 120, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div 
            className="relative inline-flex items-center justify-center transition-transform duration-300 hover:scale-110"
            style={{ width: size, height: size }}
        >
            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-[var(--primary)]"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%'
                    }}
                />
            </svg>
            <span className="absolute text-2xl font-bold text-[var(--primary-dark)]">
                {percentage}%
            </span>
        </div>
    );
};

export default CircularProgress;
