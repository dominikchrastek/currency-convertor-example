
const { getConvertedAmount } = require('./fixer')
const Transaction = require('./Transaction')
const R = require('ramda')

const createTransaction = async data => Transaction.create(data).then(result => result)

const getMostPopular = async () => {
    const data = await Transaction.find({}).then(result => result)
    // not sure if I can reduce it in the query
    const reduced = R.reduce((acc, value) => {
        if (R.isNil(acc[value.destinationCurrency])) {
            acc[value.destinationCurrency] = 1
        } else  {
            acc[value.destinationCurrency] += 1
        }
        return acc
    }, {}, data)
    // most popular is the mostly used
    return R.compose(
        R.head,
        R.sort((a, b) => b.count - a.count),
        R.zipWith((x, y) => ({
            currency: y,
            count: x,
        })),
    )(R.values(reduced), R.keys(reduced))
}

const getNumberOfTransactions = () => Transaction.count({}).then(result => result)

const getTotalAmountInUSD = async () => {
    const data = await Transaction.find({}).then(result => result)
    return R.reduce((acc, value) => {
        return acc += value.convertedInUSD
    }, 0, data)
}
const addTransaction = async ({from, to, amount}) => {
  const converted = await getConvertedAmount(from, to, amount)
  const record = {
      baseCurrency: from,
      destinationCurrency: to,
      baseAmount: amount,
      convertedAmount: converted.transactionAmount,
      convertedInUSD: converted.inUSDAmount,
  }
  const transaction = await createTransaction(record)
  return {
      amount: transaction.convertedAmount,
      currency: transaction.destinationCurrency,
  }
}

module.exports = {
  getTotalAmountInUSD,
  getNumberOfTransactions,
  getMostPopular,
  createTransaction,
  addTransaction,
}