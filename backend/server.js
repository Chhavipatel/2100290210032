const express = require('express');
const axios = require('axios');

const app = express();


const windowSize = 10;
let numbers = [];

const fetchNumbers = async (id) => {
  try {
    const response = await axios.get(`https://localhost:5173//numbers/${id}`, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers for id ${id}:`, error);
    return [];
  }
};

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
  return num > 1;
};

const isFibonacci = (num) => {
  const isPerfectSquare = (x) => Math.sqrt(x) % 1 === 0;
  return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
};

const isEven = (num) => num % 2 === 0;

const validateId = (id) => {
  if (id === 'p' || id === 'f' || id === 'e' || id === 'r') {
    return true;
  }
  return false;
};

const calculateAverage = (nums) => {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, val) => acc + val, 0);
  return (sum / nums.length).toFixed(2);
};

app.get('/numbers/:id', async (req, res) => {
  const id = req.params.id;

  if (!validateId(id)) {
    return res.status(400).send({ error: 'Invalid ID' });
  }

  const windowPrevState = [...numbers];
  const newNumbers = await fetchNumbers(id);

  newNumbers.forEach((num) => {
    if (!numbers.includes(num)) {
      if (numbers.length >= windowSize) {
        numbers.shift();
      }
      numbers.push(num);
    }
  });

  const windowCurrState = [...numbers];
  const average = calculateAverage(numbers);

  res.json({
    windowPrevState,
    windowCurrState,
    numbers: newNumbers,
    avg: average,
  });
});


app.listen(9876, () => {
  console.log("Server is running on port");
});
