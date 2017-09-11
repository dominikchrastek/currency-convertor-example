const fetch = require('node-fetch');
const R = require('ramda')

const fetchRates = async (base) => {
  const res = await fetch(`http://api.fixer.io/latest?base=${base}`);
  return res.json();
}

const getConvertedAmount = async (base, to, amount) => {
  const rates = await fetchRates(base)
  return  {
      transactionAmount: amount * (base === to ? 1 : rates.rates[to]),
      inUSDAmount: base === 'USD' ? amount : amount * rates.rates['USD']
  }
}

const getAvailableCurrencies = async () => {
  const data = await fetchRates("EUR")
  return [...R.keys(data.rates), data.base].sort()
}

module.exports = {
  fetchRates,
  getConvertedAmount,
  getAvailableCurrencies,
}