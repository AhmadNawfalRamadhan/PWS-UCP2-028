const { Developer } = require('../models');

// 1. Get All Developers
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.findAll();
    res.json({ status: 'success', data: developers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get Developer By ID
exports.getDeveloperById = async (req, res) => {
  try {
    const developer = await Developer.findByPk(req.params.id);
    if (!developer) {
      return res.status(404).json({ error: 'Developer tidak ditemukan' });
    }
    res.json({ status: 'success', data: developer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Create Developer Baru (POST)
exports.createDeveloper = async (req, res) => {
  try {
    const { nama, negara } = req.body;
    if (!nama) {
      return res.status(400).json({ error: 'Nama developer wajib diisi' });
    }

    const newDeveloper = await Developer.create({ nama, negara });
    res.status(201).json({ message: 'Developer berhasil ditambahkan', data: newDeveloper });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Update Developer (PUT)
exports.updateDeveloper = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, negara } = req.body;

    const developer = await Developer.findByPk(id);
    if (!developer) {
      return res.status(404).json({ error: 'Developer tidak ditemukan' });
    }

    await developer.update({ nama, negara });
    res.json({ message: 'Developer berhasil diperbarui', data: developer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 5. Delete Developer (DELETE)
exports.deleteDeveloper = async (req, res) => {
  try {
    const { id } = req.params;
    const developer = await Developer.findByPk(id);

    if (!developer) {
      return res.status(404).json({ error: 'Developer tidak ditemukan' });
    }

    await developer.destroy();
    res.json({ message: `Developer '${developer.nama}' berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};