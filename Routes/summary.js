const express = require('express');
const router = express.Router();
const Transaction = require('../Models/transaction');

// GET /summary: Retrieve transaction summary
router.get('/', async (req, res) => {
  const { startDate, endDate, category } = req.query;
  const filters = {};
  if (startDate) filters.date = { $gte: new Date(startDate) };
  if (endDate) filters.date = { ...filters.date, $lte: new Date(endDate) };
  if (category) filters.category = category;

  try {
    const transactions = await Transaction.find(filters);
    const summary = transactions.reduce((acc, transaction) => {
      acc[transaction.type] += transaction.amount;
      return acc;
    }, { income: 0, expense: 0 });

    const balance = summary.income - summary.expense;
    res.json({ totalIncome: summary.income, totalExpenses: summary.expense, balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
