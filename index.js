const express = require('express');
const path = require('path');
const { Game, Developer, Genre } = require('./models');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup View Engine (EJS) & Static Uploads
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes API
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Route Halaman Utama (Views)
app.get('/', async (req, res) => {
  try {
    const games = await Game.findAll({
      include: [
        { model: Developer, as: 'developer', attributes: ['nama', 'negara'] },
        { model: Genre, as: 'genres', attributes: ['nama'], through: { attributes: [] } }
      ]
    });
    const developers = await Developer.findAll();
    const genres = await Genre.findAll();

    res.render('index', { games, developers, genres });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Export app untuk Vercel Serverless Function
module.exports = app;

// Jalankan app.listen hanya untuk lingkungan lokal
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}