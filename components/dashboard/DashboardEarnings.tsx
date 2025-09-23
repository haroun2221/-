import React, { useState } from 'react';
import StatCard from './StatCard';
import EarningsChart from './EarningsChart';
import EarningsPieChart from './EarningsPieChart';
import WithdrawModal from './WithdrawModal';
import { dashboardData, earningsPageData } from '../../data/dashboardMockData';
import type { Transaction } from '../../types';

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const typeConfig = {
        income: { label: 'إيراد', icon: 'fa-arrow-up', color: 'text-green-500', bg: 'bg-green-100' },
        withdrawal: { label: 'سحب', icon: 'fa-arrow-down', color: 'text-red-500', bg: 'bg-red-100' },
        fee: { label: 'عمولة', icon: 'fa-receipt', color: 'text-gray-500', bg: 'bg-gray-100' },
    };

    const statusConfig = {
        completed: { label: 'مكتملة', color: 'text-green-600 bg-green-100' },
        pending: { label: 'قيد المراجعة', color: 'text-orange-600 bg-orange-100' },
        cancelled: { label: 'ملغاة', color: 'text-red-600 bg-red-100' },
    };
    
    const tConf = typeConfig[transaction.type];
    const sConf = statusConfig[transaction.status];

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tConf.bg}`}>
                        <i className={`fas ${tConf.icon} ${tConf.color}`}></i>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                </div>
            </td>
            <td className={`p-4 font-mono font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount.toLocaleString()} دج
            </td>
            <td className="p-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${sConf.color}`}>{sConf.label}</span>
            </td>
        </tr>
    );
};


const DashboardEarnings: React.FC = () => {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const { summary, earningsBySource, transactions } = earningsPageData;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <h1 className="text-3xl font-bold text-gray-800">الأرباح والمحفظة</h1>
                <button 
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 hover:scale-105"
                >
                    <i className="fas fa-hand-holding-usd mr-2"></i>
                    سحب الرصيد
                </button>
            </div>
            
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="الرصيد المتاح" value={`${summary.availableBalance.toLocaleString()} دج`} icon="fa-check-circle" color="green" />
                <StatCard title="الرصيد المعلق" value={`${summary.pendingBalance.toLocaleString()} دج`} icon="fa-hourglass-half" color="orange" />
                <StatCard title="إجمالي الأرباح" value={`${summary.totalEarnings.toLocaleString()} دج`} icon="fa-chart-line" color="blue" />
                <StatCard title="أرباح هذا الشهر" value={`${summary.monthlyEarnings.toLocaleString()} دج`} icon="fa-calendar-alt" color="yellow" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">أداء الأرباح (آخر 6 أشهر)</h2>
                    <div className="h-72">
                        <EarningsChart data={dashboardData.earningsData} />
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">مصادر الأرباح</h2>
                    <div className="h-72 flex items-center justify-center">
                        <EarningsPieChart data={earningsBySource} />
                    </div>
                </div>
            </div>

            {/* Transactions History */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 p-6">سجل المعاملات</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-gray-100 text-gray-600 font-semibold">
                            <tr>
                                <th className="p-4">التفاصيل</th>
                                <th className="p-4">المبلغ</th>
                                <th className="p-4">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
                        </tbody>
                    </table>
                </div>
            </div>

            {isWithdrawModalOpen && (
                <WithdrawModal 
                    availableBalance={summary.availableBalance}
                    onClose={() => setIsWithdrawModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default DashboardEarnings;
