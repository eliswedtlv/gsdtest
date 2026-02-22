const express = require('express');
const todoRoutes = require('./routes');

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

// 404 for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
