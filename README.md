# 🎮 PlayDex API & Web Service

**PlayDex** adalah platform Web Service & RESTful API berbasis Node.js dan Express.js yang dirancang untuk mengelola katalog game, developer, serta genre game. Platform ini juga dilengkapi dengan integrasi **AI Assistant (Google Gemini 3.6 Flash)** dan sistem otentikasi ganda berbasis **JWT Token** dan **API Key**.

---

## 🚀 Fitur Utama

- **Otentikasi & Keamanan Ganda (Dual Authentication)**:
  - **API Key (`x-api-key`)**: Untuk konsumsi data publik/SaaS API (Games, Developers, Genres). Setiap pengguna yang terdaftar mendapatkan API Key unik dengan format `pd_live_xxxxxxxx`.
  - **JWT (JSON Web Token)**: Untuk proteksi endpoint manajemen data (Tambah, Edit, Hapus) dan percakapan AI Chatbot.
- **Manajemen Game (CRUD)**: Kelola data game lengkap dengan pengunggahan gambar (Multer), relasi developer, dan banyak genre (*Many-to-Many*).
- **Manajemen Developer & Genre (CRUD)**: Kelola entitas pendukung katalog game.
- **AI Chatbot Assistant (Google Gemini AI)**: Chatbot interaktif menggunakan model **Gemini 3.6 Flash** untuk rekomendasi dan informasi seputar game, dengan riwayat obrolan yang tersimpan di database.
- **Web Dashboard (EJS)**: Tampilan antarmuka visual sederhana berbasis EJS untuk menampilkan katalog game, developer, dan genre.
- **Deployment Ready**: Siap dideploy ke **Vercel Serverless Functions** dan **Supabase PostgreSQL**.

---

## 🛠️ Teknologi yang Digunakan

- **Runtime & Framework**: Node.js, Express.js (v5)
- **Database & ORM**: PostgreSQL (Supabase / Lokal), Sequelize ORM
- **AI Integration**: `@google/generative-ai` (Gemini 3.6 Flash)
- **Authentication & Security**: `jsonwebtoken` (JWT), `bcryptjs`, Crypto API Key Generator
- **File Upload**: `multer`
- **View Engine**: EJS
- **Deployment**: Vercel (`@vercel/node`)

---

## 📁 Struktur Proyek

```text
├── api/                  # Entry point serverless Vercel
├── config/               # Konfigurasi database & Sequelize
│   └── config.js
├── controller/           # Logika bisnis & pengolah request
│   ├── authController.js
│   ├── chatController.js
│   ├── developerController.js
│   ├── gameController.js
│   └── genreController.js
├── middleware/           # Middleware otentikasi & upload
│   ├── apiKeyMiddleware.js
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── migrations/           # Skrip migrasi database Sequelize
├── models/               # Definisi model & relasi Sequelize
│   ├── chat.js
│   ├── developer.js
│   ├── game.js
│   ├── genre.js
│   ├── user.js
│   └── index.js
├── routes/               # Definisi rute API
│   └── api.js
├── uploads/              # Direktori penyimpanan file unggahan
├── views/                # Template EJS untuk Web Dashboard
│   └── index.ejs
├── .env                  # Variable lingkungan (Environment Variables)
├── index.js              # Server utama Express app
├── package.json          # Manifest dependensi & skrip
├── sync.js               # Skrip sinkronisasi tabel database
└── vercel.json           # Konfigurasi deployment Vercel
```

---

## ⚙️ Panduan Instalasi & Konfigurasi

