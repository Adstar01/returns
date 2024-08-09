import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InputField from '../components/InputField';
import InvestmentType from '../components/InvestmentType';
import PriceTable from '../components/PriceTable';
import Credits from '../components/Credits';

const Home = () => {
  const [investmentType, setInvestmentType] = useState('CryptoCurrency');
  const [prices, setPrices] = useState([]);

  const fetchPrices = () => {
    // Fetch prices based on investmentType and update state
    // Example: setPrices([...]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <Navbar />
      <main className="p-8">
        <InputField label="Investment Amount (INR)" type="number" />
        <InputField label="Investment Period (Years)" type="number" />
        <InvestmentType selected={investmentType} onChange={setInvestmentType} />
        <button onClick={fetchPrices} className="bg-blue-500 p-2 rounded-md mt-4">
          Calculate
        </button>
        <PriceTable type={investmentType} prices={prices} />
      </main>
      <Credits />
    </div>
  );
};

export default Home;
