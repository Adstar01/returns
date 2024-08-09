import React from 'react';

const InvestmentType = ({ selected, onChange }) => {
  const types = ['CryptoCurrency', 'Stocks', 'Gold'];

  return (
    <div className="flex justify-around my-4">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}  // Call onChange with the selected type
          className={`p-2 rounded-md ${
            selected === type ? 'bg-blue-500' : 'bg-gray-700'
          } text-white`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default InvestmentType;
