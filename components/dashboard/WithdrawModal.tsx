import React, { useState } from 'react';

interface WithdrawModalProps {
    availableBalance: number;
    onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ availableBalance, onClose }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('bank');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };
    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) handleClose();
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const numAmount = parseFloat(amount);
        if (!numAmount || numAmount <= 0) {
            setError('الرجاء إدخال مبلغ صحيح.');
            return;
        }
        if (numAmount > availableBalance) {
            setError('المبلغ المطلوب أكبر من الرصيد المتاح.');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div 
            onClick={handleBackdropClick}
            className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'} bg-slate-800/75 backdrop-blur-sm`}
        >
            <div className={`bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">{isSuccess ? 'تم إرسال الطلب' : 'طلب سحب رصيد'}</h2>
                    <button onClick={handleClose} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-sm flex items-center justify-center transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                {isSuccess ? (
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4">
                            <i className="fas fa-check"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">نجاح!</h3>
                        <p className="text-gray-600 mt-2">تم إرسال طلب السحب الخاص بك بنجاح. ستتم مراجعته خلال 2-3 أيام عمل.</p>
                        <button onClick={handleClose} className="w-full mt-6 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            إغلاق
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label htmlFor="amount" className="font-semibold block mb-2 text-gray-700">المبلغ (دج)</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full text-left px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)]"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">الرصيد المتاح: {availableBalance.toLocaleString()} دج</p>
                        </div>
                        <div>
                            <label className="font-semibold block mb-2 text-gray-700">وسيلة السحب</label>
                            <select 
                                value={method} 
                                onChange={(e) => setMethod(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-lightest)]"
                            >
                                <option value="bank">تحويل بنكي/CCP</option>
                                <option value="paypal">PayPal</option>
                                <option value="payoneer">Payoneer</option>
                            </select>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="border-t pt-6">
                             <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait">
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        جاري الإرسال...
                                    </>
                                ) : (
                                    'تأكيد طلب السحب'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default WithdrawModal;
