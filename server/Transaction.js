const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  baseCurrency: String,
  destinationCurrency: String,
  baseAmount: Number,
  convertedAmount: Number,
  convertedInUSD: Number,
});

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;