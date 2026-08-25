const express = require('express');
const app = express();
const routes = require('../routes/api');

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SaaS Game Data API Gateway' });
});

module.exports = app;