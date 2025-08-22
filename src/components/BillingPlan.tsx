import React from 'react';
import Button from '@/components/Button';

interface BillingPlanProps {
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
  oneTime?: boolean;
  onClick?: () => void;
}

const BillingPlan: React.FC<BillingPlanProps> = ({ price, period, features, buttonText, highlight, oneTime, onClick }) => {
  // Custom highlight for $100 plan
  const isHundredPlan = price === '$100';
  // Make $100 plan highlight more prominent
  const planBorder = isHundredPlan
    ? 'border-4 border-red-600 scale-105 shadow-[0_0_12px_2px_rgba(220,38,38,0.25)]'
    : highlight
      ? 'border-2 border-blue-600 scale-105'
      : 'border-2 border-gray-200';
  const planBg = oneTime ? 'bg-gradient-to-br from-purple-50 to-neutral-50' : 'bg-neutral-50';
  return (
    <div
      className={`flex flex-col justify-between items-center rounded-2xl shadow-lg p-4 w-56 min-h-[340px] transition-all ${planBorder} ${planBg}`}
    >
      <div className="mb-2">
        <div className="text-3xl font-extrabold text-gray-900">{price}</div>
        <div className="text-base font-semibold text-gray-500">{period}</div>
      </div>
      <ul className="text-left mb-4 w-full">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 mb-1 text-gray-700 text-sm">
            <span className="text-green-500 font-bold">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
  <Button variant="primary" size="md" className="w-full mt-auto" onClick={onClick}>{buttonText}</Button>
    </div>
  );
};

export default BillingPlan;
