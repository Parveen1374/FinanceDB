const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Config/db');

const transactionsRouter = require('./routes/transactions');
const summaryRouter = require('./routes/summary');

const app = express();
app.use(bodyParser.json());

app.use('/transactions', transactionsRouter);
app.use('/summary', summaryRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
