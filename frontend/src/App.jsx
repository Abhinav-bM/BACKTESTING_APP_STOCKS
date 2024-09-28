// frontend/src/App.js
import{ useState } from 'react';
import axios from 'axios';

function App() {
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');

    const fetchStockData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
            setStockData(response.data.quoteResponse.result[0]);
            setError('');
        } catch (err) {
            console.log(err)
            setError('Error fetching stock data. Please check the symbol.');
            setStockData(null);
        }
    };

    return (
        <div>
            <h1>Stock Trading App</h1>
            <input  style={{width:"300px"}}
                type="text" 
                placeholder="Enter stock symbol (e.g., BAJFINANCE.NS)" 
                value={symbol} 
                onChange={(e) => setSymbol(e.target.value)} 
            />
            <button onClick={fetchStockData}>Fetch Stock Data</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {stockData && (
                <div>
                    <h2>{stockData.symbol} - {stockData.longName}</h2>
                    <p>Current Price: ₹{stockData.regularMarketPrice}</p>
                    <p>High Price of the Day: ₹{stockData.regularMarketDayHigh}</p>
                    <p>Low Price of the Day: ₹{stockData.regularMarketDayLow}</p>
                </div>
            )}
        </div>
    );
}

export default App;
