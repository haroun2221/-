import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

// Fix: Standardized initialization with direct reference to process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface AIChatPopupProps {
    onClose: () => void;
}

const AIChatPopup: React.FC<AIChatPopupProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Initial greeting from AI
    useEffect(() => {
        setIsThinking(true);
        setTimeout(() => {
            setMessages([{ text: "مرحباً! أنا SaaHla AI، كيف يمكنني مساعدتك؟", sender: 'bot' }]);
            setIsThinking(false);
        }, 500);
    }, []);

    // Auto-scroll chat body
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isThinking]);
    
    // Handle closing animation
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    // Handle clicks outside the popup to close it
     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getBotResponse = async (question: string): Promise<string> => {
        try {
            // Fix: Updated to recommended 'gemini-3-flash-preview' model for Q&A tasks
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: question,
                config: {
                    systemInstruction: `أنت "SaaHla AI"، مساعد ذكي وخبير في منصة العمل الحر الجزائرية "SaaHla". 
                    مهمتك هي الإجابة على أسئلة المستخدمين بأسلوب احترافي، وودود، ومختصر. 
                    ركز على شرح كيفية عمل المنصة، ومميزاتها، وكيفية استفادة العملاء (أصحاب المشاريع) والمستقلين منها. 
                    استخدم اللغة العربية الفصحى المبسطة.
                    اشرح الميزات الرئيسية مثل:
                    - للعملاء: نشر المشاريع، اختيار المستقلين، الدفع الآمن.
                    - للمستقلين: إنشاء ملف شخصي، تقديم العروض، ضمان الحقوق المالية.
                    إذا سُئلت عن شيء خارج نطاق المنصة، أجب بلطف أنك متخصص فقط في شؤون منصة SaaHla.`,
                },
            });
            return response.text;
        } catch (error) {
            console.error("Gemini API error:", error);
            return "عذراً، حدث خطأ أثناء محاولة معالجة طلبك. الرجاء المحاولة مرة أخرى.";
        }
    };

    const handleSend = async () => {
        const userText = inputValue.trim();
        if (userText === '' || isThinking) return;

        setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
        setInputValue('');
        setIsThinking(true);

        const botText = await getBotResponse(userText);
        setMessages(prev => [...prev, { text: botText, sender: 'bot' }]);
        setIsThinking(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 bg-black/30 animate-[fadeIn_0.3s_ease-out]">
            <div 
                ref={popupRef}
                className={`w-full max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
                {/* Header */}
                <div className="flex-shrink-0 p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <i className="fas fa-robot text-2xl text-[var(--primary-dark)]"></i>
                        <h3 className="font-bold text-lg text-[var(--primary-dark)]">SaaHla AI</h3>
                    </div>
                    <button onClick={handleClose} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-sm flex items-center justify-center transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                {/* Chat Body */}
                <div ref={chatBodyRef} className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
                     {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 max-w-[85%] animate-[messageSlideIn_0.4s_ease-out] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${msg.sender === 'user' ? 'bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)]' : 'bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]'}`}>
                                <i className={`fas ${msg.sender === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                            </div>
                            <div className={`p-3 rounded-xl ${msg.sender === 'user' ? 'bg-[var(--secondary-light)] rounded-br-none' : 'bg-[var(--primary-lightest)] rounded-bl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isThinking && (
                        <div className="flex gap-3 max-w-[85%] self-start ai-chat-message bot thinking">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]"><i className="fas fa-robot"></i></div>
                            <div className="p-3 rounded-xl bg-[var(--primary-lightest)] rounded-bl-none message-content"></div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-gray-200 flex gap-2 bg-gray-50">
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="اسألني أي شيء عن SaaHla..." 
                        disabled={isThinking}
                        className="flex-grow w-full px-4 py-2 border border-slate-300 rounded-full transition-all duration-200 ease-in-out bg-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary-lightest)] disabled:bg-gray-200"
                    />
                    <button onClick={handleSend} disabled={isThinking} className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white rounded-full w-10 h-10 flex-shrink-0 text-lg disabled:opacity-50">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatPopup;