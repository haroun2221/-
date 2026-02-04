import React, { useState } from 'react';
import type { InitialAvatarConfig } from '../../types';
import Avatar from './Avatar';

interface AvatarEditorModalProps {
    currentConfig: InitialAvatarConfig;
    name: string;
    onClose: () => void;
    onSave: (newConfig: InitialAvatarConfig) => void;
}

const ColorInput: React.FC<{ label: string; value: string; onChange: (color: string) => void }> = ({ label, value, onChange }) => (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
        <label className="font-semibold text-sm text-gray-700">{label}:</label>
        <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="w-10 h-10 border-none rounded-md bg-transparent cursor-pointer" 
        />
    </div>
);

const SizeSelector: React.FC<{ label: string; value: 'small' | 'large'; onChange: (value: 'small' | 'large') => void }> = ({ label, value, onChange }) => (
    <div className="bg-gray-100 p-2 rounded-lg">
        <label className="font-semibold text-sm text-gray-700 mb-2 block">{label}</label>
        <div className="flex gap-2">
            <button 
                onClick={() => onChange('small')} 
                className={`flex-1 py-2 rounded-lg font-semibold text-sm ${value === 'small' ? 'bg-[var(--primary)] text-white' : 'bg-gray-200'}`}
            >
                صغير
            </button>
            <button 
                onClick={() => onChange('large')} 
                className={`flex-1 py-2 rounded-lg font-semibold text-sm ${value === 'large' ? 'bg-[var(--primary)] text-white' : 'bg-gray-200'}`}
            >
                كبير
            </button>
        </div>
    </div>
);

const RangeSlider: React.FC<{ label: string; value: number; min?: number; max?: number; step?: number; onChange: (value: number) => void }> = ({ label, value, min = 0, max = 10, step = 1, onChange }) => (
     <div className="bg-gray-100 p-3 rounded-lg">
        <label className="font-semibold text-sm text-gray-700 mb-1 block">{label}: {value}px</label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);


const AvatarEditorModal: React.FC<AvatarEditorModalProps> = ({ currentConfig, name, onClose, onSave }) => {
    const [config, setConfig] = useState<InitialAvatarConfig>(currentConfig);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    const handleSave = () => {
        onSave(config);
        handleClose();
    };
    
    const setConfigField = <K extends keyof InitialAvatarConfig>(field: K, value: InitialAvatarConfig[K]) => {
        setConfig(c => ({...c, [field]: value}));
    };

    return (
        <div 
            onClick={handleClose}
            className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'} bg-slate-800/75 backdrop-blur-sm`}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl w-full max-w-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
                style={{ height: '90vh', maxHeight: '600px' }}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">تخصيص الصورة الرمزية</h2>
                    <button onClick={handleClose} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-sm flex items-center justify-center transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="flex-grow flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
                    {/* Preview Area */}
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg border">
                        <h3 className="font-bold text-lg">معاينة</h3>
                        <Avatar src={config} name={name} size={160} />
                        <p className="text-sm text-gray-500 text-center">قم بتغيير الإعدادات على اليسار لرؤية التغييرات هنا.</p>
                    </div>

                    {/* Options Selection */}
                    <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-2">
                        <ColorInput label="لون الخلفية" value={config.bgColor} onChange={(val) => setConfigField('bgColor', val)} />
                        <ColorInput label="لون الحرف" value={config.textColor} onChange={(val) => setConfigField('textColor', val)} />
                        <ColorInput label="لون الإطار" value={config.borderColor} onChange={(val) => setConfigField('borderColor', val)} />
                        <SizeSelector label="حجم الحرف" value={config.fontSize} onChange={(val) => setConfigField('fontSize', val)} />
                        <RangeSlider label="حجم الإطار" value={config.borderSize} onChange={(val) => setConfigField('borderSize', val)} />
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50 flex justify-end gap-4">
                    <button onClick={handleClose} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">
                        إلغاء
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white font-semibold hover:opacity-90">
                        حفظ الصورة
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarEditorModal;
