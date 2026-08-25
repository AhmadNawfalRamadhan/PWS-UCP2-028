const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Chat } = require('../models');

// Inisialisasi Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// 1. Kirim Pesan ke AI Chatbot (Terintegrasi Gemini)
exports.sendChat = async (req, res) => {
  try {
    const { pesan_user } = req.body;
    const user_id = req.user ? req.user.id : 1; // Mengambil user ID dari JWT Token

    if (!pesan_user) {
      return res.status(400).json({ error: 'Pesan user wajib diisi' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY belum terpasang di file .env' });
    }

const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.6-flash',
      systemInstruction: `Anda adalah PlayDex AI Assistant yang ramah dan efisien.
Aturan format jawaban:
1. Wajib menggunakan teks biasa (plain text) tanpa karakter Markdown seperti **, *, #, _, atau ---.
2. Setiap poin atau daftar game HARUS ditulis di baris baru secara berurutan ke bawah menggunakan penomoran angka (1., 2., 3.).
3. DILARANG memasukkan daftar dalam satu baris memanjang ke samping.
4. Pisahkan setiap item list dengan baris baru agar tampilan bersih dan mudah dibaca.`
    });

    // Generate jawaban dari model Gemini
    const result = await model.generateContent(pesan_user);
    const balasan_ai = result.response.text();

    // Simpan riwayat percakapan asli ke database PostgreSQL
    const newChat = await Chat.create({
      user_id,
      pesan_user,
      balasan_ai
    });

    res.status(201).json({
      status: 'success',
      data: newChat
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Ambil Riwayat Chat User
exports.getChatHistory = async (req, res) => {
  try {
    const user_id = req.user ? req.user.id : 1;

    const history = await Chat.findAll({
      where: { user_id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ status: 'success', data: history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Fungsi untuk menghapus riwayat chat
exports.clearChatHistory = async (req, res) => {
  try {
    // Asumsi nama model database kamu adalah Chat dan user ID didapat dari token
    await Chat.destroy({
      where: { user_id: req.user.id } 
    });
    
    res.status(200).json({ status: 'success', message: 'Riwayat obrolan berhasil dihapus' });
  } catch (error) {
    console.error("Gagal menghapus riwayat:", error);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server' });
  }
};