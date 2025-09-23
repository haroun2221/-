import React, { useState } from 'react';
import type { AvatarConfig } from '../../types';
import { avatarPresets } from '../../data/dashboardProfileMockData';

interface AvatarEditorModalProps {
    currentConfig: AvatarConfig;
    onClose: () => void;
    onSave: (newConfig: AvatarConfig) => void;
}

const AvatarEditorModal: React.FC<AvatarEditorModalProps> = ({ currentConfig, onClose, onSave }) => {
    const [config, setConfig] = useState<AvatarConfig>(currentConfig);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    const handleSave = () => {
        onSave(config);
    };

    const selectedAvatarPreset = avatarPresets.find(p => p.id === config.presetId);

    return (
        <div 
            onClick={handleClose}
            className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'} bg-slate-800/75 backdrop-blur-sm`}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl w-full max-w-3xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
                style={{ height: '90vh', maxHeight: '700px' }}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">تخصيص الصورة الرمزية</h2>
                    <button onClick={handleClose} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-sm flex items-center justify-center transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="flex-grow flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
                    {/* Preview & Controls */}
                    <div className="w-full md:w-1/3 flex flex-col items-center gap-6 p-4 bg-gray-50 rounded-lg border">
                        <h3 className="font-bold text-lg">معاينة</h3>
                        <div 
                          className="w-40 h-40 rounded-full flex items-center justify-center shadow-lg transition-all"
                          style={{ 
                            backgroundColor: config.bgColor,
                            border: `6px solid ${config.borderColor}`
                          }}
                        >
                            <div style={{color: config.avatarColor}} className="w-24 h-24">
                                {selectedAvatarPreset?.path}
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <label htmlFor="avatarColor" className="font-semibold text-sm">لون الشكل:</label>
                                <input id="avatarColor" type="color" value={config.avatarColor} onChange={(e) => setConfig(c => ({...c, avatarColor: e.target.value}))} className="w-10 h-10 border-none bg-transparent" />
                            </div>
                             <div className="flex justify-between items-center">
                                <label htmlFor="bgColor" className="font-semibold text-sm">لون الخلفية:</label>
                                <input id="bgColor" type="color" value={config.bgColor} onChange={(e) => setConfig(c => ({...c, bgColor: e.target.value}))} className="w-10 h-10 border-none bg-transparent" />
                            </div>
                             <div className="flex justify-between items-center">
                                <label htmlFor="borderColor" className="font-semibold text-sm">لون الإطار:</label>
                                <input id="borderColor" type="color" value={config.borderColor} onChange={(e) => setConfig(c => ({...c, borderColor: e.target.value}))} className="w-10 h-10 border-none bg-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* Preset Selection */}
                    <div className="flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-4">اختر شكلاً</h3>
                        <div className="flex-grow grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3 overflow-y-auto pr-2">
                           {avatarPresets.map(preset => (
                                <div
                                    key={preset.id}
                                    onClick={() => setConfig(c => ({...c, presetId: preset.id}))}
                                    className={`aspect-square rounded-lg flex items-center justify-center cursor-pointer border-2 transition-all ${config.presetId === preset.id ? 'border-[var(--primary)] bg-blue-50' : 'border-gray-200 bg-gray-100 hover:border-gray-400'}`}
                                >
                                    <div className="w-8 h-8 text-gray-700">
                                        {preset.path}
                                    </div>
                                </div>
                           ))}
                        </div>
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
