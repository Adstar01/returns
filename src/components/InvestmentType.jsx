import React from 'react';

const InvestmentType = ({ selected, onChange }) => (
  <div className="flex justify-around my-4">
    {['CryptoCurrency', 'Stocks', 'Gold'].map(type => (
      <button
        key={type}
        onClick={() => onChange(type)}
        className={`p-2 ${selected === type ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md`}
      >
        {type}
      </button>
    ))}
  </div>
);

export default InvestmentType;
