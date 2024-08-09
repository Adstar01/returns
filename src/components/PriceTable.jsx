import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PriceTable = ({ type }) => {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setError('');  
        let response;

        if (type === 'CryptoCurrency') {
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
        } else if (type === 'Stocks') {
          const stockSymbols = ['IBM'];
          const stockData = [];

          for (let symbol of stockSymbols) {
            response = await axios.get('https://www.alphavantage.co/query', {
              params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: symbol,
                interval: '5min',
                apikey: 'V3TEZMZ1AXKUUY0U',
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
              setError('No data available for stocks. Please check your API key or stock symbols.');
            }
          }

          setPrices(stockData);
        } else if (type === 'Gold') {
          response = await axios.get('https://www.goldapi.io/api/XAU/INR', {
            headers: {
              'x-access-token': 'goldapi-5dzroslzky7y6f-io',
              'Content-Type': 'application/json',
            },
          });
          setPrices([{
            logo: 'https://example.com/gold_logo.png', 
            name: 'Gold',
            value: response.data.price,
          }]);
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
        setError('An error occurred while fetching prices. Please try again later.');
      }
    };

    fetchPrices();
  }, [type]);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full bg-gray-800 text-white mt-4">
          <thead>
            <tr>
              <th className="p-2">Logo</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price (INR)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(price => (
              <tr key={price.name}>
                <td className="p-2">
                  <img src={price.logo} alt={price.name} className="h-8" />
                </td>
                <td className="p-2">{price.name}</td>
                <td className="p-2">{price.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PriceTable;
