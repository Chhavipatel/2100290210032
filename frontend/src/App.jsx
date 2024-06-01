
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${id}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult(null);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <div>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID (p, f, e, r)"
        />
        <button onClick={handleFetch}>Fetch Numbers</button>
      </div>
      {result && (
        <div>
          <h2>Results</h2>
          <p>Previous State: {JSON.stringify(result.windowPrevState)}</p>
          <p>Current State: {JSON.stringify(result.windowCurrState)}</p>
          <p>New Numbers: {JSON.stringify(result.numbers)}</p>
          <p>Average: {result.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
