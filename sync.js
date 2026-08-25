require('dotenv').config();
const { sequelize } = require('./models');

async function syncDB() {
  try {
    console.log('Mengoperasikan sync ke Supabase...');
    // force: true akan menghapus tabel lama (jika ada) dan membuat ulang sesuai model
    await sequelize.sync({ force: true });
    console.log('✅ Semua tabel berhasil dibuat di Supabase!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal membuat tabel:', error);
    process.exit(1);
  }
}

syncDB();