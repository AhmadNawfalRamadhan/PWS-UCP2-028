const { Genre } = require('../models');

// 1. Get All Genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json({ status: 'success', data: genres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Create Genre Baru
exports.createGenre = async (req, res) => {
  try {
    const { nama } = req.body;
    if (!nama) {
      return res.status(400).json({ error: 'Nama genre wajib diisi' });
    }

    const newGenre = await Genre.create({ nama });
    res.status(201).json({ message: 'Genre berhasil ditambahkan', data: newGenre });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update Genre (PUT)
exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: 'Genre tidak ditemukan' });
    }

    await genre.update({ nama });
    res.json({ message: 'Genre berhasil diperbarui', data: genre });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete Genre
exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({ error: 'Genre tidak ditemukan' });
    }

    await genre.destroy();
    res.json({ message: `Genre '${genre.nama}' berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};