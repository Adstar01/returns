import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InputField from '../components/InputField';
import InvestmentType from '../components/InvestmentType';
import PriceTable from '../components/PriceTable';
import Credits from '../components/Credits';

const Home = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [investmentType, setInvestmentType] = useState('CryptoCurrency');
  const [prices, setPrices] = useState([]);

  const handleAmountChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setInvestmentPeriod(e.target.value);
  };

  const fetchPrices = async () => {
    console.log('Fetching prices for:', investmentType);
  
    try {
      let response;
  
      if (investmentType === 'CryptoCurrency') {
        response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'inr',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setPrices(response.data.map(coin => ({
          logo: coin.image,
          name: coin.name,
          value: coin.current_price,
        })));
      } else if (investmentType === 'Stocks') {
        const stockSymbols = ['IBM', 'NVDA'];
        const stockData = [];
  
        for (let symbol of stockSymbols) {
          response = await axios.get('https://www.alphavantage.co/query', {
            params: {
              function: 'TIME_SERIES_INTRADAY',
              symbol: symbol,
              interval: '5min',
              apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY, 
            },
          });
          const timeSeries = response.data['Time Series (5min)'];
          if (timeSeries) {
            const latestTime = Object.keys(timeSeries)[0];
            stockData.push({
              logo: 'https://example.com/stock_logo.png', 
              name: symbol,
              value: timeSeries[latestTime]['1. open'],
            });
          } else {
            console.error(`No data available for ${symbol}.`);
          }
        }
  
        setPrices(stockData);
      } else if (investmentType === 'Gold') {
        response = await axios.get('https://www.goldapi.io/api/XAU/INR', {
          headers: {
            'x-access-token': `Bearer ${import.meta.env.VITE_GOLD_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        setPrices([{
          logo: 'src\assets\gold.png', 
          name: 'Gold',
          value: response.data.price,
        }]);
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <Navbar />
      <main className="p-8">
        <InputField 
          label="Investment Amount (INR)" 
          type="number" 
          value={investmentAmount} 
          onChange={handleAmountChange} 
        />
        <InputField 
          label="Investment Period (Years)" 
          type="number" 
          value={investmentPeriod} 
          onChange={handlePeriodChange} 
        />
        <InvestmentType 
          selected={investmentType} 
          onChange={setInvestmentType} 
        />
        <button 
          onClick={fetchPrices}  
          className="bg-blue-500 p-2 rounded-md mt-4"
        >
          Calculate
        </button>
        <PriceTable type={investmentType} prices={prices} />
      </main>
      <Credits />
    </div>
  );
};

export default Home;
