import React, { useState, useEffect, useRef } from 'react';
import FaqItem from '../components/FaqItem';
import { GoogleGenAI } from "@google/genai";

// Fix: Use correct initialization as per Gemini SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const StepIllustration1: React.FC = () => (
    <svg viewBox="0 0 200 150" className="w-full h-48 object-cover rounded-xl mb-6">
        <rect width="200" height="150" rx="10" fill="#F3F4F6" />
        <rect x="20" y="30" width="160" height="90" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="35" y="45" width="100" height="8" rx="2" fill="#D1D5DB" />
        <rect x="35" y="65" width="130" height="6" rx="2" fill="#E5E7EB" />
        <rect x="35" y="80" width="130" height="6" rx="2" fill="#E5E7EB" />
        <rect x="35" y="95" width="80" height="6" rx="2" fill="#E5E7EB" />
        <circle cx="160" cy="100" r="18" fill="#3B82F6" />
        <path d="M 155 98 L 159 102 L 167 94" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
);

const StepIllustration2: React.FC = () => (
    <svg viewBox="0 0 200 150" className="w-full h-48 object-cover rounded-xl mb-6">
        <rect width="200" height="150" rx="10" fill="#F3F4F6" />
        <rect x="15" y="25" width="70" height="100" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        <circle cx="50" cy="50" r="12" fill="#D1D5DB" />
        <rect x="30" y="70" width="40" height="6" rx="2" fill="#E5E7EB" />
        <rect x="30" y="82" width="40" height="4" rx="2" fill="#E5E7EB" />
        <rect x="115" y="25" width="70" height="100" rx="5" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" transform="translate(0, -5) rotate(-2, 150, 75)" />
        <circle cx="150" cy="45" r="12" fill="#60A5FA" />
        <rect x="130" y="65" width="40" height="6" rx="2" fill="#D1D5DB" />
        <rect x="130" y="77" width="40" height="4" rx="2" fill="#E5E7EB" />
    </svg>
);

const StepIllustration3: React.FC = () => (
    <svg viewBox="0 0 200 150" className="w-full h-48 object-cover rounded-xl mb-6">
        <rect width="200" height="150" rx="10" fill="#F3F4F6" />
        <path d="M 60 40 L 140 40 C 151 40, 151 55, 140 55 L 60 55 C 49 55, 49 40, 60 40 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2"/>
        <path d="M 50 50 L 150 50 C 161 50, 161 65, 150 65 L 50 65 C 39 65, 39 50, 50 50 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2"/>
        <path d="M 40 60 L 160 60 C 171 60, 171 75, 160 75 L 40 75 C 29 75, 29 60, 40 60 Z" fill="#3B82F6"/>
        <path d="M 75 65 L 85 70 L 100 62" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="125" cy="67.5" r="5" fill="#FFFFFF" />
    </svg>
);


