import React from 'react';
import type { InitialAvatarConfig } from '../../types';

interface AvatarProps {
    src: string | InitialAvatarConfig;
    name: string;
    size: number;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size, className }) => {
    // Case 1: src is a string (URL) - for clients or other images
    if (typeof src === 'string') {
        return (
            <img
                src={src}
                alt={name}
                className={`rounded-full object-cover bg-gray-200 ${className || ''}`}
                style={{
                    width: size,
                    height: size,
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = 'https://i.ibb.co/68q2v7B/p-man-1.jpg'; // A default placeholder
                }}
            />
        );
    }

    // Case 2: src is an InitialAvatarConfig object - for freelancers
    const config = src;
    const initial = name?.charAt(0).toUpperCase() || '?';
    const fontSizeValue = size * (config.fontSize === 'large' ? 0.5 : 0.4);

    return (
        <div
            className={`rounded-full flex items-center justify-center font-bold object-cover ${className || ''}`}
            style={{
                width: size,
                height: size,
                backgroundColor: config.bgColor,
                border: `${config.borderSize || 0}px solid ${config.borderColor || 'transparent'}`,
                boxSizing: 'border-box',
            }}
        >
            <span style={{ color: config.textColor, fontSize: `${fontSizeValue}px`, lineHeight: `${fontSizeValue}px` }}>
                {initial}
            </span>
        </div>
    );
};

export default Avatar;
