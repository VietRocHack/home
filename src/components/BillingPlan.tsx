import React from 'react';
import Button from '@/components/Button';

interface BillingPlanProps {
  price: string;
  period: string;
  infoRows?: { label: string; value: string }[];
  features: string[];
  buttonText: string;
  highlight?: boolean;
  onClick?: () => void;
}

const BillingPlan: React.FC<BillingPlanProps> = ({ price, period, infoRows = [], features, buttonText, highlight, onClick }) => {
  // Highlight logic for featured plan (third option)
  const highlightStyle = highlight
    ? 'border-4 border-yellow-300 shadow-[0_8px_32px_0_rgba(255,221,51,0.12)] scale-105 relative'
    : 'border border-gray-200 shadow-md';
  const cardBg = 'bg-white';

  return (
    <div
      className={`flex flex-col items-center rounded-[2.5rem] ${highlightStyle} ${cardBg} p-8 w-80 min-h-[480px] transition-all duration-300 hover:scale-105`}
      style={highlight ? {
        boxShadow: '0 8px 32px 0 rgba(255,221,51,0.12), 0 2px 8px 0 rgba(0,0,0,0.04)',
        background: '#fff',
      } : undefined}
    >
  {/* Price */}
  <div className="text-5xl font-extrabold text-gray-900 mb-2 text-center">{price}</div>
  {/* Plan Name / Period */}
  <div className="text-2xl font-bold text-gray-900 mb-4 text-center">{period}</div>
      {/* Info Rows (table-like, no lines) */}
      {infoRows.length > 0 && (
        <div className="w-full mb-6">
          {infoRows.map((row, idx) => (
            <div key={idx} className="flex justify-center py-2 text-lg text-gray-700 font-medium">
              <span className="w-1/2 text-center">{row.label}</span>
              <span className="w-1/2 text-center">{row.value}</span>
            </div>
          ))}
        </div>
      )}
      {/* Button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full mb-6 py-3 rounded-full font-bold text-lg shadow-md transition-all duration-200 bg-red-500 hover:bg-red-600 text-white border-none"
        onClick={onClick}
      >
        {buttonText}
      </Button>
      {/* Features (optional, can be hidden for minimal look) */}
      {features.length > 0 && (
        <ul className="text-left w-full mt-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 mb-2 text-gray-700 text-base font-medium">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 shadow-sm">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BillingPlan;