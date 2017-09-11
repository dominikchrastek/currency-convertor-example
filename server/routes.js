const Joi = require('joi');
const {
  addTransaction,
  getNumberOfTransactions,
  getMostPopular,
  getTotalAmountInUSD,
 } = require('./queries')
const { getAvailableCurrencies } = require('./fixer')

module.exports = [{
  method: 'POST',
  path:'/convert',
  handler: async(request, reply) => {
      const convertedStuff = await addTransaction(request.payload)
      const obj = {
          data: {
              transactionsCount: await getNumberOfTransactions(),
              mostPopularCurrency: await getMostPopular(),
              totalInUSD: await getTotalAmountInUSD(),
          },
          convertedStuff,
      }
      return reply(obj);
  },
  config: {
      validate: {
          payload: {
              from: Joi.string().required(),
              to: Joi.string().required(),
              amount: Joi.number().greater(0).required(),
          }
      }
  }
},{
  method: 'GET',
  path:'/data',
  handler: async(request, reply) => {
      const obj = {
          data: {
              transactionsCount: await getNumberOfTransactions(),
              mostPopularCurrency: await getMostPopular(),
              totalInUSD: await getTotalAmountInUSD(),
          },
          currencies: await getAvailableCurrencies(),
      }
      return reply(obj);
  }
}]