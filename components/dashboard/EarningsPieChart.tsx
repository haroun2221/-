import React from 'react';
import type { EarningsSource } from '../../types';

interface EarningsPieChartProps {
    data: EarningsSource[];
}

const EarningsPieChart: React.FC<EarningsPieChartProps> = ({ data }) => {
    const gradientStops = data.reduce((acc, source, index, arr) => {
        const start = index === 0 ? 0 : arr.slice(0, index).reduce((sum, s) => sum + s.percentage, 0);
        const end = start + source.percentage;
        acc.push(`${source.color} ${start}% ${end}%`);
        return acc;
    }, [] as string[]).join(', ');

    const conicGradient = `conic-gradient(${gradientStops})`;

    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6">
            <div 
                className="w-40 h-40 rounded-full" 
                style={{ background: conicGradient }}
                role="img"
                aria-label="Pie chart showing earnings by source"
            ></div>
            <div className="flex flex-col gap-3">
                {data.map(source => (
                    <div key={source.category} className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></span>
                        <span className="font-semibold text-gray-700">{source.category}</span>
                        <span className="text-gray-500 font-mono">({source.percentage}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EarningsPieChart;