### 1. Prasyarat
- [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan)
- [PostgreSQL](https://www.postgresql.org/) (Lokal atau layanan cloud seperti [Supabase](https://supabase.com/))

### 2. Clone & Install Dependensi
```bash
git clone < repository-url >
cd "UCP 2"
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Buat file `.env` di direktori utama (root) proyek dan sesuaikan nilainya:

```env
# Konfigurasi Aplikasi
PORT=3000
NODE_ENV=development
JWT_SECRET=rahasia_super_aman_123

# Konfigurasi Database PostgreSQL / Supabase
DB_USER=postgres
DB_PASS=password_anda
DB_DATABASE=playdex_db
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

# (Opsional) URL Koneksi Database Langsung (misal: Supabase/Neon di Mode Production)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# API Key Google Gemini AI
GEMINI_API_KEY=AIzaSy...
```

### 4. Sinkronisasi Database
Jalankan skrip berikut untuk membuat tabel-tabel di database secara otomatis:

```bash
node sync.js
```

---

## 🏃 Menjalankan Aplikasi

### Mode Pengembangan (Development)
```bash
npm run dev
# atau jika menggunakan nodemon
npx nodemon index.js
```
Aplikasi akan berjalan di: `http://localhost:3000`

### Mode Produksi (Production)
```bash
npm start
```

---

## 📖 Dokumentasi Endpoint API

Base URL API: `http://localhost:3000/api`

### 🔑 1. Otentikasi (Public)

| Method | Endpoint | Deskripsi | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Registrasi user baru | `{ "username": "john", "email": "john@example.com", "password": "secretpassword" }` |
| `POST` | `/login` | Login user & dapatkan JWT Token serta API Key | `{ "email": "john@example.com", "password": "secretpassword" }` |

---

### 🌐 2. Data Publik / SaaS API (Membutuhkan API Key)

> **Header Wajib**: `x-api-key: <API_KEY_ANDA>` *(atau via query parameter `?api_key=<API_KEY_ANDA>`)*

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/games` | Mendapatkan daftar seluruh game beserta developer & genre |
| `GET` | `/games/:id` | Mendapatkan detail game berdasarkan ID |
| `GET` | `/genres` | Mendapatkan daftar seluruh genre game |
| `GET` | `/developers` | Mendapatkan daftar seluruh developer |
| `GET` | `/developers/:id` | Mendapatkan detail developer berdasarkan ID |

---

### 🛡️ 3. Manajemen Data (Membutuhkan JWT Token)

> **Header Wajib**: `Authorization: Bearer <JWT_TOKEN>`

#### **A. Games**
- `POST /api/games` - Menambah game baru.
  - Form-Data / JSON Body: `judul`, `deskripsi`, `tahun_rilis`, `developer_id`, `genre_ids` (array / comma separated), `gambar` (File upload atau URL gambar).
- `PUT /api/games/:id` - Memperbarui data game.
- `DELETE /api/games/:id` - Menghapus game.

#### **B. Genres**
- `POST /api/genres` - Menambah genre baru. (`{ "nama": "Action" }`)
- `PUT /api/genres/:id` - Memperbarui genre. (`{ "nama": "Action RPG" }`)
- `DELETE /api/genres/:id` - Menghapus genre.

#### **C. Developers**
- `POST /api/developers` - Menambah developer baru. (`{ "nama": "Valve", "negara": "Amerika Serikat" }`)
- `PUT /api/developers/:id` - Memperbarui developer.
- `DELETE /api/developers/:id` - Menghapus developer.

---

### 🤖 4. AI Chatbot Assistant (Membutuhkan JWT Token)

> **Header Wajib**: `Authorization: Bearer <JWT_TOKEN>`

| Method | Endpoint | Deskripsi | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/chat` | Mengirim pesan ke PlayDex AI Assistant (Gemini 3.6 Flash) | `{ "pesan_user": "Rekomendasikan game RPG terbaik" }` |
| `GET` | `/chat/history` | Mengambil riwayat percakapan user | - |
| `DELETE` | `/chat/history` | Menghapus seluruh riwayat obrolan user | - |

---

## 🌐 Dashboard Web (EJS)

Akses antarmuka utama melalui browser di:
```text
http://localhost:3000/
```
Halaman ini menampilkan katalog game, daftar developer, dan daftar genre secara interaktif.

---

## ☁️ Deployment ke Vercel

Proyek ini telah dikonfigurasi untuk deployment ke Vercel Serverless.

1. Install Vercel CLI & Login:
   ```bash
   npm i -g vercel
   vercel login
   ```
2. Deploy project:
   ```bash
   vercel
   ```
3. Pastikan untuk mengonfigurasi **Environment Variables** (`DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, dll.) pada Dashboard Vercel (Project Settings > Environment Variables).

---

## 📄 Lisensi

ISC License.