const AIChat: React.FC = () => {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsThinking(true);
        setTimeout(() => {
            setMessages([{ text: "مرحباً! أنا SaaHla AI، مساعدك الذكي. كيف يمكنني خدمتك اليوم بخصوص منصتنا؟", sender: 'bot' }]);
            setIsThinking(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const getBotResponse = async (question: string): Promise<string> => {
        try {
            // Fix: Updated model to 'gemini-3-flash-preview' as recommended for basic text tasks
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
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[70vh] min-h-[500px]">
            <div ref={chatBodyRef} className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
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
            <div className="p-4 border-t border-gray-200 flex gap-3 bg-gray-50">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="اطرح سؤالك هنا..." 
                    disabled={isThinking}
                    className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-full transition-all duration-200 ease-in-out bg-white focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)] disabled:bg-gray-200"
                />
                 <button onClick={handleSend} disabled={isThinking} className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white rounded-full w-12 h-12 flex-shrink-0 text-xl disabled:opacity-50">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};


const HowItWorksPage: React.FC = () => {
    return (
        <div className="animate-[fadeIn_0.5s_ease-out] overflow-x-hidden">
            <div className="bg-white text-center py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-[var(--primary-dark)] mb-4">مرحباً بك في SaaHla</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        منصتك المتكاملة لإنجاز المشاريع والعمل الحر في الجزائر. نحن هنا لنجعل رحلتك، سواء كنت صاحب مشروع أو مستقل، سهلة، آمنة، ومثمرة.
                    </p>
                </div>
            </div>

            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-[var(--primary-dark)] mb-6">من نحن وماذا نقدم؟</h2>
                            <p className="text-gray-600 mb-4 text-lg">
                                نحن لسنا مجرد منصة، بل مجتمع يجمع بين أصحاب المشاريع الطموحين وأفضل المواهب المستقلة في الجزائر. مهمتنا هي تمكينك من تحقيق أهدافك، سواء كنت تبحث عن خبير لتنفيذ فكرتك أو عن فرصة لاستثمار مهاراتك.
                            </p>
                            <p className="text-gray-600 text-lg">
                                نقدم بيئة عمل آمنة، أدوات تواصل فعالة، ونظام دفع مضمون يضمن حقوق الطرفين، لنخلق تجربة عمل حر استثنائية.
                            </p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=450&fit=crop" alt="فريق العمل" className="rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105" />
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-[var(--primary-dark)] mb-4">كيف تبدأ معنا كزبون مميز؟</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
                        إنجاز مشروعك أصبح أسهل من أي وقت مضى. اتبع هذه الخطوات البسيطة لتحويل فكرتك إلى واقع.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <StepIllustration1 />
                            <h3 className="text-2xl font-bold mb-3 text-[var(--primary-dark)]">انشر مشروعك</h3>
                            <p className="text-gray-500">قم بوصف مشروعك بالتفصيل، حدد المهارات المطلوبة والميزانية المتوقعة. كلما كانت التفاصيل أوضح، كانت العروض التي تتلقاها أفضل.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                             <StepIllustration2 />
                            <h3 className="text-2xl font-bold mb-3 text-[var(--primary-dark)]">اختر المستقل الأنسب</h3>
                            <p className="text-gray-500">ستتلقى عروضاً من مستقلين محترفين. قارن بين ملفاتهم الشخصية، أعمالهم السابقة، وتقييماتهم لاختيار الشخص المثالي لمشروعك.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <StepIllustration3 />
                            <h3 className="text-2xl font-bold mb-3 text-[var(--primary-dark)]">ادفع بأمان</h3>
                            <p className="text-gray-500">أودع قيمة المشروع في حساب آمن لدينا. لن يتم تحويل المبلغ للمستقل إلا بعد أن تستلم العمل وتوافق عليه بالكامل.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[var(--primary-dark)] mb-4">أسئلة حول موقعنا</h2>
                        <p className="text-xl text-gray-600">أجوبة لأكثر الأسئلة التي قد تخطر ببالك.</p>
                    </div>
                    <div className="space-y-4">
                        <FaqItem question="ما الذي يميز منصة SaaHla؟"><p>نحن نركز على السوق الجزائري بشكل خاص، مما يوفر فهماً أعمق لاحتياجات العملاء والمستقلين المحليين. كما نقدم دعماً فنياً مخصصاً ونظام دفع آمن وموثوق.</p></FaqItem>
                        <FaqItem question="هل التسجيل في المنصة مجاني؟"><p>نعم، التسجيل وإنشاء حساب كزبون أو كمستقل مجاني بالكامل. نحن نأخذ عمولة بسيطة فقط عند إتمام المشاريع بنجاح.</p></FaqItem>
                        <FaqItem question="كيف تضمنون حقوقي كمستقل؟"><p>بمجرد قبول عرضك، يقوم العميل بإيداع مبلغ المشروع كاملاً في المنصة. هذا يضمن أن أموالك محفوظة وآمنة حتى تسليم العمل المطلوب والحصول على الموافقة.</p></FaqItem>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-[var(--primary-dark)] mb-4">المساعد الذكي</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                        هل لديك أي استفسار؟ مساعدنا الذكي جاهز للإجابة على جميع أسئلتك حول كيفية عمل المنصة.
                    </p>
                    <AIChat />
                </div>
            </section>
        </div>
    );
};

export default HowItWorksPage;