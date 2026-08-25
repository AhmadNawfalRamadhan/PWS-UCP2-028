const { Game, Developer, Genre } = require('../models');

// Helper untuk mengubah berbagai format input (string, array, JSON string, angka) menjadi Array ID
const parseGenreIds = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(Number);
  if (typeof input === 'number') return [input];
  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return input.split(',').map(id => Number(id.trim())).filter(Boolean);
    }
  }
  return [];
};

// 1. Get All Games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll({
      include: [
        { model: Developer, as: 'developer', attributes: ['id', 'nama', 'negara'] },
        { model: Genre, as: 'genres', attributes: ['id', 'nama'], through: { attributes: [] } }
      ]
    });
    res.json({ status: 'success', total: games.length, data: games });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get Game By ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id, {
      include: [
        { model: Developer, as: 'developer', attributes: ['id', 'nama', 'negara'] },
        { model: Genre, as: 'genres', attributes: ['id', 'nama'], through: { attributes: [] } }
      ]
    });

    if (!game) return res.status(404).json({ error: 'Game tidak ditemukan' });
    res.json({ status: 'success', data: game });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Create Game Baru
exports.createGame = async (req, res) => {
  try {
    const { judul, deskripsi, tahun_rilis, developer_id, genre_ids, genre_id } = req.body;

    let gambar = null;
    if (req.file) {
      gambar = `/uploads/${req.file.filename}`;
    } else if (req.body.gambar) {
      gambar = req.body.gambar;
    } else {
      gambar = 'https://via.placeholder.com/600x400?text=No+Image';
    }

    // 1. Buat data game utama
    const game = await Game.create({
      judul,
      deskripsi,
      tahun_rilis,
      gambar,
      developer_id
    });

    // 2. Olah input genre_ids atau genre_id
    const rawGenres = genre_ids || genre_id;
    const targetGenreIds = parseGenreIds(rawGenres);

    if (targetGenreIds.length > 0) {
      await game.setGenres(targetGenreIds);
    }

    // 3. Ambil ulang data game lengkap beserta relasi developer & genres untuk response
    const newGameData = await Game.findByPk(game.id, {
      include: [
        { model: Developer, as: 'developer', attributes: ['id', 'nama', 'negara'] },
        { model: Genre, as: 'genres', attributes: ['id', 'nama'], through: { attributes: [] } }
      ]
    });

    res.status(201).json({ message: 'Game berhasil ditambahkan', data: newGameData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Update Game
exports.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi, tahun_rilis, developer_id, genre_ids, genre_id } = req.body;

    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({ error: 'Game tidak ditemukan' });
    }

    let gambar = game.gambar;
    if (req.file) {
      gambar = `/uploads/${req.file.filename}`;
    } else if (req.body.gambar) {
      gambar = req.body.gambar;
    }

    await game.update({
      judul: judul || game.judul,
      deskripsi: deskripsi || game.deskripsi,
      tahun_rilis: tahun_rilis || game.tahun_rilis,
      gambar,
      developer_id: developer_id || game.developer_id
    });

    const rawGenres = genre_ids || genre_id;
    if (rawGenres) {
      const targetGenreIds = parseGenreIds(rawGenres);
      await game.setGenres(targetGenreIds);
    }

    const updatedGameData = await Game.findByPk(id, {
      include: [
        { model: Developer, as: 'developer', attributes: ['id', 'nama', 'negara'] },
        { model: Genre, as: 'genres', attributes: ['id', 'nama'], through: { attributes: [] } }
      ]
    });

    res.json({ message: 'Game berhasil diperbarui', data: updatedGameData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 5. Delete Game
exports.deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findByPk(id);

    if (!game) {
      return res.status(404).json({ error: 'Game tidak ditemukan' });
    }

    await game.destroy();
    res.json({ message: `Game '${game.judul}' berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};