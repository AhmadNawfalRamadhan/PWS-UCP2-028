const { User } = require('../models');

exports.verifyApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Akses ditolak. Silakan sertakan x-api-key pada header request Anda.' 
    });
  }

  try {
    const user = await User.findOne({ where: { api_key: apiKey } });
    if (!user) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'API Key tidak valid atau tidak terdaftar.' 
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};