import React from 'react';
import type { AvatarConfig } from '../../types';
import { avatarPresets } from '../../data/dashboardProfileMockData';

interface AvatarProps {
    config: AvatarConfig;
    size: number;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ config, size, className }) => {
    const selectedPreset = avatarPresets.find(p => p.id === config.presetId);
    const borderSize = Math.max(2, Math.round(size / 20));

    return (
        <div
            className={`relative rounded-full flex items-center justify-center shadow-md ${className || ''}`}
            style={{
                width: size,
                height: size,
                backgroundColor: config.bgColor,
                border: `${borderSize}px solid ${config.borderColor}`,
            }}
        >
            <div
                style={{
                    width: size * 0.65,
                    height: size * 0.65,
                    color: config.avatarColor,
                }}
            >
                {selectedPreset?.path}
            </div>
        </div>
    );
};

export default Avatar;
