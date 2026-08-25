const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');

// Helper generator API Key unik (Format: pd_live_xxxxxxxx)
const generateApiKey = () => {
  return 'pd_live_' + crypto.randomBytes(16).toString('hex');
};

// 1. REGISTER USER
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Semua field (username, email, password) wajib diisi' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const api_key = generateApiKey();

    const newUser = await User.create({
      username,
      email,
      password_hash,
      api_key
    });

    res.status(201).json({
      message: 'Registrasi PlayDex berhasil',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        api_key: newUser.api_key
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 2. LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Password salah' });
    }

    // Jika user lama belum punya API Key, buatkan otomatis
    if (!user.api_key) {
      user.api_key = generateApiKey();
      await user.save();
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username 
      },
      process.env.JWT_SECRET || 'secretkeybebas',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      api_key: user.api_key
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};