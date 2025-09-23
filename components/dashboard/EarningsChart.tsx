import React from 'react';

interface EarningsChartProps {
    data: { month: string; earnings: number }[];
}

const EarningsChart: React.FC<EarningsChartProps> = ({ data }) => {
    const maxEarning = Math.max(...data.map(d => d.earnings), 1); // Avoid division by zero
    const chartHeight = 288; // Corresponds to h-72
    const chartWidth = 600; // Base width for viewBox
    
    if (data.length < 2) {
        return <div className="w-full h-full flex items-center justify-center text-gray-500">بيانات غير كافية لعرض الرسم البياني</div>;
    }

    const points = data.map((item, index) => {
        const x = (index / (data.length - 1)) * chartWidth;
        const y = chartHeight - (item.earnings / maxEarning) * (chartHeight - 40) - 20; // top/bottom padding
        return `${x},${y}`;
    }).join(' ');
    
    const areaPath = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

    return (
        <div className="w-full h-full relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="none" aria-label="أداء الأرباح" role="img">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                     <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--primary-light)" />
                        <stop offset="100%" stopColor="var(--primary-dark)" />
                    </linearGradient>
                </defs>
                <polygon points={areaPath} fill="url(#areaGradient)" />
                <polyline
                    points={points}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                 {data.map((item, index) => {
                    const x = (index / (data.length - 1)) * chartWidth;
                    const y = chartHeight - (item.earnings / maxEarning) * (chartHeight - 40) - 20;
                    return (
                        <g key={index} className="group cursor-pointer">
                           <title>{`${item.month}: ${item.earnings.toLocaleString()} دج`}</title>
                           <circle cx={x} cy={y} r="5" fill="var(--primary-dark)" className="transition-transform duration-200 group-hover:scale-125"/>
                           <circle cx={x} cy={y} r="10" fill="var(--primary)" fillOpacity="0.3" className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"/>
                        </g>
                    )
                 })}
            </svg>
             <div className="absolute bottom-0 w-full flex justify-around px-2">
                 {data.map((item) => (
                    <span key={item.month} className="text-xs text-gray-500">{item.month}</span>
                ))}
             </div>
        </div>
    );
};

export default EarningsChart;
