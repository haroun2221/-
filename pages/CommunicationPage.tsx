import React, { useState, useEffect, useRef } from 'react';
import type { Freelancer } from '../types';
import Avatar from '../components/dashboard/Avatar';

interface CommunicationPageProps {
    freelancer: Freelancer;
    onBackToProfile: (id: number) => void;
}

interface Message {
    content: string | { name: string; size: string };
    sender: string;
    isFile: boolean;
}

const CommunicationPage: React.FC<CommunicationPageProps> = ({ freelancer, onBackToProfile }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMessages([
            { content: `مرحباً ${freelancer.name}، لقد اطلعت على ملفك الشخصي وأعجبت بأعمالك.`, sender: 'أنت', isFile: false },
        ]);
        
        const timer = setTimeout(() => {
            setMessages(prev => [...prev, { content: 'أهلاً بك! يسعدني ذلك. كيف يمكنني مساعدتك؟', sender: freelancer.name, isFile: false }]);
        }, 1200);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [freelancer]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        const text = inputValue.trim();
        if (text) {
            setMessages(prev => [...prev, { content: text, sender: 'أنت', isFile: false }]);
            setInputValue('');

            setTimeout(() => {
                setMessages(prev => [...prev, { content: 'تمام، سألقي نظرة.', sender: freelancer.name, isFile: false }]);
            }, 1500);
        }
    };
    
    const handleFileAttach = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileInfo = { name: file.name, size: `${(file.size / 1024).toFixed(1)} KB` };
            setMessages(prev => [...prev, { content: fileInfo, sender: 'أنت', isFile: true }]);
        }
    };

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-6xl mx-auto my-8 px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ height: '80vh', maxHeight: '800px' }}>
                    <div className="bg-gray-50 p-4 flex justify-between items-center flex-shrink-0 border-b">
                        <div className="flex items-center gap-4">
                            <Avatar src={freelancer.avatar} name={freelancer.name} size={48} />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{freelancer.name}</h2>
                                <p className="text-sm text-green-500 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>متصل الآن</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <i className="fas fa-phone-alt text-gray-500 text-lg cursor-pointer transition-colors hover:text-[var(--primary-dark)]" title="مكالمة صوتية"></i>
                            <i className="fas fa-video text-gray-500 text-lg cursor-pointer transition-colors hover:text-[var(--primary-dark)]" title="مكالمة فيديو"></i>
                            <button onClick={() => onBackToProfile(freelancer.id)} className="text-gray-500 hover:text-[var(--primary-dark)] transition-colors text-xl" title="العودة للملف الشخصي">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div ref={chatBodyRef} className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`max-w-[75%] p-4 rounded-2xl relative animate-[messageSlideIn_0.4s_ease-out] ${msg.sender === 'أنت' ? 'self-end bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white rounded-br-none' : 'self-start bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {msg.isFile ? (
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-file-alt text-3xl"></i>
                                        <div>
                                            <div className="font-bold truncate">{(msg.content as {name: string}).name}</div>
                                            <div className="text-xs">{(msg.content as {size: string}).size}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <p>{msg.content as string}</p>
                                )}
                                <span className={`absolute bottom-1 text-xs font-bold ${msg.sender === 'أنت' ? 'right-4 text-blue-200' : 'right-4 text-gray-500'}`}>{msg.sender}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-4 flex items-center gap-4 flex-shrink-0 border-t">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        <i onClick={handleFileAttach} className="fas fa-paperclip text-gray-500 text-xl cursor-pointer transition-colors hover:text-[var(--primary-dark)]" title="إرفاق ملف"></i>
                        <i className="fas fa-microphone text-gray-500 text-xl cursor-pointer transition-colors hover:text-[var(--primary-dark)]" title="تسجيل رسالة صوتية"></i>
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="اكتب رسالتك هنا..." 
                            className="w-full bg-gray-200 rounded-full px-5 py-3 border-2 border-transparent transition-all duration-200 focus:bg-white focus:border-[var(--primary-dark)] outline-none"
                        />
                         <button onClick={handleSendMessage} className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white rounded-full w-12 h-12 flex-shrink-0 text-xl">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunicationPage;